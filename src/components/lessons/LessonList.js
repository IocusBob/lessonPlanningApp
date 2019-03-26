import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { fetchLessonPlans } from '../../actions';
import DropdownList from 'react-widgets/lib/DropdownList';

import 'react-widgets/dist/css/react-widgets.css';


class LessonList extends React.Component {
  componentDidMount(){
    this.props.fetchLessonPlans()
  }
  renderCreate() {
    if (this.props.isSignedIn){
      return(
        <div style={{textAlign: 'right', margin: '0.3em'}}>
          <Link to="/lesson/new" className="btn btn-primary">Create New Lesson Plan</Link>
        </div>
      )
    }
  }

  renderAdmin(lesson){
    if (lesson.userId === this.props.currentUserId){
      return<div className="float-md-right">
        <Link style={{margin: '0.3em'}} to={`/lesson/edit/${lesson.id}`} className="btn btn-primary">Edit</Link>
        <Link style={{margin: '0.3em'}} to={`/lesson/delete/${lesson.id}`} className="btn btn-danger">
          Delete
        </Link>
      </div>
    }
  }

  checkAndRender = (props, lesson) => {
    if (lesson.subject === props.filteredInput.dropFilter.values.filter){
      return(
        <li className="list-group-item" key={lesson.id}>
          {this.renderAdmin(lesson)}
          <i className="large middle aligned icon camera" />
          <div className="content">
          <Link className="header" to={`/lesson/${lesson.id}`}><h4>{lesson.title}</h4></Link>
            <p className="card-text">{lesson.subject}</p>
          </div>
        </li>
      )
    }
  }

  renderList = (props) => {
    try {
      return this.props.lessons.map(lesson => {
          return this.checkAndRender(props, lesson)
        }
      )
    }
    catch(error){
      return <h4 className="h4 text-primary">Choose a subject to see lesson plans</h4>
    }
  }

  subjects = ['Maths', 'English', 'Science', 'History', 'Music', 'Art',
  'Modern Foreign Language', 'Physical Education', 'Other']

  renderDropdownList = ({ input, data, textField, label }) => {
    return (
      <div className="form-group">
        <label className="text-secondary">{label}</label>
        <DropdownList {...input}
        data={data}
        textField={textField}
        onChange={input.onChange} />
      </div>
    )
  }

  render(){
    if (!this.props.form){
      return <div>Loading...</div>
    }

  return (
    <div>
      <h2 className="text-primary">Lessons</h2>
      <Field
      name="filter"
      component={this.renderDropdownList}
      data={this.subjects}
      textField="subjects"
      label="Search by Subjects:" />
      <ul className="list-group">
        {this.renderList(this.props)}
      </ul>
      {this.renderCreate()}
    </div>
  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    lessons: Object.values(state.lessons),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    filteredInput: state.form,
   }
}
const formWrapped = reduxForm(
  {form: 'dropFilter', enableReinitialize : true}
)(LessonList)

export default connect(mapStateToProps, {fetchLessonPlans} )(formWrapped)
