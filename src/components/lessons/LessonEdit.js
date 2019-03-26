import React from 'react';
import { connect } from 'react-redux';
import { fetchLessonPlan, editLessonPlan } from '../../actions';
import history from '../../history'
import { Link } from 'react-router-dom';
import LessonForm from './LessonForm';
import Modal from '../Modal';
import _ from 'lodash';

class LessonEdit extends React.Component{
  componentDidMount() {
    this.props.fetchLessonPlan(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editLessonPlan(this.props.match.params.id, formValues)
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </React.Fragment>
    )
  }

  render(){
    if(!this.props.lesson){
      return <div>Loading...</div>
    }
    if (this.props.lesson.userId !== this.props.currentUser){
      return(
        <Modal
          title="Permission Denied!"
          content="You are not the author of this lesson plan. Please login and try again."
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      )
    }

    return (
      <div>
      <h3 className="text-primary">Edit a Lesson Plan</h3>
      <LessonForm initialValues={_.pick(this.props.lesson, ['title', 'subject', 'aims', 'introduction', 'maintask', 'plenary'])} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {lesson: state.lessons[ownProps.match.params.id], currentUser: state.auth.userId}
}

export default connect(mapStateToProps,{fetchLessonPlan, editLessonPlan})(LessonEdit)
