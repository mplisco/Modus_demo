// RollForwardModal.js
import React, { useState } from 'react';
import { Button, Checkbox, Modal } from 'semantic-ui-react';

function RollForwardModal({ previousWeekInitiatives, onSubmit , open , setOpen}) {
  
  const [selectedInitiatives, setSelectedInitiatives] = useState([]);

  const handleCheckboxChange = (initiative, checked) => {
    if (checked) {
      setSelectedInitiatives([...selectedInitiatives, initiative]);
    } else {
      setSelectedInitiatives(selectedInitiatives.filter(i => i.id !== initiative.id));
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedInitiatives);
    setOpen(false);
  };

  return (
    <Modal style={{maxWidth: 600}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Roll Forward from Previous Week</Button>}
    >
      <Modal.Header>Select Initiatives to Roll Forward</Modal.Header>
      <Modal.Content>
        {previousWeekInitiatives.map(initiative => (
          <div key={initiative.id}>
            <Checkbox
              label={initiative.initiative_name}
              onChange={(e, { checked }) => handleCheckboxChange(initiative, checked)}
            />
          </div>
        ))}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit} primary>
          Submit
        </Button>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default RollForwardModal;
