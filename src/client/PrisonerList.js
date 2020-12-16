/* eslint-disable no-undefined */
import React, { Component } from 'react';
// import the Link component to handle React Router
import { Link } from 'react-router-dom';

import Prisoner from './Prisoner';
// Axios is a lightweight HTTP client based on the $http service within Angular.js
// Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
// MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the users array
class PrisonerList extends Component {
  constructor(props) {
    super(props);
    // store the users array in the state
    this.state = { General: [] };

    // this binding is necessary to make `this` work in the callback
    // generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.updatePrisoner = this.updatePrisoners.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  
  componentDidMount() {
    if(undefined === this.props.match.params.firstName) {
      
      this.updatePrisoners();
    } else {            
      
      axios.get('/api/GeneralInf/' + this.props.match.params.firstName)
        .then(response => {
          this.setState({ General: response.data });
          console.log(response.data.firstName);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  updatePrisoners() {
    // get the users API using axios GET request to the server 
    axios.get('api/General')
      .then(response => {
        // store the response in the state
        this.setState({ General: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(id) {
    // make a DELETE request to the server which will handle the removal of the user with the specific userId
    axios
      .delete('api/General', {
        data: {
          id: id
        }
      })
      .then(response => {
        // if the deletion was successful then re-render the list of users
        this.updatePrisoners();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // produce a User component for each user object
    const prisonerList = this.state.General.map(u => (
      // map through each element in the array and set to the value received from the server
      <Prisoner
        key={u._id}
        id={u._id}
        firstName={u.firstName}
        lastName={u.lastName}
        age={u.age}
        image={u.picture}
        cell={u.cell}
        zone={u.zone}
        solitaryConfinement={u.solitaryConfinement}
        goodBehaviour={u.goodBehaviour}
        physicalActivity={u.physicalActivity}
        // y ou must include the handleDelete method to use in child components
        handleDelete={this.handleDelete}
      />
    ));

    // return the list of users
    return (
      <div className="all has-background-dark">
        {/* Navigation bar*/}
        <nav className="navbar has-background-dark">
          <h1 className="navbar-item title is-1 has-text-link">List of Prisoner</h1>
          {/* when this button is pressed, CreateUser component will be rendered by using React Router*/}
          <Link to={'/create-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Add prisoner</button>
          </Link>
          <Link to={'/search-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Find Prisoner</button>
          </Link>
        </nav>
        <hr className="hrclss has-background-link"/>
        {/* USER LIST*/}
        <div className="allin is-dark has-background-dark">
          <div className="columns is-dark has-background-dark">
            {prisonerList}
          </div>
        </div>
        <hr className="hrForm has-background-link"/>
        {/* FOOTER*/}
        <footer className="footer has-background-link">
          <div className="content has-text-centered">
            <p className="has-text-white-bis">Prisoner API styled with Bulma.</p>
          </div>
        </footer>
      </div>

    );
  }
}

export default PrisonerList;
