require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Georgia on my Dime`,
    description: `Discover Atlanta's best Happy Hours and restaurant deals with Georgia on my Dime! We have the only complete list of Atlanta Happy Hour and specials.`,
    author: `@georgiaonmydime`,
    siteUrl: 'https://georgiaonmydime.com',
    image: '/atlanta-happy-hour-georgia-on-my-dime.jpeg'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Georgia on my Dime`,
        short_name: `GOMD`,
        start_url: `/`,
        background_color: `#eff0f1`,
        theme_color: `#1c70b5`,
        display: `standalone`,
        icon: 'src/images/dimeLogo.svg'
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`./src/offlineAnalytics.js`),
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-stripe`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Sku"],
        secretKey: process.env.GATSBY_STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-108351219-1",
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          'Quicksand'
        ],
        display: 'swap'
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `lt4eu82gh5sn`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
