import { useStaticQuery, graphql } from "gatsby"
export const useHappyHourData = () => {
  const { allContentfulHappyHour } = useStaticQuery(
    graphql`
      query happyHourData {
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
        saturdayDesc{
          saturdayDesc
        }
      }
    }
  }
}
    `
  )
  return allContentfulHappyHour.edges.map(item => item.node)
}