import React, { useEffect, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ShowSyllabus = ({showTags,sttoggle,id}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("use effect mei aa gye hai id ki value ",id)
    fetch(`http://localhost:8080/syllabus/getTagsBySyllabusId/${id}`)
      .then(response => response.json())
      .then(data => {
        if(data.message == "200 OK"){
        setItems(data.tag_list)}
        })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete= async (tag_id)=>{
    let obj = {};
    obj['tag_id'] = tag_id
    obj['syllabus_id'] = id
    try {
        await fetch('http://localhost:8080/syllabus/deleteTagAssociatedBySyllabusId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
      }catch(error){
          console.error('Error fetching data:', error);
      }
    console.log("id ki value bhai log ",tag_id)
  }
  return (
    
    <Modal isOpen={showTags} toggle={sttoggle}>
    <ModalHeader toggle={sttoggle}>Linked Syllabus To Tag</ModalHeader>
    <ModalBody>
    
    <div className="container mt-4">
      <h2>List of Tags</h2>

      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item">
            {item.tag_name}
            <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                <i class="fas fa-trash-alt" style = {{"color" : "#5D93E1", "cursor" : "pointer"}} onClick = {() => handleDelete(item.tag_id)}></i>
            </div>
            </li>
          
        ))}
      </ul>
    </div>
    </ModalBody>
    <ModalFooter>
    <Button color="secondary" onClick={sttoggle}>Cancel</Button>
    </ModalFooter>
</Modal>
  );
};

export default ShowSyllabus;
