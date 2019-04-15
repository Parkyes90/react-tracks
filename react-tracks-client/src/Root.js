import React from "react";
import withRoot from "./withRoot";
import { gql } from "apollo-boost";

import { Query } from "react-apollo";

const Root = () => (
  <Query query={GET_TRACKS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      return <div>{JSON.stringify(data)}</div>;
    }}
  </Query>
);

const GET_TRACKS_QUERY = gql`
  {
    tracks {
      id
      title
      description
      url
    }
  }
`;

export default withRoot(Root);
