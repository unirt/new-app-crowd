/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFacility = /* GraphQL */ `subscription OnCreateFacility(
  $filter: ModelSubscriptionFacilityFilterInput
  $owner: String
) {
  onCreateFacility(filter: $filter, owner: $owner) {
    id
    name
    numberOfPeople
    description
    recordingStatus
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFacilitySubscriptionVariables,
  APITypes.OnCreateFacilitySubscription
>;
export const onUpdateFacility = /* GraphQL */ `subscription OnUpdateFacility(
  $filter: ModelSubscriptionFacilityFilterInput
  $owner: String
) {
  onUpdateFacility(filter: $filter, owner: $owner) {
    id
    name
    numberOfPeople
    description
    recordingStatus
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFacilitySubscriptionVariables,
  APITypes.OnUpdateFacilitySubscription
>;
export const onDeleteFacility = /* GraphQL */ `subscription OnDeleteFacility(
  $filter: ModelSubscriptionFacilityFilterInput
  $owner: String
) {
  onDeleteFacility(filter: $filter, owner: $owner) {
    id
    name
    numberOfPeople
    description
    recordingStatus
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFacilitySubscriptionVariables,
  APITypes.OnDeleteFacilitySubscription
>;
