import * as cdk from 'aws-cdk-lib';
import { SharedStack } from './shared-stack';
import { CertStack } from './cert-stack';
import { SiteStack } from './site-stack';
import { EDGE_REGION, REGION, StageConfig, resolveAttachDomains } from './site-config';

export interface StageStacks {
  shared: SharedStack;
  cert: CertStack;
  site: SiteStack;
}

export function defineStageStacks(app: cdk.App, stage: StageConfig): StageStacks {
  const env = { account: stage.account, region: REGION };
  const edgeEnv = { account: stage.account, region: EDGE_REGION };

  const shared = new SharedStack(app, 'BlogShared', { env, stage });
  const cert = new CertStack(app, `BlogCert${stage.id}`, {
    env: edgeEnv,
    crossRegionReferences: true,
    stage,
  });
  const site = new SiteStack(app, `BlogSite${stage.id}`, {
    env,
    crossRegionReferences: true,
    stage,
    oidcProvider: shared.oidcProvider,
    certificate: cert.certificate,
    attachDomains: resolveAttachDomains(app),
  });
  return { shared, cert, site };
}
