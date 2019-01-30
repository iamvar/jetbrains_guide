import { graphql } from 'gatsby';
import ListingWrapper from '../../components/ListingWrapper';
import LogoLayoutListing from '../../components/LogoLayoutListing';

export default ListingWrapper(LogoLayoutListing);

export const query = graphql`
  query($path: String!) {
    resource: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        type
        label
        title
        subtitle
        accent
        icon
        date
      }
    }

    resources: allMarkdownRemark(filter: { frontmatter: { type: { eq: "tip" } } }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          fields {
            slug
          }
          frontmatter {
            type
            date(formatString: "MMMM Do, YYYY")
            title
            subtitle
            author
            technologies
            topics
            thumbnail {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    authors: allMarkdownRemark(filter: { frontmatter: { type: { eq: "author" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            label
            headshot {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    technologies: allMarkdownRemark(filter: { frontmatter: { type: { eq: "technology" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            label
          }
        }
      }
    }

    topics: allMarkdownRemark(filter: { frontmatter: { type: { eq: "topic" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            label
          }
        }
      }
    }
  }
`;

// import { graphql } from 'gatsby';
// import * as React from 'react';
// import { SubsectionTopic } from '../../components/Subsection';
// import DefaultLayout from '../../layouts/default';
//
// import { ITopicEdges } from './models';
//
// interface ITTopicsProps {
//   data: {
//     allMarkdownRemark: {
//       edges: ITopicEdges;
//     };
//   };
// }
//
// const Topics: React.FunctionComponent<ITTopicsProps> = ({
//   data: {
//     allMarkdownRemark: { edges: topicEdges }
//   }
// }) => {
//   const items = topicEdges.map(edge => edge.node);
//   return (
//     <DefaultLayout title="Topics" subtitle="Resources organized by programming topics">
//       <nav className="bd-links bio-resourcecards">
//         {items &&
//           items.map(item => {
//             return (
//               <SubsectionTopic
//                 key={item.fields.slug}
//                 title={item.frontmatter.title}
//                 subtitle={item.frontmatter.subtitle}
//                 href={item.fields.slug}
//                 accent={item.frontmatter.accent}
//                 icon={item.frontmatter.icon}
//               />
//             );
//           })}
//       </nav>
//     </DefaultLayout>
//   );
// };
//
// export default Topics;
//
// export const query = graphql`
//   query {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: { frontmatter: { type: { eq: "topic" } } }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           html
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             type
//             label
//             title
//             subtitle
//             date
//             accent
//             icon
//           }
//         }
//       }
//     }
//   }
// `;
