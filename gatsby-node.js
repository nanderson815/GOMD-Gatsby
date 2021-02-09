const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { '../../theme.config$': path.join(__dirname, '/src/semantic/theme.config') }
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const happyHour = path.resolve('./src/Templates/happyHour.js')
    const exclusiveDealTemplate = path.resolve('./src/Templates/exclusiveDeal.js')
    resolve(
      graphql(
        `
          {
            allContentfulHappyHour {
              edges {
                node {
                  slug
                  neighborhood
                }
              }
            }
            allStripeSku {
              edges {
                node {
                  product {
                    metadata {
                      slug
                    }
                  }
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
        const exclusiveDeals = result.data.allStripeSku.edges
        happyHours.forEach(post => {
          createPage({
            path: `/atlanta-happy-hour/${post.node.slug}`,
            component: happyHour,
            context: {
              slug: post.node.slug,
              neighborhood: post.node.neighborhood
            }
          })
        })
        exclusiveDeals.forEach(post => {
          createPage({
            path: `/exclusive-dining/${post.node.product.metadata.slug}`,
            component: exclusiveDealTemplate,
            context: {
              slug: post.node.product.metadata.slug
            }
          })
        })
      })
    )
  })
}
