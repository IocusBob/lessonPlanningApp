import React from 'react';
import { connect } from 'react-redux';
import {fetchLessonPlan} from '../../actions';
import ShowCard from './LessonShowCard';

class LessonShow extends React.Component{

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchLessonPlan(id);
  }
  render(){
    if(!this.props.lesson){
      return <div>Loading...</div>
    }
    const {title, subject, aims, introduction, maintask, plenary} = this.props.lesson

    return(
      <div className='container'>
        <div className="jumbotron" style={{padding:'1em', marginTop:'1em'}}>
          <h1 className="display-4 text-primary">{title}</h1>
          <hr className="my-4" />
          <h3 className="display-6 text-secondary">{subject}</h3>
        </div>
        <div className=" container d-flex align-items-center flex-column">
          <ShowCard color="primary" label="Aims" data={aims} />
          <ShowCard color="warning" label="Lesson Introduction" data={introduction} />
          <ShowCard color="success" label="Main Body" data={maintask} />
          <ShowCard color="danger" label="Lesson Summary" data={plenary} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {lesson: state.lessons[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchLessonPlan})(LessonShow)
