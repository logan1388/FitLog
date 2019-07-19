import React, { Fragment } from 'react';
import {Collapse} from 'react-collapse';

const Workoutlog = (props) => {
    return (
        <Fragment>
            <div className='ExerciseContainer' onClick={props.clicked}>
                    <span>{props.children}</span>
                    <Collapse isOpened={props.isOpened}>
                        <div className='ExpExerciseContainer'>
                            <div>Weight</div>
                            <div>Count</div>
                        </div>
                    </Collapse>             
                </div>
        </Fragment>
    )
}

export default Workoutlog;