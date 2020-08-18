import { graphql, useStaticQuery } from 'gatsby'

export const useStripeSkuData = () => {
  const { allStripeSku } = useStaticQuery(
    graphql`
      query SkusForProduct {
        allStripeSku {
          edges {
            node {
              ...allSkuFields
            }
          }
        }
      }
    `
  )
  return allStripeSku.edges.map(item => item.node)
}
