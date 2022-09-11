/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { RiSendPlane2Line } from 'react-icons/ri'

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

const Contact = ({ data }) => {
    const { markdownRemark, site } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    const { description } = frontmatter

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
                    netlify-honeypot="bot-field"
                >
                    <p className="hidden" aria-hidden="true">
                        <label>
                            Do not fill this out if you are a human:{' '}
                            <input name="bot-field" />
                        </label>
                    </p>
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
