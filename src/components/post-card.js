/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const PostCard = ({ data }) => (
    <Link
        to={data.frontmatter.slug}
        sx={{
            variant: 'links.postLink',
        }}
    >
        <article
            className="post-card"
            sx={{
                bg: 'cardBg',
            }}
        >
            {data.frontmatter.featuredImage ? (
                <GatsbyImage
                    image={
                        data.frontmatter.featuredImage.childImageSharp
                            .gatsbyImageData
                    }
                    alt={data.frontmatter.title + ' - Featured image'}
                    className="featured-image"
                />
            ) : (
                ''
            )}
            <div className="post-content">
                <h2 className="title">{data.frontmatter.title}</h2>
                <p
                    className="meta"
                    sx={{
                        color: 'muted',
                    }}
                >
                    <time>{data.frontmatter.date}</time>
                </p>
                <p className="description">
                    <small>{data.frontmatter.description}</small>
                </p>
            </div>
        </article>
    </Link>
)

export default PostCard
