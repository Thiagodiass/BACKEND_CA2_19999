import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Axios is a lightweight HTTP client based on the $http service within Angular.js
// Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

// Create Prisoner component that will create a new user card
class CreatePrisoner extends Component {
  constructor(props) {
    super(props);
    // the form fields are stored in a state
    this.state = { 
      firstName: '',
      lastName: '',
      age: '',
      infraction: '',
      cell: '',
      zone: '',
      solitaryConfinement: '',
      goodBehaviour: '',
      physicalActivity: '',
      picture: ''
    };
    // this binding is necessary to make `this` work in the callback
    // generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // once the input boxes are changed, update the state to match the value
  handleChange(event) {
    // name of the input boxes must match the property names in the state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
    event.preventDefault();

    // use axios to send a POST request to the server which includes the state information for the new prisoner to be created
    axios.post('/api/General', this.state)
    // on success go to home
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // remember that the name of the input fields should match the state
    return (
      <div className="divForm has-background-dark" id="content">
        {/* on form submit call handleSubmit()*/}
        <form onSubmit={this.handleSubmit}>
          <h2 className="title is-1 has-text-link">Create New Prisoner</h2>
          <Link to={'/'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">All Prisoners</button>
          </Link>
          <Link to={'/search-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Find Prisoner</button>
          </Link>
          <hr className="hrForm has-background-link"/>
          {/* main container for input fields*/}
          <div className="container" id="divcontainer">
            {/* FIRST COLUMN*/}
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label has-text-white-bis"> First Name: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Last Name: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Age: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="age" value={this.state.age} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Infraction Committed: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="infraction" value={this.state.infraction} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Cell: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="cell" value={this.state.cell} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                
              </div>
              {/* SECOND COLUMN*/}
              <div className="column">
                <div className="field">
                  <label className="label has-text-white-bis"> Zone: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="zone" value={this.state.zone} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                
                <div className="field">
                  <label className="label has-text-white-bis"> Solitary Confinement: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="solitaryConfinement" value={this.state.solitaryConfinement} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Good Behaviour: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="goodBehaviour" value={this.state.goodBehaviour} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Physical Activity: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="physicalActivity" value={this.state.physicalActivity} onChange={this.handleChange} id="form" />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-white-bis"> Prisoner Picture: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                  </div>
                </div>
              </div>
            </div>
            {/* SUBMIT BUTTON*/}
            <input className="button is-danger" type="submit" value="Submit" />
          </div>
        </form>
        <hr className="hrForm has-background-link"/>
        <footer className="footer has-background-link">
          <div className="content has-text-centered">
            <p className="has-text-white-bis">Prisoner API styled with Bulma.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default CreatePrisoner;
