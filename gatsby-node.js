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
        resolve(
            graphql(
                `
          {
       allContentfulHappyHour {
    edges {
      node {
        best
        fridayDesc {
          fridayDesc
        }
        hours {
          friday {
            end
            start
          }
          monday {
            end
            start
          }
          thursday {
            start
            end
          }
          tuesday {
            end
            start
          }
          wednesday {
            end
            start
          }
          saturday {
            end
            start
          }
          sunday {
            end
            start
          }
        }
        id
        location {
          lat
          lon
        }
        mainImg {
          fluid {
            base64
          }
        }
        name
        mondayDesc {
          mondayDesc
        }
        phone
        slug
        thursdayDesc {
          thursdayDesc
        }
        tuesdayDesc {
          tuesdayDesc
        }
        website
        wednesdayDesc {
          wednesdayDesc
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
                happyHours.forEach((post, index) => {
                    createPage({
                        path: `/atlanta-happy-hour/${post.node.slug}/`,
                        component: happyHour,
                        context: {
                            slug: post.node.slug
                        },
                    })
                })
            })
        )
    })
}