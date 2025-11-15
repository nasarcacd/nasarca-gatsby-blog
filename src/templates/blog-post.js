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
  padding: ${props => (props.isDarkMode ? "1.5rem 0 1rem 0" : "0 0 1rem 0")};
  border-bottom: 2px solid ${props => (props.isDarkMode ? "#ffd700" : "#e0e0e0")};
  background: ${props => (props.isDarkMode ? "rgba(26, 26, 26, 0.85)" : "transparent")};
  border-radius: ${props => (props.isDarkMode ? "8px 8px 0 0" : "0")};
  box-shadow: ${props => (props.isDarkMode ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none")};
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
  color: ${props => (props.isDarkMode ? "#f0f0f0" : "#333")};
  line-height: 1.8;
  background: ${props => (props.isDarkMode ? "rgba(26, 26, 26, 0.85)" : "transparent")};
  padding: ${props => (props.isDarkMode ? "1.5rem 0" : "0")};
  border-radius: ${props => (props.isDarkMode ? "0 0 8px 8px" : "0")};
  box-shadow: ${props => (props.isDarkMode ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none")};
  margin-top: ${props => (props.isDarkMode ? "-2rem" : "0")};

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
    color: ${props => (props.isDarkMode ? "#5eb3ff" : "#24248a")};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
      color: ${props => (props.isDarkMode ? "#80c5ff" : "#4a4acd")};
    }
  }

  code {
    background: ${props => (props.isDarkMode ? "#1a1a1a" : "#f5f5f5")};
    color: ${props => (props.isDarkMode ? "#ffd700" : "#c7254e")};
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
    border: ${props => (props.isDarkMode ? "1px solid #444" : "none")};
  }

  pre {
    background: ${props => (props.isDarkMode ? "#1a1a1a" : "#f5f5f5")};
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    border: ${props => (props.isDarkMode ? "1px solid #444" : "1px solid #e0e0e0")};

    code {
      background: transparent;
      padding: 0;
      border: none;
      color: ${props => (props.isDarkMode ? "#f0f0f0" : "#333")};
    }
  }

  blockquote {
    border-left: 4px solid ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
    margin-left: 0;
    padding-left: 1rem;
    color: ${props => (props.isDarkMode ? "#d0d0d0" : "#666")};
    background: ${props => (props.isDarkMode ? "rgba(255, 215, 0, 0.05)" : "rgba(36, 36, 138, 0.05)")};
    padding: 1rem;
    border-radius: 4px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    border: ${props => (props.isDarkMode ? "1px solid #444" : "none")};
  }

  p {
    margin-bottom: 1.2rem;
  }

  ul, ol {
    margin-bottom: 1.2rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;

    th, td {
      border: 1px solid ${props => (props.isDarkMode ? "#444" : "#ddd")};
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
      font-weight: 600;
    }
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
