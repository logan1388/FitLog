import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class workouthistory extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return Object.keys(this.props.logs)
            .map(key => {
                return [...Array(this.props.logs[key])].map(() => {
                    return (<Fragment key={key}>
                        <div id='LogList'>
                            <span>{this.props.logs[key].date}</span>
                            <span>{this.props.logs[key].weight}</span>
                            <span>{this.props.logs[key].unit}</span>
                            <span>{this.props.logs[key].count}</span>
                        </div>
                    </Fragment>)
                });
            });
    }
}

const mapStateToProps = state => {
    return {
        logs: state.logs
    }
}

export default connect(mapStateToProps)(workouthistory);