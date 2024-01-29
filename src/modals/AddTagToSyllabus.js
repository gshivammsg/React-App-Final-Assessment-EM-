import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddTagToSyllabus = ({show, stoggle, save}) => {
    const [tagId, setTagId ] = useState();
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownValues, setDropdownValues] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8081/tag/getAllTag')
        .then(response => response.json())
        .then(data => {if(data.status != 404){ setDropdownValues(data.tag_data) }})
        .catch(error => console.error('Error fetching dropdown values:', error));
    },[])

    // useEffect(()=>{
    //     console.log("-----------> dropdownValues ---> ",dropdownValues)
    // },[dropdownValues])

    const handleDropdownChange = (e) => {
        // console.log("e.target.value ki value ----->",e.target.value)
        setTagId(e.target.value);
        // console.log("------->  e.target",e.target)
        // const tag_id = e.target;
        const tag_name = e.target.options[e.target.selectedIndex].text;
        setSelectedValue(tag_name)
    
        // console.log("tag_id =======> ", tag_id, "tag_name ---->",tag_name)
        // if(name === "tagName"){
        //     setTagName(value)
        // }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["tag_id"] = tagId
        // taskObj["description"] = description
        // taskObj["topics"] = topics
        // taskObj["duration"] = duration
        save(taskObj)
    }

    return (
        <Modal isOpen={show} toggle={stoggle}>
            <ModalHeader toggle={stoggle}>Add Tag To Syllabus</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Tag Name</label>
                    
                    <select className="form-select"  onChange={handleDropdownChange}>
                    <option value="">Select an option</option>
                    {dropdownValues.map((value) => (
                    
                    <option key={value.id} value={value.tag_id}>
                        {value.tag_name}
                    </option>
                    ))}
                    </select>
                    {selectedValue && <p>You selected: {selectedValue}</p>}
                    </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Add Tag</Button>{' '}
            <Button color="secondary" onClick={stoggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default AddTagToSyllabus;