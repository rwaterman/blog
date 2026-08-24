import * as cdk from 'aws-cdk-lib';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set`);
  }
  return value;
}

export const ACCOUNT = process.env.CDK_DEFAULT_ACCOUNT ?? requireEnv('AWS_ACCOUNT_ID');
export const REGION = 'us-west-2';
// CloudFront certificates must live in us-east-1.
export const EDGE_REGION = 'us-east-1';

export const HOSTED_ZONE_ID = requireEnv('HOSTED_ZONE_ID');
export const ZONE_NAME = 'rickwaterman.com';

export const GITHUB_REPO = 'rwaterman/blog';

/**
 * The GitHub Actions OIDC provider is an account-level singleton (one per URL per
 * AWS account). It is already created by the `website` repo's WebsiteShared stack,
 * so we import it by ARN here — creating a second one would be rejected.
 */
export const OIDC_PROVIDER_ARN = `arn:aws:iam::${ACCOUNT}:oidc-provider/token.actions.githubusercontent.com`;

export interface SiteEnv {
  /** PascalCase suffix used in stack ids, e.g. "Dev" -> BlogSiteDev. */
  id: string;
  /** Lowercase environment key used in role names and SSM paths, e.g. "dev". */
  envName: string;
  /** Primary domain served, e.g. "blog-dev.rickwaterman.com". */
  domainName: string;
  /**
   * Git branch allowed to assume this environment's content role, matched as a glob
   * against the OIDC `sub` claim (`refs/heads/<branch>`). Pushes to `develop` / `main`
   * auto-deploy dev / prod; optional environments are only ever deployed by hand via
   * `workflow_dispatch`, so they accept any branch (`*`).
   */
  branch: string;
}

/** Always synthesized and deployed by `cdk deploy --all`. */
export const SITE_ENVS: SiteEnv[] = [
  {
    id: 'Dev',
    envName: 'dev',
    domainName: 'blog-dev.rickwaterman.com',
    branch: 'develop',
  },
  {
    id: 'Prod',
    envName: 'prod',
    domainName: 'blog.rickwaterman.com',
    branch: 'main',
  },
];

/**
 * Synthesized only when named in the `optional` CDK context value, e.g.
 * `cdk deploy --all -c optional=qa,uat`. The push-triggered infra workflow never passes
 * that flag, and CDK leaves stacks that are absent from a synth untouched, so an
 * optional environment persists from its explicit deploy until its explicit destroy.
 */
export const OPTIONAL_SITE_ENVS: SiteEnv[] = [
  {
    id: 'Qa',
    envName: 'qa',
    domainName: 'blog-qa.rickwaterman.com',
    branch: '*',
  },
  {
    id: 'Staging',
    envName: 'staging',
    domainName: 'blog-staging.rickwaterman.com',
    branch: '*',
  },
  {
    id: 'Uat',
    envName: 'uat',
    domainName: 'blog-uat.rickwaterman.com',
    branch: '*',
  },
];

/** The default environments plus any optional ones requested via `-c optional=a,b`. */
export function selectSiteEnvs(app: cdk.App): SiteEnv[] {
  const requested = String(app.node.tryGetContext('optional') ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  const optional = requested.map((name) => {
    const site = OPTIONAL_SITE_ENVS.find((candidate) => candidate.envName === name);
    if (!site) {
      const known = OPTIONAL_SITE_ENVS.map((candidate) => candidate.envName).join(', ');
      throw new Error(`Unknown optional environment "${name}"; expected one of: ${known}`);
    }
    return site;
  });
  return [...SITE_ENVS, ...optional];
}
