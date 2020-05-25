import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, pageTitle }) {
  const {
    site: { siteMetadata: site },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            homeTitle
            description
            author
            image
          }
        }
      }
    `
  )

  const metaDescription = description || site.description
  const title = pageTitle ? `${pageTitle} | ${site.title}` : site.homeTitle

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: site.image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.author,
        },
        {
          name: `twitter:title`,
          content: site.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  pageTitle: PropTypes.string,
}

export default SEO
