import React from 'react';
import { connect } from 'react-redux';
import { createLessonPlan } from '../../actions'
import LessonForm from './LessonForm'

import 'react-widgets/dist/css/react-widgets.css';

class LessonCreate extends React.Component {


  onSubmit = (formValues) => {
    return this.props.createLessonPlan(formValues)
  }


  render(){
    return(
      <div>
        <h3 className="text-primary">Create a Lesson Plan</h3>
        <LessonForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, {createLessonPlan})(LessonCreate)
