import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTag = ({modal, toggle, save}) => {
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');
    const [duration, setDuration] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "tagName"){
            setTagName(value)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["tag_name"] = tagName
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Syllabus</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Tag Name</label>
                        <input type="text" className = "form-control" value = {tagName} onChange = {handleChange} name = "tagName"/>
                    </div>
                    
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTag;