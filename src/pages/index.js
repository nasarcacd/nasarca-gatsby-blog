import React, { useState, useContext, useMemo, useCallback } from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import CreatorInfo from "../components/CreatorInfo"
import { ThemeContext } from "../context/ThemeContext"

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.div`
  min-width: 0;
`

const Sidebar = styled.aside`
  @media (max-width: 768px) {
    order: -1;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 10px;
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => (props.isDarkMode ? "#ffed4e" : "#60635c")};
  }
`

const ImageContainer = styled.div`
  max-width: 100%;
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`

const PostCard = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f9f9f9")};
  border-radius: 8px;
  border-left: 4px solid ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const PostMeta = styled.div`
  font-size: 0.9rem;
  color: ${props => (props.isDarkMode ? "#999" : "#666")};
  margin-bottom: 0.5rem;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`

const Tag = styled.span`
  background: ${props => (props.isDarkMode ? "#444" : "#e0e0e0")};
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
`

const FilterSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
  border-radius: 8px;
`

const FilterTitle = styled.h4`
  margin-top: 0;
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
`

const FilterTag = styled.button`
  background: ${props =>
    props.active
      ? props.isDarkMode
        ? "#ffd700"
        : "#24248a"
      : props.isDarkMode
      ? "#444"
      : "#e0e0e0"};
  color: ${props =>
    props.active
      ? props.isDarkMode
        ? "#2c2c2c"
        : "#fff"
      : props.isDarkMode
      ? "#e0e0e0"
      : "#333"};
  border: none;
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 4px;

  &:hover {
    transform: scale(1.05);
  }
`

const PostCount = styled.h4`
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  margin-bottom: 1.5rem;
`

const IndexPage = ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [selectedTag, setSelectedTag] = useState(null)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set()
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [data])

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return data.allMarkdownRemark.edges
    }
    return data.allMarkdownRemark.edges.filter(({ node }) =>
      node.frontmatter.tags?.includes(selectedTag)
    )
  }, [selectedTag, data])

  // Memoized click handlers
  const handleClearFilter = useCallback(() => {
    setSelectedTag(null)
  }, [])

  const handleTagClick = useCallback(tag => {
    setSelectedTag(tag)
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <PageContainer>
        <MainContent>
          <ImageContainer>
            <Image />
          </ImageContainer>

          <FilterSection isDarkMode={isDarkMode}>
            <FilterTitle isDarkMode={isDarkMode}>Filter by Topic</FilterTitle>
            <div>
              <FilterTag
                active={!selectedTag}
                isDarkMode={isDarkMode}
                onClick={handleClearFilter}
              >
                All
              </FilterTag>
              {allTags.map(tag => (
                <FilterTag
                  key={tag}
                  active={selectedTag === tag}
                  isDarkMode={isDarkMode}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </FilterTag>
              ))}
            </div>
          </FilterSection>

          <PostCount isDarkMode={isDarkMode}>
            {filteredPosts.length} Post{filteredPosts.length !== 1 ? "s" : ""}
            {selectedTag && ` in "${selectedTag}"`}
          </PostCount>

          {filteredPosts.map(({ node }) => (
            <PostCard key={node.id} isDarkMode={isDarkMode}>
              <BlogLink to={node.fields.slug}>
                <BlogTitle isDarkMode={isDarkMode}>
                  {node.frontmatter.title}
                </BlogTitle>
              </BlogLink>
              <PostMeta isDarkMode={isDarkMode}>
                {node.frontmatter.date}
              </PostMeta>
              <p>{node.excerpt}</p>
              {node.frontmatter.tags && (
                <TagsContainer>
                  {node.frontmatter.tags.map(tag => (
                    <Tag key={tag} isDarkMode={isDarkMode}>
                      {tag}
                    </Tag>
                  ))}
                </TagsContainer>
              )}
            </PostCard>
          ))}
        </MainContent>

        <Sidebar>
          <CreatorInfo />
        </Sidebar>
      </PageContainer>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              timestamp: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string),
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { timestamp: DESC } }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            date
            timestamp
            description
            title
            tags
          }
          excerpt
          parent {
            id
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
