import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import moment from 'moment';


function AddLogModal({ open, onClose, currentInitiative, onNewLog}) {
  
  
  const [logDate, setLogDate] = useState(moment().format('YYYY-MM-DD'));
  const [logAmount, setLogAmount] = useState('');
  const [logDescription, setLogDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustedLogDate = moment(logDate).utcOffset(moment().utcOffset()).format('YYYY-MM-DD');
    const postObj = {
      weekly_initiative_id: currentInitiative.id,
      log_date: adjustedLogDate,
      log_amount: logAmount,
      log_description: logDescription,
    };
    fetch("/progress_logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)
    })
    .then(response => {
      if (response.ok) {
        console.log("Log created successfully!");
        onClose();
        window.location.reload();
      } else {
        throw new Error("Failed to create log.");
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Progress Log</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Date</label>
            <input type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Amount Logged</label>
            <input type="number" value={logAmount} onChange={(e) => setLogAmount(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input type="text" value={logDescription} onChange={(e) => setLogDescription(e.target.value)} />
          </Form.Field>
          <Button primary type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddLogModal;
