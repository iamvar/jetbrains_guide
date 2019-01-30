import { graphql } from 'gatsby';
import * as React from 'react';
import { SubsectionTechnology } from '../../components/Subsection';
import DefaultLayout from '../../layouts/default';

import { ITechnologyEdges } from './models';

interface ITechnologiesProps {
  data: {
    allMarkdownRemark: {
      edges: ITechnologyEdges;
    };
  };
}

const DEFAULT_LOGO = 'https://cdn.worldvectorlogo.com/logos/python-5.svg';

const Technologies: React.FunctionComponent<ITechnologiesProps> = ({
  data: {
    allMarkdownRemark: { edges: technologyEdges }
  }
}) => {
  const items = technologyEdges.map(edge => edge.node);
  return (
    <DefaultLayout title="Technologies" subtitle="Resources organized by programming technologies">
      <nav className="bd-links bio-resourcecards">
        {items &&
          items.map(item => {
            const frontmatter = item.frontmatter;
            const logo = frontmatter.logo.publicURL ? frontmatter.logo.publicURL : DEFAULT_LOGO;
            return (
              <SubsectionTechnology
                key={item.fields.slug}
                title={item.frontmatter.title}
                subtitle={item.frontmatter.subtitle}
                href={item.fields.slug}
                logo={logo}
              />
            );
          })}
      </nav>
    </DefaultLayout>
  );
};

export default Technologies;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "technology" } } }
      limit: 1000
    ) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          frontmatter {
            type
            label
            title
            subtitle
            date
            logo {
              publicURL
            }
          }
        }
      }
    }
  }
`;
