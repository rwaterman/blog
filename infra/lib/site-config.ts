import * as cdk from 'aws-cdk-lib';

export const REGION = 'us-west-2';
// CloudFront certificates must live in us-east-1.
export const EDGE_REGION = 'us-east-1';

export const GITHUB_REPO = 'rwaterman/blog';

export const WEB_ACL_ARN_PARAMETER = '/account/cloudfront-webacl-arn';

export type StageName = 'dev' | 'prod';

export interface SiteEnv {
  /** PascalCase suffix used in stack ids, e.g. "Dev" -> BlogSiteDev. */
  id: string;
  /** Lowercase environment key used in role names and SSM paths, e.g. "dev". */
  envName: StageName;
  /** Primary domain served, e.g. "blog.dev.rickwaterman.com". */
  domainName: string;
}

export interface StageConfig extends SiteEnv {
  /** AWS account that hosts this stage. */
  account: string;
  /** Route 53 hosted zone that serves `zoneName` in `account`. */
  hostedZoneId: string;
  zoneName: string;
  /** GitHub environment whose OIDC subject the deploy roles trust. */
  githubEnvironment: StageName;
  /** Associate the distribution with the account's CloudFront web ACL. */
  webAcl: boolean;
}

export const STAGES: Record<StageName, StageConfig> = {
  dev: {
    id: 'Dev',
    envName: 'dev',
    account: '690084476262',
    hostedZoneId: 'Z02783752H850YJ2Z0LST',
    zoneName: 'dev.rickwaterman.com',
    domainName: 'blog.dev.rickwaterman.com',
    githubEnvironment: 'dev',
    webAcl: false,
  },
  prod: {
    id: 'Prod',
    envName: 'prod',
    account: '582621605246',
    hostedZoneId: 'Z050080263SGEDSJA265',
    zoneName: 'rickwaterman.com',
    domainName: 'blog.rickwaterman.com',
    githubEnvironment: 'prod',
    webAcl: true,
  },
};

function isStageName(value: unknown): value is StageName {
  return typeof value === 'string' && Object.hasOwn(STAGES, value);
}

export function resolveStage(app: cdk.App, env: NodeJS.ProcessEnv): StageConfig {
  const requested: unknown = app.node.tryGetContext('stage');
  if (!isStageName(requested)) {
    throw new Error(`Missing or unknown stage (${String(requested)}). Pass -c stage=dev or -c stage=prod`);
  }
  const stage = STAGES[requested];
  const credentialsAccount = env.CDK_DEFAULT_ACCOUNT;
  if (!credentialsAccount) {
    throw new Error(
      `Stage ${requested} targets ${stage.account}, but CDK_DEFAULT_ACCOUNT is not set; run through the cdk CLI with credentials`,
    );
  }
  if (credentialsAccount !== stage.account) {
    throw new Error(`Stage ${requested} targets ${stage.account}, but credentials are for ${credentialsAccount}`);
  }
  return stage;
}

export function resolveAttachDomains(app: cdk.App): boolean {
  return String(app.node.tryGetContext('attachDomains')) !== 'false';
}

export function oidcProviderArn(account: string): string {
  return `arn:aws:iam::${account}:oidc-provider/token.actions.githubusercontent.com`;
}
