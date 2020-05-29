import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { activities } from '../../store/actions';
import moment from 'moment';

class Activity extends Component {

  constructor() {
    super();
    this.exercises = {};
  }

  componentDidMount() {
    const id = JSON.parse(localStorage.getItem('user')).data.user.id;
    const userId = this.props.user.id ? this.props.user.id : id;
    this.props.dispatch(activities(userId));
  }

  render() {
    this.exercises = {};
    this.props.activity.map((activity, idx) => {
      activity.date = moment(activity.date).format('MM/DD/YY');
      activity.id = idx + 1;
      if (this.exercises[activity.name]){
        activity.parentId = this.exercises[activity.name];
      }
      else
        this.exercises[activity.name] = activity.id;
    });
    console.log('activity: ',this.props.activity);

    return (
      <React.Fragment>
        <div className='m-3'>
          <MaterialTable
            title=""
            options={{
              paging: false,
              headerStyle: {
                backgroundColor: 'lightgrey'
              },
              selection: false
            }}
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'Workout', field: 'name' },
              { title: 'Max weight', field: 'maxWeight', type: 'numeric' },
              { title: 'Weight', field: 'weight', type: 'numeric' },
              { title: 'Count', field: 'count', type: 'numeric' }
            ]}
            // data={[
            //   { id: 1, date: '04-07-2020', workout: 'Bench Press', maxwt: 50, count: 10 },
            //   { id: 2, workout: 'Bench Press', weight: 45, count: 10, parentId: 1 },
            //   { id: 3, date: '04-07-2020', workout: 'Squat', maxwt: 85, count: 6 },
            //   { id: 4, workout: 'Squat', weight: 50, count: 8, parentId: 3 }
            // ]}
            data={this.props.activity}
            parentChildData={(row, rows) => rows.find(a => (a.id === row.parentId))}
          />
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    activity: state.activity
  }
};

export default connect(mapStateToProps)(Activity);