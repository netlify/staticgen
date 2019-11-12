const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve('src/templates/project.js')

  const result = await graphql(`
    query loadPagesQuery {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              description
              homepage
              language
              license
              repo
              repohost
              startertemplaterepo
              templates
              title
              twitter
            }
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allMarkdownRemark.edges.forEach(({
    node: {
      html: content,
      frontmatter: {
        title,
        repo,
        homepage,
        twitter,
      },
      parent: {
        name: filename,
      },
    }
  }) => {
    createPage({
      path: filename,
      component: projectTemplate,
      context: {
        title,
        repo,
        homepage,
        twitter,
        content,
      },
    })
  })
}
