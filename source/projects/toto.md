---
title: Toto
repo: cloudhead/toto
homepage: http://cloudhead.io/toto
language: Ruby
markdown:
templates: ERB
description: Git-powered, minimalist blog engine for hackers of Oz.
---

toto is a git-powered, minimalist blog engine for the hackers of Oz. The engine weighs around ~300 sloc at its worse.
There is no toto client, at least for now; everything goes through git.

### Philosophy

Everything that can be done better with another tool should be, but one should not have too much pie to stay fit.
In other words, toto does away with web frameworks or DSLs such as sinatra, and is built right on top of **rack**.
There is no database or ORM either, we use plain text files.

Toto was designed to be used with a reverse-proxy cache, such as [Varnish](http://varnish-cache.org).
This makes it an ideal candidate for [heroku](http://heroku.com).

Oh, and everything that can be done with git, _is_.

### How it works

- content is entirely managed through **git**; you get full fledged version control for free.
- articles are stored as _.txt_ files, with embedded metadata (in yaml format).
- articles are processed through a markdown converter (rdiscount) by default.
- templating is done through **ERB**.
- toto is built right on top of **Rack**.
- toto was built to take advantage of _HTTP caching_.
- toto was built with heroku in mind.
- comments are handled by [disqus](http://disqus.com)
- individual articles can be accessed through urls such as _/2009/11/21/blogging-with-toto_
- the archives can be accessed by year, month or day, with the same format as above.
- arbitrary metadata can be included in articles files, and accessed from the templates.
- summaries are generated intelligently by toto, following the `:max` setting you give it.
- you can also define how long your summary is, by adding `~` at the end of it (`:delim`).

### Dorothy

Dorothy is toto's default template, you can get it at <http://github.com/cloudhead/dorothy>. It
comes with a very minimalistic but functional template, and a _config.ru_ file to get you started.
It also includes a _.gems_ file, for heroku.
