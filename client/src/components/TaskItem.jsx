import React from 'react';
import {Badge, CloseButton, ListGroupItem} from "react-bootstrap";
import axios from "axios";

const TaskItem = ({id,task,success}) => {

    const deleteItem = () => {
        axios.post('http://localhost:8000/delete',{
            id:id,
        })
            .then(() => alert('Задача удалена'))
            .catch(() => alert('Ошибка, попробуйте позже'))
    }

    const updateItem = () => {
        axios.post('http://localhost:8000/update',{
            id:id,
            success:success
        })
            .then(() => alert('Задача выполнена'))
            .catch(() => alert('Ошибка, попробуйте позже'))
    }

    return (
        <ListGroupItem className={'TaskItem small d-flex justify-content-between align-items-center'}>
            <Badge>{id})</Badge>
            <p className={'m-0'}>{task}</p>
            {
                Number(success) ?
                    <Badge className={'opacity-50'} bg={"success"}>Done</Badge>:
                    <Badge style={{cursor:"pointer"}} onClick={updateItem} bg={"danger"}>Not done</Badge>
            }
            <CloseButton onClick={() => deleteItem(id)} />
        </ListGroupItem>
    );
};

export default TaskItem;