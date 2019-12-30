import { graphql } from 'gatsby'

export const allBlogPostFields = graphql`
  fragment allBlogPostFields on ContentfulBlogPost {
    category
        date
        id
        image {
          fluid(maxWidth: 1800, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_withWebp
          }
          id
          title
        }
        seoDesc
        slug
        title
        body {
          json
        }
  }
  `

export const allHappyHourFields = graphql`
  fragment allHappyHourFields on ContentfulHappyHour {
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
      end2
      start2
    }
    monday {
      end
      start
      end2
      start2
    }
    thursday {
      start
      end
      end2
      start2
    }
    tuesday {
      end
      start
      end2
      start2
    }
    wednesday {
      end
      start
      end2
      start2
    }
    saturday {
      end
      start
      end2
      start2
    }
    sunday {
      end
      start
      end2
      start2
    }
  }
  id
  location {
    lat
    lon
  }
  address
  neighborhood
  mainImg{
    fluid(maxWidth: 1800, resizingBehavior: SCALE) {
    ...GatsbyContentfulFluid_withWebp
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
      `

