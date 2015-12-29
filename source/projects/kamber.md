---
title: Kamber
repo: f/kamber
homepage: http://github.com/f/kamber
language: Crystal
license: MIT
templates: ecr
description: Simple Compiled Static Site Server
---

Kamber is a blog server based on [Kemal](http://github.com/sdogruyol/kemal).

Kamber is not a static blog generator, **it's a static blog server**. It _doesn't require_ any other HTTP servers. It uses Crystal and Kemal to generate HTML and also serve it.

## Features

- Supports many post types:
  - **Markdown** Posts
  - GitHub **Gist**
  - **Tweet** Embeds
  - **Video** Embeds
  - Disqus Comments
- **Very fast, ~15x faster than other static site generators/servers**, since it's based on [Kemal](http://github.com/sdogruyol/kemal). [See Benchmarks](https://github.com/sdogruyol/kemal#super-fast-3)
- Easy to develop. Just add contents to **`posts.yml`** file.
- Custom themes.
