import { useState, useEffect } from "react";
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import { options } from "../../utils/constants";

const FormComponent = ({ addContact, editedContact }) => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (editedContact) {
      setUserName(editedContact.userName);
      setPhoneNumber(editedContact.phoneNumber);
      setGender(editedContact.gender);
    }
  }, [editedContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(userName, phoneNumber, gender);
    setUserName("");
    setPhoneNumber("");
    setGender("");
  };

  const handleOptions = (e, values) => {
    setGender(values.value);
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ width: 300 }}>
        <div className="ui piled segments">
          <div className="ui segment brand">
            <a
              href="https://github.com/krebyancode"
              className="design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>{"<Krebyancode/> "}</code>
            </a>
            <span className="design header">design</span>
          </div>
        </div>
        <h2 className="contact-header">Add Contact</h2>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Form.Input
              fluid
              name="phoneNumber"
              icon="phone"
              iconPosition="left"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Form.Dropdown
              options={options}
              value={gender}
              onChange={handleOptions}
              placeholder="Gender"
              name="gender"
              fluid
              selection
              required
            />
            <Button color={editedContact ? "teal" : "green"} fluid size="large">
              {editedContact ? "Edit" : "Add"}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default FormComponent;
