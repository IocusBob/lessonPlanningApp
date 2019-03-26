import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import LessonList from './lessons/LessonList';
import LessonView from './lessons/LessonView';
import LessonCreate from './lessons/LessonCreate';
import LessonDelete from './lessons/LessonDelete';
import LessonEdit from './lessons/LessonEdit';
import history from '../history';

// THINGS TO DO:
// Investigate React-Widgets and maybe incorperate a dropdown for lesson types (maths/english etc.)
// Add google Auth
//


class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={LessonList} />
              <Route path="/lesson/new" exact component={LessonCreate} />
              <Route path="/lesson/edit/:id" exact component={LessonEdit} />
              <Route path="/lesson/delete/:id" exact component={LessonDelete} />
              <Route path="/lesson/:id" exact component={LessonView} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
