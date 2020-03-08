import React from 'react';

const workouthistory = props => {
    return (
        <div className='LogList'>
            <span className='Log_DateTime'>{props.date}</span>
            <span className='Log_Weight'>{props.weight}</span>
            <span className='Log_Unit'>{props.unit}</span>
            <span className='Log_Count'>{props.count}</span>
        </div>
    );
};

export default workouthistory;