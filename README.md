## :warning: We have moved staticgen.com to jamstack.org/generators
You can still contribute at https://github.com/jamstack/jamstack.org/ or join us on Slack at http://jamstack.slack.com/

---

## staticgen.com

[staticgen.com](http://staticgen.com), a leaderboard of top open-source static site generators.

[![Netlify Status](https://api.netlify.com/api/v1/badges/388637c1-8040-4b2d-84b4-1cfa38cd62bb/deploy-status)](https://app.netlify.com/sites/staticgen/deploys)

## Contributing

Missing a static site generator here? Just fork the repo and add your generator
as a `<name>.md` in the `content/projects` folder.

Make sure to follow the following rules:

- **Static Site Generation:** No "flat-file CMSs" or similar tools. The program must be able to output a static website that can be hosted in places like Netlify, S3 or Github Pages.
- **Open Source:** The generator must have a public repository on Github that we can link to and pull in stats from.
- **Stick to the format:** Fill out all the same fields as the other static site generators in `content/projects`.
- **Short description:** Keep all the details for the body text, keep the description for the overview page short and sweet.

## Usage

Be sure that you have the latest node and npm installed, then clone this repository and run:

```bash
npm install
npm start
```

In order to successfully retrieve Twitter followers and repository stars (GitHub or GitLab), you
will need authentication keys for these services.

For GitHub, all you'll need is a personal access token with the repo and gist scopes. This can be
generated at <https://github.com/settings/tokens>. For GitLab, you'll also need a personal access
token. This can be generated at <https://gitlab.com/profile/personal_access_tokens>. For Twitter,
you need to create an application at <https://apps.twitter.com> to get the necessary tokens. When
deploying, you must set the environment variables per the example below. If you are developing
locally, you can set these in a `.env` file at the root of the repo.

```
GITHUB_TOKEN=examplekey123abc
GITLAB_TOKEN-examplekey123abc
TWITTER_CONSUMER_KEY=examplekey231abc
TWITTER_CONSUMER_SECRET=examplekey321abc
TWITTER_ACCESS_TOKEN_KEY=examplekey231abc
TWITTER_ACCESS_TOKEN_SECRET=examplekey321abc
```

GitHub, GitLab, and Twitter data is cached in the `.tmp` directory, and online in a Gist. If neither
has data newer than 24 hours old, fresh data is fetched from GitHub, GitLab, and Twitter. Fetching
caching occur automatically during the build.

Then visit http://localhost:8000/ - Gatsby will automatically reload when changes occur.

To test a production build locally, do:

```bash
npm run stage
npm run serve
```

To run a production build for deployment:

```bash
npm run build
```

## Netlify

StaticGen.com is built and maintained by [Netlify](https://www.netlify.com), a hosting and automation service for static websites and apps.

## License

StaticGen is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).
