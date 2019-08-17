import React, { Fragment } from 'react';
import {Collapse} from 'react-collapse';

const Workoutlog = (props) => {
    return (
        <Fragment>
            <div className='ExerciseContainer'>
                    <span onClick={props.clicked}>{props.children}</span>
                    <Collapse isOpened={props.isOpened}>
                        <div className='ExpExerciseContainer'>
                            <div className='DetailsLogContainer'>
                                <span>Weight</span>                            
                                <input type='number'/>
                                <select>
                                    <option value='1'>lbs</option>
                                    <option value='2'>kgs</option>
                                </select>
                            </div>
                            <div className='DetailsLogContainer'>
                                <span>Count</span>
                                <input type='number'/>
                            </div>               
                            <div id="SaveLogBtn">
                                <button type="button" className="btn btn-outline-dark">Add</button>
                            </div>
                        </div>
                    </Collapse>             
                </div>
        </Fragment>
    )
}

export default Workoutlog;