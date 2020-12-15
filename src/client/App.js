import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
// import required components
import CreatePrisoner from './CreatePrisoner';
import EditPrisoner from './EditPrisoner';
import PrisonerList from './PrisonerList';
import SearchPrisoner from './SearchPrisoner';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/* SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={PrisonerList}/>
        {/* SERVERSIDE: Link the routes to components*/}
        <Route exact path="/prisoner/:firstName" component={PrisonerList}/>
        {/* pass the id through the EditUser component*/}
        <Route path="/edit-prisoner/:id" component={EditPrisoner}/>
        {/* set the path to create a new user to CreateUser component*/}
        <Route path="/create-prisoner" component={CreatePrisoner}/>
        {/* set the path to Search a Prisoner in the database*/}
        <Route path="/search-prisoner" component={SearchPrisoner}/>
      </div>
    </HashRouter>
  );
};

export default App;
