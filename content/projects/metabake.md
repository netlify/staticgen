---
title: MetaBake.org
repo: metabake/_mBake
homepage: https://metabake.org
language:
  - Pug
license:
  - GPL v3.0
templates:
  - Pug
description: 10 times faster web app development via 'low code'
---

MetaBake's mbake CLI lets you generate websites and dynanmic webapps, in Pug, w/ optional RIOTjs - leveraging low code pillars for high productivity.

## Install

It's easy to install

```sh
npm -g i mbake
mbake
```

## First Page

Create index.pug
```
header
body
    p Hello #{key1}
```
and dat.yaml
```
key1 World
```

## Make with mbake

```sh
mbake .
```

## Home Page

[MetaBake.org](http://metabake.org)
