import { useState, useEffect } from 'react';
import SmashBio from '../../SmashBio';
import AddBioModal from '../../components/AddBioModal';
import { Button } from 'react-bootstrap';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Bios() {
  const [biosList, setBiosList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const biosCollectionRef = collection(db, "bios");

  useEffect(() => {
    const getBios = async () => {
      const data = await getDocs(biosCollectionRef);
      setBiosList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBios();
  }, []);

  const handleBioAdded = (newBio) => {
    setBiosList((prev) => [...prev, newBio]);
  };

  return (
    <div>
      <h1><strong>Club Bios</strong></h1>
      <p>Create your own below!</p>

      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
        + Create New Bio
      </Button>

      <div className="bio-container">
        {biosList.map((bio) => (
          <div key={bio.id} className="mb-3">
            <SmashBio {...bio} />
          </div>
        ))}
      </div>

      <AddBioModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onBioAdded={handleBioAdded} 
      />
    </div>
  );
}

export default Bios;