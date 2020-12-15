import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Use "npm install axios" command to install
import axios from 'axios';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.put('/api/General', this.state)
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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
          <div className="container">
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
