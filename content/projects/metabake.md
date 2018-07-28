---
title: MetaBake.org
repo: metabake/_mBake
homepage: https://metabake.org
language:
  - Pug
license:
  - GNU GPL v3.0
templates:
  - Pug (w/ RIOTjs)
description: 10 times faster web app development via low code.
---

MetaBake's mbake CLI is lets you generate websites; and webapps, in Pug - leveraging low code pillars.

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
key1: World
```

## Make with mbake:

```sh
mbake .
```

## Home Page

[MetaBake.org](http://metabake.org)
