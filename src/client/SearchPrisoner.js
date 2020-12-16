import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Use "npm install axios" command to install
import axios from 'axios';
// Search Prisoner component that will create a new user card
class SearchPrisoner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      infraction: '',
      cell: '',
      zone: '',
      finishOfsentence: '',
      startOfSentence: '',
      solitaryConfinement: '',
      goodBehaviour: '',
      physicalActivity: '',
      picture: ''
    };
    // this binding is necessary to make `this` work in the callback
    // generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
    this.handleChange = this.handleChange.bind(this);
    
  }
  // once the input boxes are changed, update the state to match the value
  handleChange(event) {
    // name of the input boxes must match the property names in the state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }


  render() {
    // remember that the name of the input fields should match the state
    return (
      <div className="divForm has-background-dark">
        <form onSubmit={this.handleSubmit}>
          <h2 className="title is-1 has-text-link">Find Prisoners</h2>
          <Link to={'/'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">All Prisoners</button>
          </Link>
          <Link to={'/create-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Add Prisoner</button>
          </Link>
          <hr className="hrForm has-background-link"/>
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label has-text-white-bis"> First Name: </label>
                  <div className="control">
                    <input className="input is-small" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} id="form" />
                  </div>
                </div>
              </div>
            </div>
            
            <Link to={`/prisoner/${this.state.firstName}`}>
              <input className="button is-primary" type="submit" value="Submit" />
            </Link>
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
export default SearchPrisoner;
