---
title: Metabake
repo: metabake/mbake-CLI-for-Metabake
homepage: http://www.metabake.net
language: JavaScript
license: MIT
templates: Pug and Markdown
description: Low-code productivity for programmers via generators for Pug, Markdown and much more; including dynamic data binding.
---

Metabake mbake CLI lets you generate websites and dynamic webapps in Pug by leveraging low code pillars for high development productivity.

## Install

Easy to install

```sh
yarn global add mbake
mbake
```

## First Page

Create file index.pug
```pug
header
body
    p Hello #{key1}
```
and create file dat.yaml
```yaml
key1: World
```

### Now make with mbake

```sh
mbake .
```

This will create index.html. 

Of course you can use regular Pug syntax to include other Pug files; or Markdown. Metabake Markdown flavor includes CSS support:
```pug
    include:metaMD comment.md
```

## Home Page

Examples include an admin module, a watcher module, SPA, Blog, Website, Slides, Dashboard, CRUD, PWA, Electron, Hybrid mobile apps, Cloud v2.0 via AWS|FireStore, RIOTjs and more. 
Primary focus is high development productivity (via "low code") and being easy to learn. But it is also fully flexible to build any WebApp in any directory tree structure you like an use any CSS/SASS framework you like.
Metabake supports CSS classes in Markdown, plus, because it uses Pug - it can also do any HTML layout. But Metabake is not static only - it fully supports and has examples and docs for dynamic apps.

[Metabake.net](http://www.metabake.net)
