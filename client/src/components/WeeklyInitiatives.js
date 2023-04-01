import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Segment, Progress as SUIProgress } from 'semantic-ui-react';
import { AppContext } from './AppContext';

function WeeklyInitiatives() {
  const [weeklyInitiatives, setWeeklyInitiatives] = useState([]);

  useEffect(() => {
    fetch('/myinitiatives')
      .then((r) => r.json())
      .then((data) => setWeeklyInitiatives(data));
  }, []);

  const initiativeList =
    weeklyInitiatives.length > 0 ? (
      weeklyInitiatives.map((initiative) => (
        <List.Item key={initiative.id}>
          <Segment textAlign="left" size="big">
            <h2>{initiative.initiative_name}</h2>
            <SUIProgress
              indicating
              value={initiative.amount_logged}
              total={initiative.initiative_target}
            >
              <div className="label" align="right">
                <p>
                  {initiative.amount_logged} / {initiative.initiative_target}
                </p>
              </div>
            </SUIProgress>
          </Segment>
        </List.Item>
      ))
    ) : (
      <Segment placeholder textAlign="center">
        <h4>
          You have not yet created any Weekly Initiatives.
          <br />
          Select 'New Weekly Initiative' below to get started.
        </h4>
      </Segment>
    );

  return (
    <>
      <h1>My Current Initiatives</h1>
      <div className="ui centered grid">
        <div className="eight wide column">
          <List divided relaxed>
            {initiativeList}
          </List>
        </div>
      </div>
      <br></br>
        <Button primary as={Link} to="/newinitiative">
                New Weekly Initiative
        </Button>
    </>
  );
}

export default WeeklyInitiatives;
