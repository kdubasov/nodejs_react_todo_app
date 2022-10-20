import React from 'react';
import {Badge, CloseButton, ListGroupItem} from "react-bootstrap";

const TaskItem = ({id,task,success}) => {
    return (
        <ListGroupItem className={'TaskItem small d-flex justify-content-between align-items-center'}>
            <Badge>{id})</Badge>
            <p className={'m-0'}>{task}</p>
            {Number(success) ? <Badge bg={"success"}>Done</Badge> : <Badge bg={"danger"}>Not done</Badge>}
            <CloseButton />
        </ListGroupItem>
    );
};

export default TaskItem;