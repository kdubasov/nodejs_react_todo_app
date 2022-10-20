import React, {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import axios from "axios";

const AddTask = ({todoItems}) => {

    //data for item
    const [data,setData] = useState({
        id:todoItems[todoItems.length -1].id + 1,
        task:'',
        success:0,
    });

    //change task data
    const handleChange = (value) => {
        const copy = Object.assign({},data);
        copy.task = value;
        setData(copy)
    };

    const sendData = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/add',{
            ...data
        })
        .then(() => alert('Задача добавлена'))
        .catch(() => alert('Ошибка, попробуйте позже'))
    }

    return (
        <InputGroup className={'AddTask w-75 mb-3'}>
            <Form onSubmit={sendData} className={'d-flex'}>
                <FormControl required value={data.task} onChange={e => handleChange(e.target.value)} size={"sm"} />
                <Button type={"submit"} size={"sm"}>Добавить задачу</Button>
            </Form>
        </InputGroup>
    );
};

export default AddTask;