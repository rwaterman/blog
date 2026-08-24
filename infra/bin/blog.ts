import * as cdk from 'aws-cdk-lib';
import { SharedStack } from '../lib/shared-stack';
import { CertStack } from '../lib/cert-stack';
import { SiteStack } from '../lib/site-stack';
import { ACCOUNT, REGION, EDGE_REGION, selectSiteEnvs } from '../lib/site-config';

const app = new cdk.App();
const env = { account: ACCOUNT, region: REGION };
const edgeEnv = { account: ACCOUNT, region: EDGE_REGION };

const shared = new SharedStack(app, 'BlogShared', { env });

for (const site of selectSiteEnvs(app)) {
  const cert = new CertStack(app, `BlogCert${site.id}`, {
    env: edgeEnv,
    crossRegionReferences: true,
    site,
  });
  new SiteStack(app, `BlogSite${site.id}`, {
    env,
    crossRegionReferences: true,
    site,
    oidcProvider: shared.oidcProvider,
    certificate: cert.certificate,
  });
}
