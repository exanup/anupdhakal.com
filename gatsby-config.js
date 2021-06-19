/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const netlifyCmsPaths = {
    resolve: `gatsby-plugin-netlify-cms-paths`,
    options: {
        cmsConfig: `/static/admin/config.yml`,
    },
}

const settings = require('./src/util/site.json')

const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = settings.meta.siteUrl,
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
    siteMetadata: settings.meta,
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/assets/`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content/`,
                name: `content`,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                gfm: true,
                plugins: [
                    netlifyCmsPaths,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1024,
                            showCaptions: true,
                            linkImagesToOriginal: false,
                            tracedSVG: true,
                            loading: 'lazy',
                        },
                    },
                    {
                        resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
                        options: {
                            // Fields to index
                            fields: [`title`, `template`, `slug`],
                            // How to resolve each field`s value for a supported node type
                            resolvers: {
                                // For any node of type MarkdownRemark, list how to resolve the fields` values
                                MarkdownRemark: {
                                    template: (node) =>
                                        node.frontmatter.template,
                                    title: (node) => node.frontmatter.title,
                                    slug: (node) => node.frontmatter.slug,
                                },
                            },
                            // Optional filter to limit indexed nodes
                            filter: (node, getNode) =>
                                node.frontmatter.tags !== 'exempt',
                        },
                    },
                    `gatsby-remark-responsive-iframe`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-theme-ui',
        `gatsby-plugin-netlify-cms`,
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                trackingIds: [settings.gaMeasurementId],
                pluginConfig: {
                    head: true,
                },
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Anup Dhakal`,
                short_name: `Anup Dhakal`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
                icon: 'static' + settings.meta.iconimage,
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: siteUrl,
                sitemap: `${siteUrl}/sitemap`,
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{ userAgent: '*' }],
                    },
                    'branch-deploy': {
                        policy: [{ userAgent: '*', disallow: ['/'] }],
                        sitemap: null,
                        host: null,
                    },
                    'deploy-preview': {
                        policy: [{ userAgent: '*', disallow: ['/'] }],
                        sitemap: null,
                        host: null,
                    },
                },
            },
        },
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-plugin-webfonts',
            options: {
                fonts: {
                    google: [
                        {
                            family: 'Signika',
                            variants: ['300', '600'],
                            fontDisplay: 'swap',
                            strategy: 'selfHosted',
                        },
                        {
                            family: 'Faustina:ital',
                            variants: ['0,400', '0,600', '1,400', '1,600'],
                            fontDisplay: 'swap',
                            strategy: 'selfHosted',
                        },
                    ],
                },
                useMinify: true,
                usePreload: true,
                usePreconnect: true,
            },
        },
    ],
}
