---
title: PHPoole
repo: PHPoole/PHPoole
homepage: https://phpoole.org
language:
  - PHP
license:
  - MIT
templates:
  - Twig
description: An easy and lightweight static website generator, written in PHP.
startertemplaterepo: PHPoole/Cecil
twitter: PHPooleSSG
---

PHPoole is a CLI application that merge plain text files (written in [Markdown](https://daringfireball.net/projects/markdown/)), images and [Twig](https://twig.symfony.com/) templates to generate a [static website](https://en.wikipedia.org/wiki/Static_web_page).

## Installation

You can download `phpoole.phar` with the following command from your terminal:
```bash
curl -SOL https://phpoole.org/phpoole.phar
```
Or donwload it from the [**Download**](https://phpoole.org/download/) section.

Then, you can install `phpoole` globally:
```bash
mv phpoole.phar /usr/local/bin/phpoole
chmod +x /usr/local/bin/phpoole
```

> [PHP](http://php.net/manual/en/install.php) 7.1+ is required.

## Create a new website

```bash
phpoole new <mywebsite>
```

To **build** and **serve** the website, just run the following command at the root:
```bash
phpoole serve
```

![Command line demo](https://raw.githubusercontent.com/PHPoole/PHPoole/master/docs/phpoole.gif)
