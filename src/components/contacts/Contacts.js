import { Table } from "semantic-ui-react";
import Contact from "../contacts/Contact";

const Contacts = ({ contacts, delcontact, editcontact, isLoading }) => {
  return (
    <div>
      <h2 className="contact-header">Contacts</h2>
      <Table size={"large"} className="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Username</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Phone Number</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Gender</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan="5" textAlign="center">
                Loading...
              </Table.Cell>
            </Table.Row>
          ) : (
            contacts.map((contact) => (
              <Contact
                contact={contact}
                key={contact.id}
                delcontact={delcontact}
                editcontact={editcontact}
              />
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Contacts;
