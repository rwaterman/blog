# blog

Personal blog built with [Hugo](https://gohugo.io/) and the
[Congo](https://jpanther.github.io/congo/) theme, installed as a Hugo Module.

## Requirements

- Hugo **extended** ≥ 0.158.0 — `brew install hugo`
- Go ≥ 1.12 (for Hugo Modules) — `brew install go`

## Develop

```sh
hugo mod get          # fetch / update the Congo theme module
hugo server -D        # local preview with drafts at http://localhost:1313
```

## Write a post

Posts are leaf page bundles under `content/posts/<slug>/index.md`, so images can sit
alongside the article:

```sh
hugo new content posts/my-first-post/index.md
```

Edit the front matter (`draft`, `tags`, `categories`, `summary`) and set `draft = false`
when ready.

### AI writing-assistance disclosure

To add a badge near the top of an article noting that the ideas are your own but that AI
assisted with the writing, drop the `ai-disclosure` shortcode in as the first line of the
post body:

```md
{{< ai-disclosure >}}
```

It renders a lightbulb-icon callout (styled to match Congo's `alert`) reading
"Created with assistance of Generative AI using **&lt;model&gt;**." — the model comes from the
post's `ai_model` front matter:

```toml
ai_model = "Claude Fable 5 (Anthropic)"
```

Pass a string to override the whole message, e.g.
`{{< ai-disclosure "**My own ideas.** Drafted with AI help." >}}`.
The shortcode lives in `layouts/_shortcodes/ai-disclosure.html`.

## Build

```sh
hugo --minify         # outputs the static site to ./public
```

RSS (`/index.xml`) and `sitemap.xml` are generated automatically.

## Configuration

Site config lives in `config/_default/` (Congo's recommended split layout):
`hugo.toml`, `params.toml`, `languages.en.toml`, `menus.en.toml`, `markup.toml`,
`taxonomies.toml`, and `module.toml` (the theme import). It was seeded from Congo's
`exampleSite` config and then customized — see the
[Congo docs](https://jpanther.github.io/congo/docs/configuration/) for every parameter.

## Deployment

Mirrors the sibling `website/` and `notes/` repos. Infrastructure is AWS CDK in `infra/`:

- **`BlogShared`** — imports the account-wide GitHub Actions OIDC provider (created by
  `website`; one per account) and the `blog-infra-deploy` role CI uses for `cdk deploy`.
- **`BlogSiteDev`** — one environment: a private S3 bucket behind a CloudFront
  distribution (OAC), an in-region ACM certificate, Route53 alias records, a WAF WebACL,
  a directory-index CloudFront Function, and the branch-scoped `blog-content-dev` role.

Served at **`blog-dev.rickgwaterman.com`**. Two GitHub Actions workflows run via OIDC
(no long-lived AWS keys); both authenticate with the repo secrets `AWS_ACCOUNT_ID` and
`HOSTED_ZONE_ID`:

- **`infra.yml`** — `cdk deploy` on pushes touching `infra/**`.
- **`deploy.yml`** — on every push to `develop`: installs Go + Hugo extended, fetches the
  Congo Hugo Module, builds with `--baseURL https://blog-dev.rickgwaterman.com/`, syncs
  `public/` to S3, and invalidates CloudFront.

Unlike the Node-based siblings, the build step needs Go plus a network fetch of the Hugo
Module; `go.mod`/`go.sum` pin the theme so CI is reproducible.

### First-time / local infra deploy

The `blog-infra-deploy` role is created by `BlogShared`, so the very first deploy is run
locally with admin credentials (CI can assume the role only after it exists):

```sh
cd infra && npm ci
AWS_ACCOUNT_ID=<account> HOSTED_ZONE_ID=<zoneId> \
  npx cdk deploy BlogShared BlogSiteDev --require-approval never
```

### Adding prod (`blog.rickgwaterman.com`)

Prod is intentionally not stood up yet. To add it: append a `prod` entry to `SITE_ENVS`
in `infra/lib/site-config.ts` and a matching `prod` case to `deploy.yml`'s
"Resolve environment" step, then deploy.
