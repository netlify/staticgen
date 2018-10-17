---
title: Sphido
repo: sphido/sphido
homepage: https://sphido.org/
language:
  - JavaScript
license:
  - MIT
templates:
  - Nunjucks  
description: A rocket fast, lightweight, static site generator.
twitter: ozzyczech
---

Sphido is pure **static site generator** written with speed, simplicity and flexibility in mind.

## Installation

```bash 
$ npm i sphido
```

## Usage

```javascript
const globby = require('globby');
const Sphido = require('sphido');

(async () => {

  // 1. get list of pages...
  const pages = await Sphido.getPages(
    await globby('content/**/*.{md,html}'), ...Sphido.extenders //, custom extenders...
  );
  // 2. save them... with default HTML template
  for await (const page of pages)    
    await page.save(page.dir.replace('content', 'public'));
  }
})();
```

[See more examples](https://github.com/sphido/sphido/tree/master/examples) on GitHub.

## Supports

* YAML front-matter
* html/markdown source
* custom extenders
* Nunjucks templates
