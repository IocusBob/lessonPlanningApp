import React from 'react';
import {Field, reduxForm} from 'redux-form'
import DropdownList from 'react-widgets/lib/DropdownList';

import 'react-widgets/dist/css/react-widgets.css';

class LessonForm extends React.Component{

  subjects = ['Maths', 'English', 'Science', 'History', 'Music', 'Art',
  'Modern Foreign Language', 'Physical Education', 'Other']
  renderDropdownList = ({ input, data, textField, label, meta }) => {
    const className = `alert alert-danger ${meta.error && meta.touched ? '' : 'invisible'}`
    return (
      <div className="form-group">
        <div className={className}>{this.renderError(meta)}</div>
        <label>{label}</label>
        <DropdownList {...input}
        data={data}
        textField={textField}
        onChange={input.onChange} />
      </div>
    )
  }

  renderError = ({error, touched}) => {
      if (touched && error) {
        return (
            <h4>{error}</h4>
        )
      }
    }

  renderInput = ({input, label, meta}) => {
    const className = `alert alert-danger ${meta.error && meta.touched ? '' : 'invisible'}`
    return (
      <div className="form-group">
        <div className={className}>{this.renderError(meta)}</div>
        <label>{label}</label>
        <input className="form-control" {...input} autoComplete="off" />
      </div>
    )
  }

  renderTextArea = ({input, label, rows, meta}) => {
    const className = `alert alert-danger ${meta.error && meta.touched ? '' : 'invisible'}`
    return(
      <div className="form-group">
        <div className={className}>{this.renderError(meta)}</div>
        <label>{label}</label>
        <textarea {...input} rows={rows} className="form-control"/>
      </div>
    )
  };

  onSubmit = (formValues) => {
      this.props.onSubmit(formValues)
    }

  render(){
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-group">
          <Field name="title" component={this.renderInput} label="Lesson Title:"/>
          <Field
          name="subject"
          component={this.renderDropdownList}
          data={this.subjects}
          textField="subjects"
          label="Subject" />
          <Field name='aims' component={this.renderTextArea} label="Aims and Objectives:" rows="3"/>
          <Field name="introduction" component={this.renderTextArea} label="Lesson introduction:" rows="3"/>
          <Field name="maintask" component={this.renderTextArea} label="Main Body:" rows="10"/>
          <Field name="plenary" component={this.renderTextArea} label="Plenary:" rows="3"/>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors ={}
  if(!formValues.title){
    errors.title = 'Title Field Required'
  }
  if(!formValues.subject){
    errors.subject = 'Subject Field Required'
  }
  if(!formValues.aims) {
    errors.aims = 'Aims Field Required'
  }
  if(!formValues.introduction){
    errors.introduction = 'Introduction Field Required'
  }
  if(!formValues.maintask){
    errors.maintask = 'Main Body Field Required'
  }
  if(!formValues.plenary){
    errors.plenary = 'Plenary field required'
  }
  return errors
}

export default reduxForm({
  form: 'lessonPlanForm',
  validate
})(LessonForm)
