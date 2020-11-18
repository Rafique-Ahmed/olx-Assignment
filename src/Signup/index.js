import React from "react";
import firebase from "firebase";
import History from "../History";

export default class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    number: "",
    password: "",
  };

  componentDidMount =  () => {
    let uid = localStorage.getItem('uid')
    if (uid) History.push("/Home");
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNumber = (event) => {
    this.setState({ number: event.target.value });
  };

  handlePsw = (event) => {
    this.setState({ password: event.target.value });
  };

  submit = () => {
    let db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((success) => {
        localStorage.setItem('uid', success.user.uid)
        db.collection("users")
          .add({
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            uid: success.user.uid,
          })
          .then(function (docRef) {
            History.push("/Home");
          });
      })
      .catch(function (error) {
        alert(error);
      });
  };

  // arrow function does't have is own (this)
  // normall function have is own (this)

  render() {
    return (
      <div>
        <h3>Signup</h3>

        <input
          value={this.state.name}
          onChange={this.handleName}
          placeholder="Full Name"
        />
        <br />
        <input
          value={this.state.email}
          onChange={this.handleEmail}
          placeholder="email"
        />
        <br />
        <input
          value={this.state.number}
          onChange={this.handleNumber}
          placeholder="Phone Number"
        />
        <br />
        <input
          value={this.state.password}
          onChange={this.handlePsw}
          placeholder="password"
        />
        <br />
        <button onClick={this.submit}>Sign up</button>
      </div>
    );
  }
}
