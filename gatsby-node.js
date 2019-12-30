const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { "../../theme.config$": path.join(__dirname, "/src/semantic/theme.config") }
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const happyHour = path.resolve('./src/Templates/happyHour.js')
    const blogTemplate = path.resolve('./src/Templates/blogPost.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
               node {
                slug
               }
              }
            }
       allContentfulHappyHour {
    edges {
      node {
        slug
      }
    }
  }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const happyHours = result.data.allContentfulHappyHour.edges
        const blogPosts = result.data.allContentfulBlogPost.edges
        happyHours.forEach((post, index) => {
          createPage({
            path: `/atlanta-happy-hour/${post.node.slug}/`,
            component: happyHour,
            context: {
              slug: post.node.slug
            },
          })
        })
        blogPosts.forEach((post, index) => {
          createPage({
            path: post.node.slug,
            component: blogTemplate,
            context: {
              slug: post.node.slug
            }
          })
        })
      })
    )
  })
}