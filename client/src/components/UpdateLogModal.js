import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import moment from 'moment';

function UpdateLogModal({ open, onClose, onSubmit, log }) {
  const [logDate, setLogDate] = useState(moment(log.log_date).format('YYYY-MM-DD'));
  const [logAmount, setLogAmount] = useState(log.log_amount);
  const [logDescription, setLogDescription] = useState(log.log_description || '');

  const handleSubmit = () => {
    onSubmit(logDate, logAmount, logDescription);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Update Progress Log</Modal.Header>
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
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UpdateLogModal;
