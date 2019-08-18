import React, { Fragment } from 'react';

const workouthistory = (props) => {
    return(
        <Fragment>
            <div id='LogList'>
                <span>{props.log.date}</span>
                <span>{props.log.weight}</span>
                <span>{props.log.unit}</span>
                <span>{props.log.count}</span>
            </div>
        </Fragment>
    )
}

export default workouthistory;