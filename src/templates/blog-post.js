import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const BackLink = styled(Link)`
  color: #60635c;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <BackLink to="/">← Back to Posts</BackLink>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
