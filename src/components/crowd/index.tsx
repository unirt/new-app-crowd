import React from 'react';
import {
  Grid,
  Segment,
  Card,
  Icon,
  Image
} from 'semantic-ui-react';
import useSubscribeFacility from '../../hooks/SubscribeFacility';
import { RecordingStatus } from '../../API';

const Component: React.FC = () => {
  const { facility } = useSubscribeFacility();
  const numberOfPeople = facility ? facility.numberOfPeople : 0;
  const recordingStatus = facility
    ? facility.recordingStatus
    : RecordingStatus.INACTIVE;
  const facilityName = facility ? facility.name : '--';
  const description = facility ? facility.description : '';
  return (
    <>
      <Segment.Group>
        <Card fluid>
          {/* 施設の画像には簡易的にAWS Loftの画像を用いています */}
          <Image
            src="https://d1.awsstatic.com/Startups/Loft%20Photos/tokyo/photo6.0851f9d9db5876b99ac9b7a8dc6adcba15f0f638.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{facilityName}</Card.Header>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Grid>
              <Grid.Row columns={12}>
                <Grid.Column width={5}>
                  <Icon name="user" />
                  {numberOfPeople} 人
                </Grid.Column>
                <Grid.Column width={6}></Grid.Column>
                <Grid.Column width={3}>
                  {recordingStatus === RecordingStatus.ACTIVE ? (
                    <Icon name="record" color="green" />
                  ) : (
                    <Icon name="record" />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Segment.Group>
    </>
  );
};

export default Component;
