import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Segment, Progress as SUIProgress , Icon } from 'semantic-ui-react';
import { AppContext } from './AppContext';
import moment from 'moment';
moment.updateLocale('en', { week: { dow: 1 } });


function WeeklyInitiatives( {setCurrentInitiative , currentUser}) {
  const [allInitiatives, setAllInitiatives] = useState([]);
  const [weeklyInitiatives, setWeeklyInitiatives] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  useEffect(() => {
    fetch('/weeks') // Update this with the correct API endpoint
      .then((response) => response.json())
      .then((data) => {
        setWeeks(data);
        const currentWeekIndex = data.findIndex((week) => {
          const today = moment();
          return moment(week.start_date).isSameOrBefore(today) && moment(week.end_date).isSameOrAfter(today);
        });
        setCurrentWeekIndex(currentWeekIndex);
      });
  }, []);

  useEffect(() => {
    fetch('/myinitiatives')
      .then((r) => r.json())
      .then((data) => setAllInitiatives(data));
  }, []);

  useEffect(() => {
    if (weeks[currentWeekIndex]) {
      const filteredInitiatives = allInitiatives.filter(
        (initiative) => initiative.week_id === weeks[currentWeekIndex].id
      );
      setWeeklyInitiatives(filteredInitiatives);
    }
  }, [allInitiatives, weeks, currentWeekIndex]);

  const handleClick = (initiative) => {
    console.log(initiative)
    setCurrentInitiative(initiative)
  };

  const handleWeekNavigation = (direction) => {
    if (direction === 'previous' && currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    } else if (direction === 'next' && currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const currentWeek = weeks[currentWeekIndex] || {};


  const initiativeList =
    weeklyInitiatives.length > 0 ? (
      weeklyInitiatives.map((initiative) => (
        <List.Item key={initiative.id}>
          <Link to={`/initiatives/${initiative.id}`} onClick={() => handleClick(initiative)}>
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
          </Link>
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
          <Segment textAlign="center">
            <Icon name="arrow left" onClick={() => handleWeekNavigation('previous')} />
            <div style={{margin: '0 1em', display: 'inline-block'}}>
              {moment.utc(currentWeek.start_date).format('MMM DD')} - {moment.utc(currentWeek.start_date).add(6, 'days').format('MMM DD')}
            </div>
            <Icon name="arrow right" onClick={() => handleWeekNavigation('next')} />
          </Segment>
        </div>
      </div>
      <div className="ui centered grid">
        <div className="eight wide column">
          <List divided relaxed>
            {initiativeList}
          </List>
        </div>
      </div>
      <br></br>
        <div style={{marginBottom: "1em"}}>
            <Button primary as={Link} to="/newinitiative">
                    New Initiative
            </Button>
        </div>
    </>
  );
}

export default WeeklyInitiatives;
