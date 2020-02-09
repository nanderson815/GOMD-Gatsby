import React from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Card, Label, Segment, Sticky, Divider } from 'semantic-ui-react'
import SEO from '../components/seo'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import useContentfulImage from '../hooks/useContentfulImage'
import AdSense from 'react-adsense';


const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let fluid = useContentfulImage(node.data.target.fields.file["en-US"].url);
      return (
        <Img style={{ maxHeight: "300px" }} title={node.data.target.fields.title["en-US"]} fluid={fluid.fluid} />
      );
    },
    [BLOCKS.HR]: node => {
      return (
        <Divider />
      )
    }
  },
};

const BlogPost = (props) => {
  const post = get(props, 'data.contentfulBlogPost')
  const document = post.body.json
  console.log(document)
  let doc2 = documentToReactComponents(document, options);


  return (
    <>
      <Header></Header>
      <SEO title={post.title}
        description={post.seoDesc} />
      <Layout>
        <Grid >
          <Grid.Column computer={11} tablet={11} mobile={16}>
            <Card fluid raised>
              <Img style={{ maxHeight: "450px" }} alt={post.title} fluid={post.image.fluid} />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: "-3px" }}>{post.title}</h1>
                  <Card.Meta>{post.date}</Card.Meta>
                  <Label color="blue" ribbon style={{ fontSize: "15px" }}>{post.category}</Label>
                </Card.Header>

              </Card.Content>
              <Card.Content>
                {doc2}
              </Card.Content>

            </Card>
          </Grid.Column>
          <Grid.Column tablet={5} computer={5} mobile={16}>
            <Sticky offset={90}>
              <Segment raised style={{ paddingBottom: '1px' }}>
                <AdSense.Google
                  client="ca-pub-4839737207231731"
                  slot='4063925755'
                  responsive='true'
                  format='auto'
                  style={{ display: 'block', width: "100% !important" }}
                />
                <p style={{ width: "100%", textAlign: 'center', fontSize: "12px" }}><i>sponsored content</i></p>
              </Segment>
            </Sticky>
          </Grid.Column>
        </Grid>
      </Layout >
    </>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
        site {
        siteMetadata {
        title
      }
      }
    contentfulBlogPost(slug: {eq: $slug }) {
      ...allBlogPostFields
    }
  }
`

