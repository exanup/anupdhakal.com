import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

export const pageQuery = graphql`
    query AboutQuery($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            excerpt(pruneLength: 242)
            frontmatter {
                title
                description
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
            }
        }
    }
`
const AboutPage = ({ data }) => {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html, excerpt } = markdownRemark

    const description = frontmatter.description || excerpt
    const Image = frontmatter.featuredImage
        ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
        : ''

    return (
        <Layout className="page">
            <Seo
                title={frontmatter.title}
                description={description}
                image={Image ? Image.images.fallback.src : null}
            />
            <div className="wrapper">
                <h1>{frontmatter.title}</h1>
                <article dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Layout>
    )
}

export default AboutPage
