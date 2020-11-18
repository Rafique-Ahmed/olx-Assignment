import React from "react";
import firebase from "firebase";

export default class Forget extends React.Component {
  state = { email: "" };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  submit = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .catch(function (error) {
        alert(error);
      });
  };

  render() {
    return (
      <div>
        <h3>Forget password</h3>

        <input
          value={this.state.email}
          onChange={this.handleEmail}
          placeholder="email"
        />
        <br />
        <button onClick={this.submit}>Resset password</button>
      </div>
    );
  }
}
