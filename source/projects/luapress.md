---
title: Luapress
repo: Fizzadar/Luapress
homepage: http://github.com/Fizzadar/Luapress
language: Lua
license: MIT
templates: LHTML
description: Luapress is *yet another* static blog generator, written in Lua.
---

# Luapress v1.1.0

Luapress is *yet another* static blog generator, written in Lua, with posts in markdown.

**Requirements:**

+ Lua5.1
+ [LuaFileSystem](http://keplerproject.github.com/luafilesystem) (`luarocks install luafilesystem`)

**How-To:**

    #
    # Luapress v1.1.0
    # Usage: ./press.lua <optional url: "http://example.com">
    # Example: ./press.lua
    # Example: ./press.lua http://example.com
    # Example: ./press.lua nocache http://example.com
    # Example: ./press.lua clean http://example.com
    # For more details: https://github.com/Fizzadar/Luapress
    #

+ Download [an Luapress release](https://github.com/Fizzadar/Luapress/releases) or clone this development repo
+ Rename `config.example.lua` => `config.lua`
+ Set url to your live or staging location
+ Drop markdown (.md) files in posts/ and pages/
+ Run `./press.lua <optional url http://example.com>` from shell
+ Copy contents of build/ to web

**Options & Notes:**

+ Set `config.link_dirs = true` in `config.lua` to have posts & pages generated at `/name/index.html` rather than `/name.html`
+ The `inc/` directory will be copied to `build/inc/`, and your template inc to `build/inc/template`
+ Set `$key=value` in posts for custom data (use `<?=self:get('post').key ?>` in template)
+ Set `$time=time_in_epoch_seconds` or `$date=day/month/year` to customize post time (default file update time)
+ With pages set `$order=number` to determine page ordering in links list
+ Hide pages from the link list with `$hidden=true`
+ Add `nocache` before the URL to ignore caching (for template dev)
+ Add `clean` before the URL to empty the `inc/` directory before starting (forces `nocache`)

**Example:**

I'm using it for my blog, [Pointless Ramblings](http://pointlessramblings.com).