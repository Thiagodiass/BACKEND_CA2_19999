import React from 'react';
import ReactDOM from 'react-dom';
// import the Link component to use for linking prop information
import { Link } from 'react-router-dom';

// define one single prisoner card component
class Prisoner extends React.Component {
  render() {
    return (
      <div className="column is-2" style={{ padding: '20px' }}>
        <div className="card" style={{ borderRadius: '20px' }}>
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div className="card-content has-background-primary">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 has-text-danger">{this.props.firstName}</p>
                <hr className="hrprisoner has-background-link"/>
                <p className="subtitle is-4 has-text-danger">{this.props.lastName}</p>
                {/* delete the prop with requested id from the function invoked in the parent component*/}
                <button className="button is-danger" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                {/* load the Editprisoner component via React Router and send the id over to the EditUser component*/}
                <Link to={`/edit-prisoner/${this.props.id}`}>
                  <button className="button is-warning" type="button">
                  Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Prisoner;
