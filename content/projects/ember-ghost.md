---
title: Ember-Ghost
repo: stonecircle/ember-ghost
homepage: https://github.com/stonecircle/ember-ghost
language:
  - JavaScript
license:
  - MIT
templates:
  - Ember
  - Markdown
description: Fully-functional, SEO friendly static site implementation of a blog system built on Ember
startertemplaterepo: stonecircle/ember-ghost-netlify-casper-template
---

This project is designed to be a fully-functional, static site implementation of a blog system that is mostly compatible with [Ghost](https://ghost.org/) and is built on EmberJS with fully working out of the
box SEO friendly output.

## Features

* Fast no-reload page changes
* No web-development skills required to get up and running
* Uses Markdown to author content
* Built on Ember and uses ember-cli, the best frontend cli on the market right now!

## Templates

Ember-Ghost supports the use of shallow forks of Ghost themes and currently supports

- [Ember Ghost Casper Template](https://github.com/stonecircle/ember-ghost-casper-template) which is a shallow fork of the official [Casper Template](https://github.com/TryGhost/Casper)
- [Ember Ghost Atilla Template](https://github.com/stonecircle/ember-ghost-attila-template) which is a shallow fork of [Atilla](https://github.com/zutrinken/attila)

As Ghost uses handlebars it is not too difficult to port an existing template to use Ember templates.


## Examples

The default output can be seen deployed on Netlify here: https://ember-ghost-casper-template.netlify.com/

If you want an example of the this "in production" then check out the [Stone Circle
Blog](https://blog.stonecircle.io). If you use this in production let us know [on
Twitter](https://twitter.com/stonecircle_co) and we can add a "built with
ember-ghost-casper-template" wiki.

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is performed by EmberJS' build system.
