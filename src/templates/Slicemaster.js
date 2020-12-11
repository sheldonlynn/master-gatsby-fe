import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

export default function Slicemaster({ pageContext, data: { slicemaster } }) {
  return (
    <div className="center">
      <Img
        fluid={slicemaster.image.asset.fluid}
        alt={`Image of ${slicemaster.name}`}
      />
      <h2 className="mark">{slicemaster.name}</h2>
      <p>{slicemaster.description}</p>
    </div>
  );
}

export const query = graphql`
  query SlicemasterQuery($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
