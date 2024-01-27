import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTag = ({modal, toggle, updateTask, taskObj}) => {
    const [tagName, setTagName] = useState(taskObj.tag_name);

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "tagName"){
            setTagName(value)
        }


    }


    const handleUpdate = (e) => {
        let tempObj = {}
        tempObj['tag_id'] = taskObj.id
        tempObj['tag_name'] = tagName
        updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Tag Name</label>
                        <input type="text" className = "form-control" value = {tagName} onChange = {handleChange} name = "tagName"/>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTag;