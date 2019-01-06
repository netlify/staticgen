---
title: Hikaru
repo: AlynxZhou/hikaru
homepage: https://github.com/AlynxZhou/hikaru/
language:
  - CoffeeScript
license:
  - Apache-2.0
templates:
  - Nunjucks
description: A static site generator that generates routes based on directories naturally.
---
A static site generator that generates routes based on directories naturally, powered by [Node.js](https://nodejs.org), NPM and [CoffeeScript](https://coffeescript.org/).

# Install

Hikaru is a command line program (not a module) and you can install it from NPM:

```
# npm i -g hikaru-coffee
```

# Setup site

```
$ hikaru i hikaru-site
$ cd hikaru-site
$ npm install
```

# Install theme

## Clone theme

Using `hikaru-theme-aria` as example:

```
$ git clone https://github.com/AlynxZhou/hikaru-theme-aria.git themes/aria
```

Or if you want commit the whole site you can use submodule:

```
$ git submodule add https://github.com/AlynxZhou/hikaru-theme-aria.git themes/aria
```

## Edit config

```
$ $EDITOR config.yml
```

Set `themeDir` to `aria`

```yaml
themeDir: aria
```

Don't forget to config your theme as its README file.

# Create src file

## Edit file

```
$ $EDITOR srcs/my-first-post.md
```

## Add front matter

```yaml
---
title: My First Post
date: 2018-08-08 09:27:00
layout: post
---
```

## Add content

```markdown
Some content...

<!--more-->

# This is my first post!
```

# Start live server

```
$ hikaru s
```

# Build static files

```
$ hikaru b
```

# More

Docs (Work in progress): [Here](https://github.com/AlynxZhou/hikaru/blob/master/docs/en/index.md)

Default theme ARIA: [hikaru-themes-aria](https://github.com/AlynxZhou/hikaru-theme-aria/)

Example blog built with Hikaru and ARIA: [喵's StackHarbor](https://sh.alynx.xyz/)

