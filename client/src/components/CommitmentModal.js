import React, { useState } from 'react';
import { Modal, Form , Button } from 'semantic-ui-react';

function CommitmentModal({ open, commitment, priority, onClose, onFormSubmit }) {
    const [hours, setHours] = useState(commitment.commitment_hours);
    const [selectedPriority, setSelectedPriority] = useState(commitment.priority);
  
    const handleHoursChange = (event) => {
      setHours(event.target.value);
    };
  
    const handlePriorityChange = (event) => {
      setSelectedPriority(parseInt(event.target.value));
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      onFormSubmit(hours, selectedPriority);
      onClose();
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>{commitment.commitment_name}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleFormSubmit}>
            <Form.Input
              label="Hours"
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={handleHoursChange}
            />
            <Form.Select
              label="Priority"
              options={priority.map((p) => ({ text: p.name, value: p.id }))}
              value={selectedPriority}
              onChange={handlePriorityChange}
            />
            <Button type="submit" positive>
              Save
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
  

export default CommitmentModal;
