import { useStaticQuery, graphql } from 'gatsby'

export const useAllSearchData = () => {
  const { allContentfulHappyHour } = useStaticQuery(
    graphql`
      query allSearchData {
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
  return { packages: { name: 'Packages', results: [] }, happyHours: { name: 'Happy Hours', results: happyHours } }
}
