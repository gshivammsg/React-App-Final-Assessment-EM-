import React, { useEffect, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ShowSyllabus = ({show,stoggle,id}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("use effect mei aa gye hai id ki value ",id)
    fetch(`http://localhost:8081/tag/getSyllabusByTagId/${id}`)
      .then(response => response.json())
      .then(data => {
        if(data.message == "200 OK"){
        setItems(data.syllabus_list)}
        })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    
    <Modal isOpen={show} toggle={stoggle}>
    <ModalHeader toggle={stoggle}>Linked Syllabus To Tag</ModalHeader>
    <ModalBody>
    
    <div className="container mt-4">
      <h2>List of Syllabus</h2>

      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item">
            {item.syllabus_name}
          </li>
        ))}
      </ul>
    </div>
    </ModalBody>
    <ModalFooter>
    <Button color="secondary" onClick={stoggle}>Cancel</Button>
    </ModalFooter>
</Modal>
  );
};

export default ShowSyllabus;
