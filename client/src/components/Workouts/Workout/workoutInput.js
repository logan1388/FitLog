import React, { useState } from 'react';

const WorkoutInput = props => {
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [count, setCount] = useState(0);

    const weightChange = e => {
        setWeight(e.target.value);
    };

    const unitChange = e => {
        setUnit(e.target.value);
    };

    const countChange = e => {
        setCount(e.target.value);
    };

    const add = (weight, unit, count) => {
        props.addLog(weight, unit, count);
        setWeight(0);
        setCount(0);
    }

    return (
        <React.Fragment>
            <div className='DetailsLogContainer d-inline-block mt-3 mb-3'>
                <span>Weight</span>
                <input type='number' value={weight} onChange={weightChange} />
                <select className='ml-3 mr-3' value={unit} onChange={unitChange}>
                    <option value='lbs'>lbs</option>
                    <option value='kgs'>kgs</option>
                </select>
                <span>Count</span>
                <input type='number' value={count} onChange={countChange} />
            </div>
            <div id="SaveLogBtn" className='d-inline-flex ml-3 mr-3'>
                <button disabled={!(weight > 0 && count > 0)} type="button" className="btn btn-outline-dark" onClick={() => add(weight, unit, count)}>Add</button>
            </div>
        </React.Fragment>
    )
}

export default WorkoutInput;