/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { RiArrowRightSLine } from 'react-icons/ri'
import {
    RiMailFill,
    RiFacebookBoxFill,
    RiTwitterFill,
    RiLinkedinBoxFill,
    RiYoutubeFill,
    RiInstagramFill,
    RiRssFill,
    RiGithubFill,
    RiTelegramFill,
    RiPinterestFill,
    RiSnapchatFill,
    RiSkypeFill,
    RiDribbbleFill,
    RiMediumFill,
    RiBehanceFill,
} from 'react-icons/ri'
import { FaWordpress, FaVk } from 'react-icons/fa'

import Layout from '../components/layout'
import BlogListHome from '../components/blog-list-home'
import Seo from '../components/seo'
import Icons from '../util/socialmedia.json'

export const pageQuery = graphql`
    query HomeQuery($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                title
                tagline
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(
                            layout: CONSTRAINED
                            width: 585
                            height: 439
                        )
                    }
                }
                cta {
                    ctaText
                    ctaLink
                }
            }
        }
        posts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template: { eq: "blog-post" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        slug
                        title
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(
                                    layout: CONSTRAINED
                                    width: 345
                                    height: 260
                                )
                            }
                        }
                    }
                }
            }
        }
    }
`

const HomePage = ({ data }) => {
    const { markdownRemark, posts } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    const Image = frontmatter.featuredImage
        ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
        : ''
    const sIcons = Icons.socialIcons.map((icons, index) => {
        return (
            <div key={'social icons' + index}>
                {icons.icon === 'email' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiMailFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'facebook' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiFacebookBoxFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'twitter' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiTwitterFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'linkedin' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiLinkedinBoxFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'youtube' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiYoutubeFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'instagram' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiInstagramFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'rss' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiRssFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'github' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiGithubFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'telegram' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiTelegramFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'pinterest' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiPinterestFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'snapchat' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiSnapchatFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'skype' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiSkypeFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'wordpress' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaWordpress />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'dribbble' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiDribbbleFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'medium' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiMediumFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'behance' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiBehanceFill />
                    </a>
                ) : (
                    ''
                )}
                {icons.icon === 'vk' ? (
                    <a
                        href={icons.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaVk />
                    </a>
                ) : (
                    ''
                )}
            </div>
        )
    })
    return (
        <Layout>
            <Seo />
            <div className="home-banner grids col-1 sm-2">
                <div>
                    <h1 className="title">{frontmatter.title}</h1>
                    <p
                        className="tagline"
                        sx={{
                            color: 'muted',
                        }}
                    >
                        {frontmatter.tagline}
                    </p>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <Link
                        to={frontmatter.cta.ctaLink}
                        className="button"
                        sx={{
                            variant: 'variants.button',
                        }}
                    >
                        {frontmatter.cta.ctaText}
                        <span className="icon -right">
                            <RiArrowRightSLine />
                        </span>
                    </Link>
                    <div
                        className="social-icons"
                        sx={{
                            variant: 'variants.socialIcons',
                        }}
                    >
                        {sIcons}
                    </div>
                </div>
                <div>
                    {Image ? (
                        <GatsbyImage
                            image={Image}
                            alt={frontmatter.title + ' - Featured image'}
                            className="featured-image"
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <BlogListHome data={posts} />
        </Layout>
    )
}

export default HomePage
