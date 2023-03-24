import React, { useState , useEffect , useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { Modal, Form , Button } from 'semantic-ui-react';

function NewCommitmentModal ({open , onClose , categories , priorityArray , currentBudget , currentUser}) {

    const history = useHistory();
    //fetch /commitments
    const [commitments , setCommitments] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedCommitment, setSelectedCommitment] = useState("")
    const [commitmentOptions, setCommitmentOptions] = useState([])

    
    const commitmentValuesOrig = useRef({
        commitment_hours: 0,
        priority: "",
    });


    const [commitmentValues , setCommitmentValues] = useState(commitmentValuesOrig)
    const [selectedPriority, setSelectedPriority] = useState([])

    const { commitment_hours, priority } = commitmentValues


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

    const handleCategoryChange = (e, { value }) => {
        setSelectedCategory(value)
        const commitmentOptions = commitments.filter((commit) => commit.category_id === value)
        setCommitmentOptions(commitmentOptions)
    }
    
    const handleCommitmentChange = (e, { value }) => {
        setSelectedCommitment(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const postObj = {
            budget_name: currentBudget,
            user_id: currentUser.id,
            commitment_id: selectedCommitment,
            commitment_hours: commitment_hours,
            priority: priority,
        };
        fetch("/budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(response => {
            if (response.ok) {
                console.log("Budget created successfully!")
                onClose()
            } else {
                throw new Error("Failed to create budget.")
            }
        })
        .catch(error => {
            console.error(error)
        })
    }



    useEffect(() => {
        fetch("/commitments")
        .then((r) => r.json())
        .then((data) => setCommitments(data))
      }, []);

      //reset form values
      useEffect(() => {
        if (!open) {
            setSelectedCategory("")
            setSelectedCommitment("")
            setCommitmentOptions([])
            setSelectedPriority("")
            setCommitmentValues(commitmentValuesOrig)
        }
    }, [open])

    console.log(commitments)

    //save button
    const saveButton = <Button primary type="submit" onClick={handleSubmit} >Save</Button>

    //cancel button
    const cancelButton = <Button onClick={onClose}>Cancel</Button>

    return (
        <>
            <Modal style={{maxWidth: 600}} open={open} onClose={onClose}>
                <Modal.Header>Add New Time Commitment</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Select
                            name="category"
                            label="Category"
                            options={categories.map((c) => ({ text: c.name, value: c.id }))}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        />
                        <Form.Select
                            name="commitment"
                            label="Commitment"
                            options={commitmentOptions.map((c) => ({ text: c.commitment_name, value: c.id }))}
                            value={selectedCommitment}
                            onChange={handleCommitmentChange}
                        />
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
                        {saveButton}{cancelButton}
                    </Form>
                </Modal.Content>
            </Modal>
        </>

    );
}

export default NewCommitmentModal;