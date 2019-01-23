import React from 'react';
import './statusMessage.css';

export const StatusMessage = (props) => {
    return (
        <p className='statusMessage'>{props.body}</p>
    )
}

export default StatusMessage;