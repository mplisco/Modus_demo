import React, { useState , useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import { useHistory} from "react-router-dom";

function NewInitiative({
    currentUser,
    setWeeklyInitiatives,
    handleSetWeeklyInitiatives,
    weeklyInitiatives,
}) {

    const [initiativeName, setInitiativeName] = useState("");
    const [initiativeType, setInitiativeType] = useState(null);
    const [commitments , setCommitments] = useState([])
    const [categories , setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedCommitment, setSelectedCommitment] = useState("")
    const [commitmentOptions, setCommitmentOptions] = useState([])
    const [initiativeTarget, setInitiativeTarget] = useState('')
   
    const history = useHistory();

    useEffect(() => {
        fetch("/commitments")
        .then((r) => r.json())
        .then((data) => setCommitments(data))
      }, []);

    useEffect(() => {
        fetch("/categories")
        .then((r) => r.json())
        .then((data) => setCategories(data))
        }, []);

    //Handle Initiative Type Selection

    const initiativeTypes = [
        {id: 1 , name: "Habit"},
        {id: 2 , name: "Time Goal"},
    ];

    const initiativeTypeOptions = initiativeTypes.map((type) => ({
        key: type.id,
        text: type.name,
        value:  type.id,
    }));

    const handleInitiativeTypeSelection = (e, data) => {
        setInitiativeType(data.value);
    }

    //Handle Category Selection

    const categoryOptions = categories.map((category) => ({
        key: category.id,
        text: category.category_name,
        value: category.id,
    }));

        const handleCategoryChange = (e, { value }) => {
            setSelectedCategory(value)
            const commitmentOptions = commitments.filter((commit) => commit.category_id === value)
            setCommitmentOptions(commitmentOptions)
        }

    //Handle Commitment Selection   
     const commitmentModalOptions = commitmentOptions.map((commitment) => ({
            key: commitment.id,
            text: commitment.commitment_name,
            value: commitment.id,
        }));

    const handleCommitmentChange = (e, { value }) => {
        setSelectedCommitment(value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        const newInitiative = {
            user_id: currentUser.id,
            initiative_name: initiativeName,
            initiative_type: initiativeType,
            initiative_target: initiativeTarget,
            commitment_id: selectedCommitment,
            category_id: selectedCategory,
            week_id: 1,
            open: true,
        };
        fetch("/weekly_initiatives", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newInitiative),
        })
        .then((res) => {
            if (res.ok) {
                console.log("New Initiative Created");
                history.push("/weeklyinitiatives")
            } else {
                throw new Error("Failed to create new initiative.");
            }
        })
        .catch((error) => console.log(error));
    }
    

return (
    
    <Container>
        <h1>Add a New Initiative</h1>
        <div className="ui centered grid">
            <div className="eight wide column">
                <div className="ui segment">
                    <Form onSubmit={handleSubmit} >
                        <Form.Field>
                            <label>New Initiative Name</label>
                            <input
                                placeholder="New Initiative Name"
                                value={initiativeName}
                                onChange={(e) => setInitiativeName(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Initiative Type</label>
                            <Dropdown
                                placeholder="Select Initiative Type"
                                fluid
                                selection
                                options={initiativeTypeOptions}
                                value={initiativeType}
                                onChange={handleInitiativeTypeSelection}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Initiative Category</label>
                            <Dropdown
                                placeholder="Select Initiative Category"
                                fluid
                                selection
                                options={categoryOptions}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Initiative Commitment</label>
                            <Dropdown
                                placeholder="Select Initiative Commitment"
                                fluid
                                selection
                                options={commitmentModalOptions}
                                value={selectedCommitment}
                                onChange={handleCommitmentChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>New Initiative Target</label>
                            <input
                                placeholder="New Initiative Target"
                                value={initiativeTarget}
                                onChange={(e) => setInitiativeTarget(e.target.value)}
                            />
                        </Form.Field>
                        <Button primary type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    </Container>
    )
}
export default NewInitiative;