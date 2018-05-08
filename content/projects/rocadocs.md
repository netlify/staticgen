---
title: Rocadocs
repo: rocadocs/rocadocs
homepage: http://rocadocs.com
language:
  - Python
license:
  - Apache 2.0
templates:
  - None
description: Opinionated static documentation generator using Markdown
---

Rocadocs is a technical documentation system targeted at developers and technical people alike.

It simply takes whatever Markdown structure you have on disk and transforms it in documentation you can host anywhere, 
all features apart from generation step itself provided entirely in frontend.

Rocadocs also replicates and maintains directory structure and uses that as a basis for the web navigation.

It was designed entirely on the premise of getting a lot of documents transformed and served quickly 
with sensible defaults for configuration, independent of current structure and contents of the files, making no assumptions 
apart that they are Markdown files.

Main features:

- GitHub flavoured Markdown support, including task lists
- In-document `[TOC]` support
- Fenced and inline code blocks
- rST style admonitions
- Search

Intentionally missing features:

- Config files
- Custom Markdown "improvements"
- Templates
- Customization beyond setting the title of the page
