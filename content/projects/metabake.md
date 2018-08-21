---
title: Metabake.org
repo: metabake/_mBake
homepage: http://www.metabake.org
language: Pug
license: GPL v3.0
templates: Pug
description: 10 times faster web app development via low code
---

Metabake mbake CLI lets you generate websites and dynanmic webapps in Pug with optional RIOTjs by leveraging low code pillars for high developer productivity

## Install

Easy to install

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

[Metabake.org](http://www.metabake.org)
