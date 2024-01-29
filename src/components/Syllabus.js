import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const Syllabus = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [showEditCard, setShowEditCard] = useState(false);
    
    const fetchingData = async () => {
        try {
          const response = await fetch('http://localhost:8080/syllabus/getAllSyllabus');
          const result = await response.json();
          setTaskList(result.syllabus_data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchingData = async () => {
            try {
              const response = await fetch('http://localhost:8080/syllabus/getAllSyllabus');
              const result = await response.json();
              setTaskList(result.syllabus_data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
         fetchingData();
      }, []);

    const deleteTask = async (id) => {
            await fetch(`http://localhost:8080/syllabus/deleteSyllabusById/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            await fetchingData();
    }

    const updateListArray = async (obj, index) => {
      await fetchingData();
    }

    const toggle = () => {
        setModal(!modal);
    }

    const fetchData = async (taskObj) => {
        try {
          await fetch('http://localhost:8080/syllabus/addSyllabus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskObj),
          });
        }catch(error){
            console.error('Error fetching data:', error);
        }
      };

    const saveTask = async (taskObj) => {
        await fetchData(taskObj);
        fetchingData();
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <h3>Syllabus</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Syllabus</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card showEditCard={showEditCard} taskObj = {obj} index = {index} deleteTask = {()=>deleteTask(obj.id)} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default Syllabus;