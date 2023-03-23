import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Modal, Form , Button } from 'semantic-ui-react';

function CommitmentModal({ open, commitment, priorityArray , onClose, onFormSubmit }) {

  const history = useHistory();
  const commitmentValuesOrig = {
    id: commitment.id,
    commitment_name: commitment.commitment_name,
    commitment_hours: commitment.commitment_hours,
    commitment_priority: commitment.priority,
  }

  const [commitmentValues, setCommitmentValues] = useState(commitmentValuesOrig)
  const [selectedPriority, setSelectedPriority] = useState(commitment.priority)

  const { commitment_hours, priority } = commitmentValues
  
  
  //This is returning all required variables correctly - Need to update and pass through the fetch request
    console.log(selectedPriority)
    console.log(commitment_hours)
    console.log(commitment.id)

  const handleCommitmentValues = (e , {name , value}) => {
    if (name === 'priority') {
      setSelectedPriority(value);
      setCommitmentValues(prevState => ({
        ...prevState,
        priority: value
      }));
    } else {
      setCommitmentValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  async function handleModalSubmit(e) {
    e.preventDefault();
    // May need to close modal here
    const requestObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commitmentValues)
    }
    console.log(requestObj)

    await fetch(`/budgets/${commitment.id}`, requestObj)
    .then(resp => resp.json())
    .then(() => {
      //may need to update budgets here
    history.push('/home');
    })
  }

    return (
      <>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>{commitment.commitment_name}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleModalSubmit}>
            <Form.Input
              name="commitment_hours"
              label="Hours"
              value={commitment_hours}
              onChange={handleCommitmentValues}
            />
            <Form.Select
              name="priority"
              label="Priority"
              options={priorityArray.map((p) => ({ text: p.name, value: p.id }))}
              value={selectedPriority}
              onChange={handleCommitmentValues}
            />
            <Button type="submit" primary>
              Save
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      </>
    );
  }

export default CommitmentModal;
