---
title: ssg
repo: https://www.romanzolotarev.com/bin/ssg4
homepage: https://www.romanzolotarev.com/ssg.html
language:
  - ksh
license:
  - ISC
templates:
  - None
description: ssg is a static site generator written in shell. It is only 180 Lines of code.
---

ssg is made with with find(1), grep(1), and lowdown(1).
Optionally it converts Markdown files to HTML with lowdown(1).

ssg, now version 4, depends on few programs from OpenBSD base:

`
$ for f in $(which cat cpio date sh awk find grep printf readlink sort tee)
do ldd "$f"
done | awk '/\//{print$7}' | grep '.' | sort -u
/bin/cat
/bin/cpio
/bin/date
/bin/sh
/usr/bin/awk
/usr/bin/find
/usr/bin/grep
/usr/bin/printf
/usr/bin/readlink
/usr/bin/sort
/usr/bin/tee
/usr/lib/libc.so.92.5
/usr/lib/libm.so.10.1
/usr/lib/libutil.so.13.0
/usr/lib/libz.so.5.0
/usr/libexec/ld.so
`
