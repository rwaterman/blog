import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { REGION, EDGE_REGION, GITHUB_REPO, StageConfig, oidcProviderArn } from './site-config';

/**
 * Account-global pieces for blog CI:
 *  - imports the account's GitHub Actions OIDC provider (owned by the account baseline in
 *    the `aws-orgs` repo; one per account, cannot be recreated)
 *  - creates the infra-deploy role assumed by CI to run `cdk deploy`, trusted only from this
 *    stage's GitHub environment
 */
export interface SharedStackProps extends cdk.StackProps {
  stage: StageConfig;
}

export class SharedStack extends cdk.Stack {
  public readonly oidcProvider: iam.IOpenIdConnectProvider;

  constructor(scope: Construct, id: string, props: SharedStackProps) {
    super(scope, id, props);
    const { stage } = props;

    this.oidcProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      'GitHubOidcProvider',
      oidcProviderArn(stage.account),
    );

    // CI role for `cdk deploy`. It holds no service permissions of its own — it can only
    // assume the CDK bootstrap roles, which carry the actual provisioning permissions.
    const infraRole = new iam.Role(this, 'InfraDeployRole', {
      roleName: 'blog-infra-deploy',
      description: 'GitHub Actions role to run cdk deploy for blog (assumes CDK bootstrap roles only)',
      assumedBy: new iam.OpenIdConnectPrincipal(this.oidcProvider, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          'token.actions.githubusercontent.com:sub': `repo:${GITHUB_REPO}:environment:${stage.githubEnvironment}`,
        },
      }),
    });
    infraRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        resources: [REGION, EDGE_REGION].map(
          (region) => `arn:aws:iam::${stage.account}:role/cdk-hnb659fds-*-${stage.account}-${region}`,
        ),
      }),
    );

    new cdk.CfnOutput(this, 'InfraDeployRoleArn', { value: infraRole.roleArn });
  }
}
