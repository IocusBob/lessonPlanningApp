import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchLessonPlan, deleteLessonPlan } from '../../actions';
import { Link } from 'react-router-dom';


class LessonDelete extends React.Component {
  componentDidMount(){
    this.props.fetchLessonPlan(this.props.match.params.id)
  }
  renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteLessonPlan(this.props.match.params.id)} className="btn btn-danger">Delete</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent = () => {
    if (!this.props.stream){
      return "Are you sure you want to delete this stream?"
    }
    return `Are you sure you want to delete: "${this.props.lesson.title}" ?`
  }

  render(){
    return(
      <Modal
        title="Delete Lesson Plan"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {lesson: state.lessons[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchLessonPlan, deleteLessonPlan})(LessonDelete)
