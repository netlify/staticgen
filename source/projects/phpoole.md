---
title: PHPoole
repo: narno/phpoole
homepage: http://phpoole.narno.org
language: PHP
license: MIT
templates: Twig
description: Light and easy static website generator written in PHP.
---

PHPoole is a light and easy static website generator written in PHP. It takes your content (written in Markdown plain text format), merges it with layouts (Twig templates) and generates static HTML files.

### Quick Start

#### 1. Get PHPoole
    $ curl -SO http://phpoole.narno.org/downloads/phpoole.phar

#### 2. Initialize a new website
    $ php phpoole.phar --init

#### 3. Generate the static website
    $ php phpoole.phar --generate

#### 4. Serve the local website
    $ php phpoole.phar --serve

#### 5. Deploy the website on GitHub Pages
    $ php phpoole.phar --deploy
