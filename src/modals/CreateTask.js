import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({modal, toggle, save}) => {
    const [syllabusName, setSyllabusName] = useState('');
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');
    const [duration, setDuration] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "syllabusName"){
            setSyllabusName(value)
        }else if(name == "description"){
            setDescription(value);
        }else if(name == "topics"){
            setTopics(value);
        }else{
            setDuration(value)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["syllabus_name"] = syllabusName
        taskObj["description"] = description
        taskObj["topics"] = topics
        taskObj["duration"] = duration
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Syllabus</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Subject</label>
                        <input type="text" className = "form-control" value = {syllabusName} onChange = {handleChange} name = "syllabusName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea  className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>Topics</label>
                        <textarea  className = "form-control" value = {topics} onChange = {handleChange} name = "topics"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>Duration</label>
                        <textarea  className = "form-control" value = {duration} onChange = {handleChange} name = "duration"></textarea>
                    </div>
                    {/* <div className = "form-group">
                        <label>Tag</label>
                        <textarea  className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div> */}
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;