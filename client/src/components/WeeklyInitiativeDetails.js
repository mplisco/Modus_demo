import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { Table , Icon } from 'semantic-ui-react';
import moment from 'moment';

function WeeklyInitiativeDetails({ currentInitiative, currentUser }) {
  const [weeks, setWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  useEffect(() => {
    // Fetch the weeks from the backend
    fetch('/weeks') // Update this with the correct API endpoint
      .then((response) => response.json())
      .then((data) => setWeeks(data));
  }, []);

  const handleWeekNavigation = (direction) => {
    if (direction === 'previous' && currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    } else if (direction === 'next' && currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const currentWeek = weeks[currentWeekIndex] || {};

  // Create an array of dates for the week
  const weekDates = [];
  const startDate = moment(currentWeek.start_date);
  const endDate = moment(currentWeek.end_date);
  let currentDate = startDate;

  while (currentDate && endDate && currentDate.isSameOrBefore(endDate)) {
    weekDates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.clone().add(1, 'days');
  }

  // Format progress logs data for the chart
  const chartData = weekDates.map((date) => {
    const progress = currentInitiative.progress_logs.find((log) => moment(log.log_date).format('YYYY-MM-DD') === date);
    return {
      date,
      progress: progress ? progress.log_amount : 0,
    };
  });

  // Calculate cumulative progress for each day
  let cumulativeProgress = 0;
  const cumulativeChartData = chartData.map((data) => {
    cumulativeProgress += data.progress;
    return { ...data, cumulativeProgress };
  });

  return (
    <>
      <h1>{currentInitiative.initiative_name}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Icon
                name='arrow left'
                onClick={() => handleWeekNavigation('previous')}
                style={{ cursor: 'pointer' }}
            />
        <span style={{ margin: '0 10px' }}>
            {moment(currentWeek.start_date).format('MMM DD')} - {moment(currentWeek.end_date).format('MMM DD')}
        </span>
            <Icon
                name='arrow right'
                onClick={() => handleWeekNavigation('next')}
                style={{ cursor: 'pointer' }}
            />
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <AreaChart
          width={800}
          height={400}
          data={cumulativeChartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" ticks={weekDates} interval={0} />
          <YAxis domain={[0, Math.max(currentInitiative.initiative_target, cumulativeProgress)]} />
          <Tooltip />
          <ReferenceLine y={currentInitiative.initiative_target} stroke="red" />
          <Area type="monotone" dataKey="cumulativeProgress" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Amount Logged</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentInitiative.progress_logs.map((log) => (
            <Table.Row key={log.id}>
              <Table.Cell>{moment(log.log_date).format('YYYY-MM-DD')}</Table.Cell>
              <Table.Cell>{log.log_amount}</Table.Cell>
              <Table.Cell>{log.log_description || 'N/A'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default WeeklyInitiativeDetails;
