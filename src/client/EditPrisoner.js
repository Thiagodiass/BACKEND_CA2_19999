import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Use "npm install axios" command to install
import axios from 'axios';
// edit Prisoner component that will collect the informations
class EditPrisoner extends Component {
  constructor(props) {
    super(props);
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
  // delegating the source to the respective directory
  componentDidMount() {
    axios.get('/api/General/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
          infraction: response.data.infraction,
          cell: response.data.cell,
          zone: response.data.zone,
          solitaryConfinement: response.data.solitaryConfinement,
          goodBehaviour: response.data.goodBehaviour,
          physicalActivity: response.data.physicalActivity,
          picture: response.data.picture,
        });
      })
      .catch(error => {
        console.log(error);
      });
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
    axios.put('/api/General', this.state)
    // on success go to home
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // remember that the name of the input fields should match the state
    return (
      <div className="divForm has-background-dark">
        <nav>
          <h1 className="title is-1 has-text-link">Edit Prisoner</h1>
          
          <Link to={'/create-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Add prisoner</button>
          </Link>
          <Link to={'/search-prisoner'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">Find Prisoner</button>
          </Link>
          <Link to={'/'} className="navbar-item navbar-end">
            <button className="button is-link" type="button">All Prisoner</button>
          </Link>
        </nav>
        <form onSubmit={this.handleSubmit}>
          
          <hr className="hrForm has-background-link"/>
          {/* main container for input fields*/}
          <div className="container">
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
              {/* Second COLUMN*/}
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

export default EditPrisoner;
