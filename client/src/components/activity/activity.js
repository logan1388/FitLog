import React from 'react';
import MaterialTable from 'material-table';

const activity = props => {

  return (
    <React.Fragment>
      <div className='m-3'>
        <MaterialTable
          title="Activity"
          options={{ search: false }}
          columns={[
            { title: 'Date', field: 'date' },
            { title: 'Workout', field: 'workout' },
            { title: 'Max weight', field: 'maxwt', type: 'numeric' },
            { title: 'Count', field: 'count', type: 'numeric' }
          ]}
          data={[
            { id: 1, date: '04-07-2020', workout: 'Bench Press', maxwt: 50, count: 10 },
            { id: 2, workout: 'Bench Press', maxwt: 50, count: 10, parentId: 1 },
            { id: 3, date: '04-07-2020', workout: 'Squat', maxwt: 85, count: 6 },
            { id: 4, workout: 'Squat', maxwt: 65, count: 8, parentId: 3 }
          ]}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        />
      </div>
    </React.Fragment>
  );
};

export default activity;