import React, {useEffect, useState} from 'react';
import {Alert, Badge, Container, ListGroup, Spinner} from "react-bootstrap";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import axios from "axios";

const App = () => {

    const [todoItems,setTodoItems] = useState([])

    useEffect(() => {
        //get data from mysql
        axios.get('http://localhost:8000/getAll').then(result => setTodoItems([...result.data]))
    },[])

    console.log(todoItems,'List all addresses');

    return (
        <Container className={'App py-3'}>
            <Badge className={'mb-5'}>To Do App NodeJS React MySql</Badge>

            {todoItems.length?
                <AddTask todoItems={todoItems} />:
                <Alert>Вы не можете добавить задачу так как нет ответа от сервера</Alert>
            }

            <ListGroup className={'w-75 small'}>

                {
                    todoItems.length?
                        todoItems.map(item => (
                            <TaskItem key={item.id} id={item.id} task={item.task} success={item.success} />
                        )):
                        <Alert className={'small p-2'}>
                            Данные сервера не доступны, попробуйте позже.
                        </Alert>
                }
            </ListGroup>
        </Container>
    );
};

export default App;