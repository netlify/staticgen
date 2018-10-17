---
title: Metabake.org
repo: metabake
homepage: http://www.metabake.org
language: JavaScript
license: MIT
templates: Pug and Markdown
description: 10 times more productive web app development via low code such as Pug
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

This will create index.html. Of course you can use regular Pug syntax to include markdown with CSS support:
```pug
    include:metaMDtf comment.md
```

## Home Page

There is also an admin module, a watcher module, Hybrida mobile apps, SPA, Blog, Website, CRUD, PWA, Electron, Cloud v2.0 via AWS|FireStore, RIOTjs and more. 
Primary focus is high development productivity (via "low code") and being easy to learn. But it is also fully flexibile to build any webapp in any directory tree structure you like an use any CSS/SASS framework you like.
Metabake supports css classes in markdown, plus, because it uses Pug - it can also do any html layout. But metabake is not static only - it fully supports and has examples and docs for dynamic apps.

[Metabake.org](http://www.metabake.org)
