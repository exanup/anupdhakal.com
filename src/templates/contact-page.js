/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { RiSendPlane2Line } from 'react-icons/ri'
import ReCaptcha from '@pittica/gatsby-plugin-recaptcha'

import Layout from '../components/layout'
import Seo from '../components/seo'

export const pageQuery = graphql`
    query ContactQuery($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            excerpt(pruneLength: 140)
            frontmatter {
                title
                description
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`

/**
 * https://www.google.com/recaptcha/admin/site/513914309/setup
 * https://www.seancdavis.com/posts/how-to-use-netlify-forms-with-gatsby/
 * https://www.gatsbyjs.com/plugins/@pittica/gatsby-plugin-recaptcha/?=recaptcha
 * https://www.npmjs.com/package/react-recaptcha
 */

const Contact = ({ data }) => {
    const { markdownRemark, site } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    const { description } = frontmatter

    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
    }

    const handleVerify = (token) => {
        console.log(token)
    }

    return (
        <Layout className="contact-page" sx={contactStyles.contactPage}>
            <Seo
                title={frontmatter.title}
                description={
                    description ||
                    frontmatter.title + ' - ' + site.siteMetadata.title
                }
            />
            <div className="wrapper">
                <h1>{frontmatter.title}</h1>
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
                <form
                    className="contact-form"
                    action="/thanks"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p>
                        <label>
                            Your name
                            <input type="text" name="name" required />
                        </label>
                    </p>
                    <p>
                        <label>
                            Your email
                            <input type="email" name="email" required />
                        </label>
                    </p>
                    <p>
                        <label>
                            You want to talk about
                            <input type="text" name="subject" required />
                        </label>
                    </p>
                    <p>
                        <label>
                            Your message
                            <textarea name="message" required></textarea>
                        </label>
                    </p>
                    <ReCaptcha
                        action="thanks"
                        siteKey="6LfFtaEeAAAAAE3eeWLKDvORZzP5_h_3ZPGLEU20"
                        onVerify={handleVerify}
                        submitted={submitted}
                    />
                    <p className="text-align-right">
                        <button
                            className="button"
                            sx={{
                                variant: 'variants.button',
                            }}
                            type="submit"
                        >
                            Send Message{' '}
                            <span className="icon -right">
                                <RiSendPlane2Line />
                            </span>
                        </button>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Contact

const contactStyles = {
    contactPage: {
        input: {
            border: '6px solid',
            borderColor: 'inputBorder',
            bg: 'inputBackground',
            outline: 'none',
        },
        textarea: {
            border: '6px solid',
            borderColor: 'inputBorder',
            bg: 'inputBackground',
            outline: 'none',
        },
    },
}
