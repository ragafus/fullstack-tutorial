import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/loading';
import Header from '../components/header';
import ActionButton from '../containers/action-button';
import LaunchDetail from '../components/launch-detail';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`

${LAUNCH_TILE_DATA}

  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Launch({ launchId }) {
    return (
      <Query query={GET_LAUNCH_DETAILS} variables={{ launchId: launchId }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <p>ERROR: {error.message}</p>;
  
          return (
            <Fragment>
              <Header image={(data.launch && data.launch.mission && data.launch.mission.missionPatch) | ''}>
                {(data.launch && data.launch.mission && data.launch.mission.missionPatch) | ''}
              </Header>
              <LaunchDetail {...data.launch} />
              <ActionButton {...data.launch} />
            </Fragment>
          );
        }}
      </Query>
    );
  }