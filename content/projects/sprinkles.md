---
title: Sprinkles
repo: tdammers/sprinkles
homepage: https://sprinkles.tobiasdammers.nl
language:
  - Haskell
license:
  - BSD-3-Clause
templates:
  - Ginger
description: Build HTML front-ends to diverse data sources without any programming.
---

You write:

- A YAML configuration file that defines URLs and data sources
- A set of templates that say how to turn data into HTML
- Some static assets

Sprinkles then turns that into a fully functioning dynamic website - or bakes it into a static site.


### Supported data sources

- Local files
- HTTP(S)
- SQL databases:
  - MySQL
  - SQLite
  - PostgreSQL
- Subprocesses


### Supported data fomats

- JSON
- YAML
- Markdown
- ReStructuredText
- Textile
- LaTeX
- WikiCreole
- HTML
- Plain text
- DOCX


### Typical Use Cases

- As a **presentation layer for a headless CMS**. Sprinkles can load data from
  a JSON API, feed it directly to your templates, and serve those on the fly.
- As a **poor man's CMS**, pulling data from a set of local files. Sprinkles
  supports a wide range of data formats, including JSON, YAML, Markdown,
  ReStructuredText, DOCX, HTML, and several more.
- As a **static site generator**. Develop your website locally, rendering it
  dynamically until you are happy with it, then bake it into a static website
  ready to upload to a web server.
