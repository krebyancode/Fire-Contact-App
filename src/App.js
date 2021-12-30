import "./App.css";
import FormComponent from "./components/form/FormComponent";
import Contacts from "./components/contacts/Contacts";
import { db } from "./firestore/FirestoreConfig";
import {
  collection,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { successNote } from "./utils/toastify";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editedContact, setEditedContact] = useState({});
  const [editedID, setEditedID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const colRef = collection(db, "contacts");

  const q = query(colRef, orderBy("createdAt"));

  const getContacts = () => {
    getDocs(q)
      .then((snapshot) => {
        let contacts = [];
        snapshot.docs.forEach((doc) => {
          contacts.push({ ...doc.data(), id: doc.id });
        });
        console.log(contacts);
        setContacts(contacts);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getContacts();
    }, 1000);
  }, []);

  const addContact = (userName, phoneNumber, gender) => {
    if (editedContact) {
      const docRef = doc(db, "contacts", editedID);
      updateDoc(docRef, {
        userName,
        phoneNumber,
        gender,
      }).then(() => {
        setEditedContact("");
        setEditedID("");
        getContacts();
        successNote("Succesfully updated...");
      });
    } else {
      addDoc(colRef, {
        userName,
        phoneNumber,
        gender,
        createdAt: serverTimestamp(),
      }).then(() => {
        getContacts();
        successNote("Succesfully added...");
      });
    }
  };

  const delcontact = (id) => {
    const docRef = doc(db, "contacts", id);
    deleteDoc(docRef).then(() => {
      getContacts();
      successNote("Succesfully removed...");
    });
  };

  const editcontact = (id) => {
    const [toBeEdited] = contacts.filter((contact) => contact.id === id);
    setEditedContact(toBeEdited);
    setEditedID(toBeEdited.id);
  };

  return (
    <div className="App">
      <FormComponent addContact={addContact} editedContact={editedContact} />
      <Contacts
        isLoading={isLoading}
        contacts={contacts}
        delcontact={delcontact}
        editcontact={editcontact}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
