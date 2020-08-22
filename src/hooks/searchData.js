import { useStaticQuery, graphql } from 'gatsby'

export const useAllSearchData = () => {
  const { allStripeSku, allContentfulHappyHour } = useStaticQuery(
    graphql`
      query allSearchData {
        allStripeSku {
          edges {
            node {
              price
              product {
                description
                attributes
                name
                metadata {
                  basePrice
                  contentfulSlug
                  slug
                }
                caption
              }
            }
          }
        }
        allContentfulHappyHour {
          edges {
            node {
              neighborhood
              name
              slug
            }
          }
        }
      }
    `
  )
  const happyHours = allContentfulHappyHour.edges.map(item => item.node)
  const skus = allStripeSku.edges.map(item => item.node)
  return { packages: { name: 'Packages', results: skus }, happyHours: { name: 'Happy Hours', results: happyHours } }
}
