---
title: apt-now
repo: cmotc/apt-now
homepage: http://cmotc.github.io/apt-now
language: *sh
license: MIT
templates: CSS
description: Instant custom debian repositories
---

This tool is essentially a static site generator geared toward generating and
formatting a specific type of content in a specific type of way, the content being
GNU/Linux or Android/Linux binary packages, and the format being a signed
repository accessible from the web or something like it(It can also, for instance,
be used to statically host software repositories over i2p with no substantial
modification.) It does this by taking advantage of the structural regularity of
these types of resources and constructs the whole site on the client side,
transmitting content to the server only after a valid repository has been built.
This means that the server doesn't have to run any code at all to present the site
to the end-user taking advantage of the resource over the web, doesn't need to
support ssh or remote desktop, and doesn't even technically need to support ftp or
git, as long as a way of transferring the repository to the remote storage service
can be included in the program.
