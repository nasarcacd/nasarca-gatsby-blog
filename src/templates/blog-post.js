import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { ThemeContext } from "../context/ThemeContext"

const PostContainer = styled.article`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  margin-bottom: 2rem;
  background: ${props => (props.isDarkMode
    ? "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)"
    : "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)")};
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  border: 2px solid ${props => (props.isDarkMode ? "rgba(255, 215, 0, 0.3)" : "#d0d0d0")};
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => (props.isDarkMode
    ? "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 0, 0.1)"
    : "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)")};
  cursor: pointer;

  &::before {
    content: "←";
    font-size: 1.3em;
    font-weight: bold;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: ${props => (props.isDarkMode
      ? "linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.15) 100%)"
      : "linear-gradient(135deg, #24248a 0%, #4a4acd 100%)")};
    color: ${props => (props.isDarkMode ? "#ffed4e" : "#ffffff")};
    border-color: ${props => (props.isDarkMode ? "rgba(255, 237, 78, 0.5)" : "#24248a")};
    transform: translateX(-4px);
    box-shadow: ${props => (props.isDarkMode
      ? "0 4px 16px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.2)"
      : "0 4px 16px rgba(36, 36, 138, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)")};
  }

  &:hover::before {
    transform: translateX(-4px);
  }

  &:active {
    transform: translateX(-2px) scale(0.98);
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
  font-size: 1.05rem;
  background: ${props => (props.isDarkMode ? "rgba(26, 26, 26, 0.85)" : "transparent")};
  padding: ${props => (props.isDarkMode ? "1.5rem 1.5rem" : "0")};
  border-radius: ${props => (props.isDarkMode ? "0 0 8px 8px" : "0")};
  box-shadow: ${props => (props.isDarkMode ? "0 2px 10px rgba(0, 0, 0, 0.3)" : "none")};
  margin-top: ${props => (props.isDarkMode ? "-2rem" : "0")};

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: ${props => (props.isDarkMode ? "1rem" : "0")};
  }

  /* Optimal reading width for text elements */
  > p,
  > ul,
  > ol,
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > blockquote {
    max-width: 800px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.4;
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
    padding: 1.25rem;
    border-radius: 5px;
    overflow-x: auto;
    border: ${props => (props.isDarkMode ? "1px solid #444" : "1px solid #e0e0e0")};
    max-width: 100%;
    margin: 1.5rem 0;

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
    margin: 1.5rem 0;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.6rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    max-width: 100%;
    overflow-x: auto;
    display: block;

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
      <PostContainer>
        <BackLink to="/" isDarkMode={isDarkMode}>
          Back to Posts
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
      </PostContainer>
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
