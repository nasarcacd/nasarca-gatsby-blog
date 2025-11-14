import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { ThemeContext } from "../context/ThemeContext"

const BackLink = styled(Link)`
  color: ${props => (props.isDarkMode ? "#ffd700" : "#60635c")};
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => (props.isDarkMode ? "#ffed4e" : "#24248a")};
    transform: translateX(-5px);
  }
`

const PostHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => (props.isDarkMode ? "#444" : "#e0e0e0")};
`

const PostTitle = styled.h1`
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  margin-bottom: 0.5rem;
`

const PostMeta = styled.div`
  color: ${props => (props.isDarkMode ? "#999" : "#666")};
  font-size: 0.95rem;
  margin-bottom: 1rem;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
`

const Tag = styled.span`
  background: ${props => (props.isDarkMode ? "#444" : "#e0e0e0")};
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`

const PostContent = styled.div`
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  line-height: 1.8;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  a {
    color: ${props => (props.isDarkMode ? "#4da6ff" : "#24248a")};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  pre {
    background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;

    code {
      background: transparent;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
    margin-left: 0;
    padding-left: 1rem;
    color: ${props => (props.isDarkMode ? "#ccc" : "#666")};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <Layout>
      <div>
        <BackLink to="/" isDarkMode={isDarkMode}>
          ← Back to Posts
        </BackLink>

        <PostHeader isDarkMode={isDarkMode}>
          <PostTitle isDarkMode={isDarkMode}>
            {post.frontmatter.title}
          </PostTitle>
          <PostMeta isDarkMode={isDarkMode}>
            Published on {post.frontmatter.date}
          </PostMeta>
          {post.frontmatter.tags && (
            <TagsContainer>
              {post.frontmatter.tags.map(tag => (
                <Tag key={tag} isDarkMode={isDarkMode}>
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          )}
        </PostHeader>

        <PostContent
          isDarkMode={isDarkMode}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default BlogPost

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`
