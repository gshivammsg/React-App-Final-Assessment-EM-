import React, {useEffect, useState} from 'react';
import Card2 from './Card2';
import CreateTag from '../modals/CreateTag';

const Tag = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    const fetchingData = async () => {
        try {
          const response = await fetch('http://localhost:8081/tag/getAllTag');
          const result = await response.json();
          console.log("result ki value --------> ", result)
          setTaskList(result.tag_data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        const fetchingData = async () => {
          try {
            const response = await fetch('http://localhost:8081/tag/getAllTag');
            const result = await response.json();
            console.log("result ki value --------> ", result)
            setTaskList(result.tag_data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchingData();
      }, []);

    const deleteTask = async (id) => {
        await fetch(`http://localhost:8081/tag/deleteTagById/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            await fetchingData();
    }

    const updateListArray = async (obj, index) => {
      try {
        const response = await fetch('http://localhost:8081/tag/updateTag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
      }catch(error){
          console.error('Error fetching data:', error);
      }
    }

    const toggle = () => {
        setModal(!modal);
    }

    const fetchData = async (taskObj) => {
        try {
          const response = await fetch('http://localhost:8081/tag/addTag', {
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
        await fetchingData();
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <h3>Tag</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Tag</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card2 taskObj = {obj} index = {index} deleteTask = {()=>deleteTask(obj.tag_id)} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTag toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default Tag;