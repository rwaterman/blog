import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { defineStageStacks } from '../lib/stage-stacks';
import { STAGES, StageName } from '../lib/site-config';

function synthesize(stageName: StageName, context: Record<string, unknown> = {}) {
  const app = new cdk.App({ context });
  const stacks = defineStageStacks(app, STAGES[stageName]);
  return {
    shared: Template.fromStack(stacks.shared),
    cert: Template.fromStack(stacks.cert),
    site: Template.fromStack(stacks.site),
  };
}

function trustConditions(template: Template): Record<string, unknown>[] {
  const roles = template.findResources('AWS::IAM::Role');
  return Object.values(roles).flatMap((role) => {
    const statements = (role.Properties.AssumeRolePolicyDocument.Statement ?? []) as Record<string, unknown>[];
    return statements.map((statement) => (statement.Condition ?? {}) as Record<string, unknown>);
  });
}

describe('role trust', () => {
  for (const stageName of ['dev', 'prod'] as const) {
    it(`content role trusts only the ${stageName} GitHub environment`, () => {
      const { site } = synthesize(stageName);
      site.hasResourceProperties('AWS::IAM::Role', {
        RoleName: `blog-content-${stageName}`,
        AssumeRolePolicyDocument: {
          Statement: [
            Match.objectLike({
              Condition: {
                StringEquals: {
                  'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                  'token.actions.githubusercontent.com:sub': `repo:rwaterman/blog:environment:${stageName}`,
                },
              },
            }),
          ],
        },
      });
      for (const condition of trustConditions(site)) {
        assert.equal('StringLike' in condition, false);
      }
    });

    it(`infra deploy role trusts only the ${stageName} GitHub environment`, () => {
      const { shared } = synthesize(stageName);
      shared.hasResourceProperties('AWS::IAM::Role', {
        RoleName: 'blog-infra-deploy',
        AssumeRolePolicyDocument: {
          Statement: [
            Match.objectLike({
              Condition: {
                StringEquals: {
                  'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                  'token.actions.githubusercontent.com:sub': `repo:rwaterman/blog:environment:${stageName}`,
                },
              },
            }),
          ],
        },
      });
      for (const condition of trustConditions(shared)) {
        assert.equal('StringLike' in condition, false);
      }
    });

    it(`${stageName} imports the OIDC provider of its own account`, () => {
      const { shared } = synthesize(stageName);
      const serialized = JSON.stringify(shared.toJSON());
      assert.ok(
        serialized.includes(
          `arn:aws:iam::${STAGES[stageName].account}:oidc-provider/token.actions.githubusercontent.com`,
        ),
      );
      shared.resourceCountIs('AWS::IAM::OIDCProvider', 0);
    });
  }
});

describe('web ACL', () => {
  it('dev has no web ACL', () => {
    const { site } = synthesize('dev');
    site.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.not(Match.objectLike({ WebACLId: Match.anyValue() })),
    });
    const parameters = Object.values((site.toJSON().Parameters ?? {}) as Record<string, { Default?: string }>);
    assert.equal(parameters.filter((parameter) => parameter.Default === '/account/cloudfront-webacl-arn').length, 0);
  });

  it('prod reads WebACLId from /account/cloudfront-webacl-arn', () => {
    const { site } = synthesize('prod');
    const parameters = Object.entries(site.toJSON().Parameters as Record<string, { Default: string }>);
    const webAclParameters = parameters.filter(([, parameter]) => parameter.Default === '/account/cloudfront-webacl-arn');
    assert.equal(webAclParameters.length, 1);
    site.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: { WebACLId: { Ref: webAclParameters[0][0] } },
    });
  });
});

describe('domains', () => {
  it('dev serves blog.dev.rickwaterman.com with alias records in the dev zone', () => {
    const { site, cert } = synthesize('dev');
    site.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: { Aliases: ['blog.dev.rickwaterman.com'] },
    });
    site.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'blog.dev.rickwaterman.com.',
      Type: 'A',
      HostedZoneId: 'Z02783752H850YJ2Z0LST',
    });
    site.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'blog.dev.rickwaterman.com.',
      Type: 'AAAA',
      HostedZoneId: 'Z02783752H850YJ2Z0LST',
    });
    cert.hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'blog.dev.rickwaterman.com',
    });
  });

  it('attachDomains=false yields a distribution with a certificate, no Aliases and no Route 53 records', () => {
    const { site, cert } = synthesize('prod', { attachDomains: 'false' });
    cert.resourceCountIs('AWS::CertificateManager::Certificate', 1);
    site.resourceCountIs('AWS::Route53::RecordSet', 0);
    const distributions = Object.values(site.findResources('AWS::CloudFront::Distribution'));
    assert.equal(distributions.length, 1);
    const config = distributions[0].Properties.DistributionConfig;
    assert.equal('Aliases' in config, false);
    assert.ok(config.ViewerCertificate.AcmCertificateArn);
  });

  it('attachDomains defaults to true', () => {
    const { site } = synthesize('prod');
    site.resourceCountIs('AWS::Route53::RecordSet', 2);
    site.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: { Aliases: ['blog.rickwaterman.com'] },
    });
  });

  it('does not use deleteExisting', () => {
    const { site } = synthesize('prod');
    site.resourceCountIs('Custom::DeleteExistingRecordSet', 0);
  });
});
