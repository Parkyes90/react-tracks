import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import withRoot from "./withRoot";
import App from "./pages/App";
import { gql } from "apollo-boost";

import { Query } from "react-apollo";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";

export const UserContext = React.createContext();

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error} />;

      const { me: currentUser } = data;

      return (
        <Router>
          <UserContext.Provider value={currentUser}>
            <Header currentUser={currentUser} />
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/profile/:id" component={Profile} />
            </Switch>
          </UserContext.Provider>
        </Router>
      );
    }}
  </Query>
);

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

export default withRoot(Root);
