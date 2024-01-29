import React, {useState} from 'react';
import EditTask from '../modals/EditTask'
import AddTagToSyllabus from '../modals/AddTagToSyllabus';
import ShowTags from '../modals/ShowTags';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState();
    const [show, setShow] = useState(false);
    const [showTags, setShowTags] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const stoggle = () => {
        setShow(!show);
    }

    const sttoggle = () => {
        setShowTags(!showTags);
    }

    const updateTask = async (obj) => {
        obj['id'] = taskObj.id;
        try {
            await fetch('http://localhost:8080/syllabus/updateSyllabusById', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
          }catch(error){
              console.error('Error fetching data:', error);
          }
          setModal(false);
        updateListArray(obj, index)
    }


    const addTagTask =  async (obj) => {
        obj['syllabus_id'] = taskObj.id;
        console.log("obj ki value ----->  "+JSON.stringify(obj))
        console.log("taskObj syllabus id ------> ",taskObj.id)
        try {
            await fetch('http://localhost:8080/syllabus/addTagToSyllabus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
          }catch(error){
              console.error('Error fetching data:', error);
          }
          
        setShow(false)
    }


    const handleDelete = (syllabusId) => {
        deleteTask(syllabusId)
    }

    return (
        <>
        <div class = "card-wrapper mr-5">
            <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div class = "task-holder">
                <span class = "card-header" style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px"}}>{taskObj.syllabus_name}</span>
                <p className = "mt-3">{taskObj.description}</p>
                <p className = "mt-1">{taskObj.topics}</p>
                <p className = "mt-1">{taskObj.duration}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i class="fas fa-shield-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setShowTags(true)} ></i>
                    <i class = "fas fa-plus mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setShow(true)}></i>
                    <i class = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                    <i class="fas fa-trash-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => handleDelete(taskObj.syllabus_id)}></i>
                </div>
        </div>
        <AddTagToSyllabus show={show} stoggle={stoggle} save={addTagTask}></AddTagToSyllabus>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        <ShowTags showTags={showTags} sttoggle={sttoggle} id={taskObj.id}></ShowTags>
        </div>
        </>
        
    );
};

export default Card;