import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function AddBioModal({ show, handleClose, onBioAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    character: "",
    favoriteMode: "",
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const biosCollectionRef = collection(db, "bios");
      const docRef = await addDoc(biosCollectionRef, formData);

      onBioAdded({ ...formData, id: docRef.id });

      setFormData({ name: "", image: "", character: "", favoriteMode: "", bio: "" });
      handleClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Your Smash Bio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Player Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Main Character</Form.Label>
            <Form.Control type="text" name="character" value={formData.character} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Favorite Gamemode</Form.Label>
            <Form.Control type="text" name="favoriteMode" value={formData.favoriteMode} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={3} name="bio" value={formData.bio} onChange={handleChange} required />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Join the Roster
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBioModal;