import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({modal, toggle, updateTask, taskObj}) => {
    const [syllabus, setSyllabus] = useState(taskObj.syllabus_name);
    const [description, setDescription] = useState(taskObj.description);
    const [topics, setTopics] = useState(taskObj.topics);
    const [duration, setDuration] = useState(taskObj.duration);

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "syllabus"){
            setSyllabus(value)
        }else if(name === "description"){
            setDescription(value)
        }else if(name === "topics"){
            setTopics(value)
        }else if(name === "duration"){
            setDuration(value)
        }
    }



    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['id'] = taskObj.syllabus_id
        tempObj['topics'] = topics
        tempObj['duration'] = duration
        tempObj['syllabus_name'] = syllabus
        tempObj['description'] = description
        updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Syllabus</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Syllabus Name</label>
                        <input type="text" className = "form-control" value = {syllabus} onChange = {handleChange} name = "syllabus"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>Topics</label>
                        <input type="text" className = "form-control" value = {topics} onChange = {handleChange} name = "topics"/>
                    </div><div className = "form-group">
                        <label>Duration</label>
                        <input type="text" className = "form-control" value = {duration} onChange = {handleChange} name = "duration"/>
                    </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup;