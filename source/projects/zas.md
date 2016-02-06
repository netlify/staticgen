---
title: Zas
repo: imdario/zas
homepage: http://github.com/imdario/zas
language: Go
license: AGPL v3
templates: Go Templates
description: Most zen static website generator in Golang.
---

### Why another one? C'mon, you must be kidding...

I just wanted to set up a very simple website (just a few pages) with Jekyll and it didn't feel right. I didn't want a blog.

I checked other projects but they were incomplete, cumbersome or solved the wrong problem (blogs, blogs everywhere). I wanted a zen-like experience. Just a layout and some Markdown files as pages with unobstrusive structure and configuration.

Yes, it is another NIH but... I think Zas is a different kind of beast. I admit that I probably overlooked some projects.

### Where is the difference with others?

1. Markdown only.
2. Just a loop. Zas just loops over all .md and .html files (oh, I told a little lie in #1, my bad - please, bear with me) in current directory (and subdirectories), ignoring all any other file (including dot-files).
3. Your imagination as limit. Zas has a simple extension mechanism based in subcommands. Do you really need to handle a blog with Zas? Install/create a new extension and do it!
4. Unobstrutive structure, no '_' files. More in [Usage](#usage) section.

## Usage

Install:

    $ go get github.com/imdario/zas

Go to your site's directory and do:

    $ zas init

A .zas directory will be created with sane defaults. Put your layout in .zas/layout.html and you are ready.

    $ zas

Yes. Enough. Your delightful site is on .zas/deploy. Enjoy.

What is happening here? Well, "generate" subcommand is called by default. This subcommand accepts the following flags:

* -verbose: print ALL the things!
* -full: generates all the input files. By default, zas has an incremental mode which keeps source and deploy directories in sync.

More at [Zas repository](https://github.com/imdario/zas/blob/master/README.md).
