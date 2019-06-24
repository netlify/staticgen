---
title: Metabake
repo: metabake/MetaBake
homepage: https://www.MetaBake.org
language:
  - JavaScript
license:
  - MIT
templates:
  - Markdown
description: MetaBake's Meta Intuition is WebAdmin Screen to CMS, e-Com, etc. MetaBake is open source and extensible low-code productivity tools for front-end developers.

---

# MetaBake's 'Intuition' WebAdmin

#### 'It will lead YOU in the right direction'

Meta Intuition is WebAdmin Screen to CMS, e-Com, etc.  It is using [markdown](https://daringfireball.net/projects/markdown/syntax), and is written in [pug](https://pugjs.org/api/getting-started.html).

In WebAdmin, you can edit page content using markdown - which won't let you page become broken. It allows you clone existing pages to write another post/page, upload images, custom write own layout in pug and set publish date to posts. 

WebAdmin generates starter site to edit, eg: Website, CMS, Shop or you can choose your existing site. Application has **Admin screen** for all the settings and **Editor screen** where you can perform operations with the content. There is available multiple editors users support, which can be added in Admin screen and users will be notified about it via email.


#### Please star our main project here:
- https://github.com/metabake/metaIntuition

# Features

- edit markdown content
- clone pages
- multiple users
- generates starter site to edit, eg: Website, CMS, Shop
- set publish date to posts
- files upload

# Full Docs

https://metabake.github.io/metaDocs


## Short Installation


1. Before you run, create free [emailJs](https://www.emailjs.com) account: so Meta Intuition accounts can be validated via email.
Also create a email template, and note your emailJs `user_id` and `template_id`, needed to send emails to users.

2. Create a (linux) instance in the cloud, for example on [Digital Ocean](www.digitalocean.com). 

2. Optional: If you will run a large site with terabytes and petabytes, create a NAS, or you can migrate later.

3. Install node, yarn

4. Then install the app:
    ```bash
    $ yarn global add intu
    ```

5. In Terminal run command to start the app: 
    ```
    $ intu
    ```

6. Setup configurations in the browser window `:9081/setup`
Remember your admin email and password. (TODO: Validate admin email, maybe via code)

7. Fast URL's
   `:9081/admin` - to add users
   `:9081/editors` - to edit site

8. Optional: Use HTTP server (eg: [Caddy](caddyserver.com)) to proxy :9081 to get **https**

**NOTE**: If you make a mistake, or want to start over: `$ yarn global remove intu` will remove the DB and installation. It will not remove your website or your 
website's content. But it will remove all the editor: you have to add them again.


# API for MetaBake and WebAdmin

- Use via https://unpkg.com/intu@0.9.12/www/assets/IntuAPI/IntuAPI.min.js
- or better via https://github.com/metabake/mBakeCli/tree/master/zBrowserServices/toolBelt

# Links

- [MetaBake.org](https://www.MetaBake.org)
- [blog.MetaBake.net](http://blog.MetaBake.net)
- [Github](http://git.MetaBake.org)
