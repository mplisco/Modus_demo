import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { Table , Button } from 'semantic-ui-react';
import moment from 'moment';
import AddLogModal from './AddLogModal'


moment.updateLocale('en', { week: { dow: 1 } });


function WeeklyInitiativeDetails({ currentInitiative , setCurrentInitiative }) {
  const [currentWeek, setCurrentWeek] = useState({});
  const [progressLogs , setProgressLogs] = useState(currentInitiative.progress_logs || []);

  useEffect(() => {
    if (currentInitiative.week_id) {
      // Fetch the current week data from the backend
      fetch(`/weeks/${currentInitiative.week_id}`) // Update this with the correct API endpoint
        .then((response) => response.json())
        .then((data) => setCurrentWeek(data));
    }
  }, [currentInitiative]);

  useEffect(() => {
    setProgressLogs(currentInitiative.progress_logs || []);
  }, [currentInitiative.progress_logs]);

  const refreshProgressLogs = () => {
    fetch(`/initiatives/${currentInitiative.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProgressLogs(data.progress_logs || []);
      });
  };

  // Create an array of dates for the week
  const weekDates = [];
  const startDate = moment(currentWeek.start_date);
  const endDate = moment(currentWeek.end_date);
  let currentDate = startDate;
  
  while (currentDate && endDate && currentDate.isSameOrBefore(endDate)) {
    weekDates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.clone().add(1, 'days');
    if (weekDates.length >= 8) {
      break;
    }
  }

  weekDates.push(endDate.format('YYYY-MM-DD'))

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

  function CustomTick({ x, y, payload }) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={15}
          textAnchor="middle"
          fill="#666"
          fontSize={14}
        >
          {moment(payload.value).format("ddd")}
        </text>
      </g>
    );
  }

  
  //Handle Add new progress log
  
  const [addLogModalOpen, setAddLogModalOpen] = useState(false);

  const handleAdd = () => {
    setAddLogModalOpen(true);
  }

  const handleNewLog = (newLog) => {
    setCurrentInitiative((prevState) => {
      return {
        ...prevState,
        progress_logs: [...prevState.progress_logs, newLog],
      };
    });
  };

  const addLogButton = <Button primary onClick={handleAdd}>Add Progress Log</Button>;


  return (
    <>
      <h1>{currentInitiative.initiative_name}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
      <span>
          {moment.utc(currentWeek.start_date).format('MMM DD')} - {moment.utc(currentWeek.start_date).add(6, 'days').format('MMM DD')}
      </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <AreaChart
          width={800}
          height={400}
          data={cumulativeChartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            ticks={weekDates.slice(1)}
            interval={0}
            tick={<CustomTick/>}
          />
          <YAxis domain={[0, Math.ceil(currentInitiative.initiative_target * 1.25)]} ticks={Array.from({length: Math.ceil(currentInitiative.initiative_target * 1.25) + 1}, (_, i) => i)} />
          <Tooltip />
          <ReferenceLine y={currentInitiative.initiative_target} stroke="red" />
          <Area type="monotone" dataKey="cumulativeProgress" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
      <div className="eight wide column" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: '820px' }}>
        <Table className="ui striped table" celled style={{ width: "100%", margin: "0" }}>
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
                <Table.Cell>{moment(log.log_date).format('ddd MMM D')}</Table.Cell>
                <Table.Cell>{log.log_amount}</Table.Cell>
                <Table.Cell>{log.log_description || 'N/A'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <br></br>
      {addLogButton}
      <AddLogModal
      open={addLogModalOpen}
      onClose={() => setAddLogModalOpen(false)}
      currentInitiative={currentInitiative}
      onNewLog={handleNewLog}
      onSubmit={() => {
        setAddLogModalOpen(false);
        refreshProgressLogs();
      }}
      >
      </AddLogModal>
    </>
  );
}

export default WeeklyInitiativeDetails;
