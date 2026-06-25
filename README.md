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
when ready. The `content/posts/welcome/` folder is a placeholder you can overwrite with
your first real article.

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

Not yet wired up. The intended path mirrors the sibling `website/` and `notes/` repos:
AWS CDK (`SharedStack` importing the account OIDC provider + `SiteStack` with
S3 + CloudFront/OAC + ACM + Route53) deployed by GitHub Actions via OIDC on push to
`develop`, served at `blog.rickgwaterman.com`. Note that, unlike those Node-based builds,
this site's CI build step needs Go plus a network fetch of the Hugo Module.
