import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

function UpdateLogModal({ open, onClose, onSubmit, log , handleLogDeleted, handleLogUpdated }) {
  const [logValues, setLogValues] = useState({
    logDate: moment.utc(log.log_date).format('YYYY-MM-DD'),
    logAmount: log.log_amount,
    logDescription: log.log_description || ''
  });

  const handleLogValues = (e) => {
    const { name, value } = e.target;
    setLogValues(prevState => ({ ...prevState, [name]: value }));
  };


  async function handleModalSubmit(e) {
    e.preventDefault();
  
    const payload = {
      log_date: logValues.logDate,
      log_amount: logValues.logAmount,
      log_description: logValues.logDescription,
    };
  
    const requestObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    console.log(requestObj)
  
    await fetch(`/progress_logs/${log.id}`, requestObj)
      .then(response => response.json())
      .then((updatedLog) => {
        handleLogUpdated(updatedLog)
        onClose()
       })
  };

    async function handleDelete(e) {
      e.preventDefault();
      await fetch(`/progress_logs/${log.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        console.log('Log deleted successfully!');
        handleLogDeleted({deletedLogID: log.id});
        onClose();
      })
    }

  const saveButton = <Button type="submit" secondary onClick={handleModalSubmit}>Save</Button>
  const deleteButton = <Button negative onClick={handleDelete}>Delete Log</Button>

  return (
    <Modal style={{maxWidth: 600}} open={open} onClose={onClose}>
      <Modal.Header>Update Progress Log</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleModalSubmit}>
          <Form.Field>
            <label>Date</label>
            <input type="date" name="logDate" value={logValues.logDate} onChange={handleLogValues} />
          </Form.Field>
          <Form.Field>
            <label>Amount Logged</label>
            <input type="number" name="logAmount" value={logValues.logAmount} onChange={handleLogValues} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input type="text" name="logDescription" value={logValues.logDescription} onChange={handleLogValues} />
          </Form.Field>
          {saveButton}{deleteButton}
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UpdateLogModal;
