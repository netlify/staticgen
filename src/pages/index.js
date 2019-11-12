import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
  </Layout>
)
  /*
    <ProjectsList>
      {withPromo(promo, visibleProjects.map(project => (
        <li key={project.slug}>
          <Project fields={fields} {...project} />
        </li>
      )))}
    </ProjectsList>
  </Layout>
)
*/

export default IndexPage
