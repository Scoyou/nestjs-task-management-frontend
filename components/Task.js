import React from 'react';
import { Card } from 'semantic-ui-react'

const Task = ({ task }) => {
    return (
        <div style={{width: '100%', borderStyle: 'groove'}}>
            <h2>{task.title}</h2>
            <h2>{task.projectIdentifier}</h2>
            <h2>{task.status}</h2>
            <h2>{task.userId}</h2>
            <p>{task.description}</p>
        </div>
    )
}

export default Task;