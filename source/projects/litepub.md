---
title: LitePub
repo: https://github.com/mirovarga/litepub
homepage: https://github.com/mirovarga/litepub
language: Go
license: MIT
templates: Go Templates
description: A Lightweight Static Blog Generator
---

LitePub is a static blog generator that tries to be as easy to use as possible.

It requires no software dependencies, needs no configuration files, uses no databases. All it needs is one binary,
posts written in Markdown and a set of templates to render the posts to static HTML files.

Posts don't have to include any special metadata like title or date in them; of course they do have titles, dates
and optionally tags but they flow naturally and posts thus look like posts on their own.

LitePub supports tagging posts, draft posts and provides a built-in HTTP server that can rebuild a blog on the fly
when its posts or templates change.
