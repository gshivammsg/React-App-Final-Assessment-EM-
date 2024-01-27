import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const Syllabus = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    // useEffect(() => {
    //     let arr = localStorage.getItem("taskList")
       
    //     if(arr){
    //         let obj = JSON.parse(arr)
    //         setTaskList(obj)
    //     }
    // }, [])
    const fetchingData = async () => {
        try {
          const response = await fetch('http://localhost:8080/syllabus/getAllSyllabus');
          const result = await response.json();
          console.log("result ki value --------> ",result);
          setTaskList(result.syllabus_data);
          // setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          // setLoading(false);
        }
    };

    useEffect(() => {
        const fetchingData = async () => {
            try {
              const response = await fetch('http://localhost:8080/syllabus/getAllSyllabus');
              const result = await response.json();
              console.log("result ki value --------> ",result);
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

    const updateListArray = (obj, index) => {

        console.log("Syllabus mei updateListArray ki value ---->",obj)
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        // setTaskList(tempList)
        window.location.reload()
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
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <h3>Syllabus</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Syllabus</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {()=>deleteTask(obj.id)} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default Syllabus;