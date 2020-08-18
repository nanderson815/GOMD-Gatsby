import { useStaticQuery, graphql } from 'gatsby'

export const useAllSearchData = () => {
  const { allStripeSku, allContentfulHappyHour } = useStaticQuery(
    graphql`
      query allSearchData {
        allStripeSku {
          edges {
            node {
              ...allSkuFields
            }
          }
        }
        allContentfulHappyHour {
          edges {
            node {
              best
              seoDescription
              days
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
              address
              neighborhood
              mainImg {
                fluid {
                  base64
                }
                id
                title
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
              description {
                description
              }
              tags
              sundayDesc {
                sundayDesc
              }
              saturdayDesc {
                saturdayDesc
              }
            }
          }
        }
      }
    `
  )
  const happyHours = allContentfulHappyHour.edges.map(item => item.node)
  const skus = allStripeSku.edges.map(item => item.node)
  return skus.concat(happyHours)
}
