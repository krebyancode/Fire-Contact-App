import { Table, Button } from "semantic-ui-react";

const Contact = ({ contact, delcontact, editcontact }) => {
  const { userName, phoneNumber, gender, id } = contact;
  return (
    <Table.Row>
      <Table.Cell textAlign="center">{userName}</Table.Cell>
      <Table.Cell textAlign="center">{phoneNumber}</Table.Cell>
      <Table.Cell textAlign="center">{gender}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button content="Delete" secondary onClick={() => delcontact(id)} />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Button content="Edit" primary onClick={() => editcontact(id)} />
      </Table.Cell>
    </Table.Row>
  );
};

export default Contact;
