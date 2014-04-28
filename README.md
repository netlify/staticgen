# StaticGen

A leaderboard of top open-source static site generators.

## Contributing

Missing a static site generator here? Just fork the repo and add your generator
as a `<name>.yml` in the `source/projects` folder.

Make sure to follow the following rules:

*   **Static Site Generation:** No "flat-file CMSs" or similar tools. The program must be able to output a static website that can be hosted in places like BitBalloon, S3 or Github Pages.
*   **Open Source:** The generator must have a public repository on Github that we can link to and pull in stats from.
*   **Stick to the format:** Fill out all the same fields as the other static site generators in `source/projects`.

## Running locally

StaticGen is built with Middleman. To install and run locally:

   git clone https://github.com/BitBalloon/staticgen.git
   cd staticgen
   bundle install
   bundle exec middleman

## BitBalloon

StaticGen is built and maintained by [BitBalloon](https://www.bitballoon.com), a hosting service for static websites.
