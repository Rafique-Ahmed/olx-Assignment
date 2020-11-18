import "./style.css";
import React from "react";
import firebase from "firebase";
import History from "../History";
import { getData } from "../action";
import { Button, Navbar, FormControl, Nav, Form } from "react-bootstrap";

export default class Home extends React.Component {
  state = {
    adds: [],
  };

  componentDidMount = () => {
    getData().then((adds) => {
      this.setState({ adds });
    });

    firebase
      .firestore()
      .collection("notification")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              new Notification(change.doc.data().name);
            }
          });
        });
      });
  };

  logout() {
    localStorage.removeItem("uid");
    History.push("/Login");
  }

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Olx</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/myAdds">My Adds</Nav.Link>
            <Nav.Link href="/Sell">sell</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Button variant="outline-light" onClick={this.logout}>
            Logout
          </Button>
        </Navbar>

        <div className="postsView">
          {this.state.adds.map((item, index) => {
            return (
              <div className="addscontainer">
                <img src={item.url} width="200px" />
                <h5>Title: {item.title}</h5>
                <p>Rs. {item.price}</p>
                <p style={{ overflow: "hidden", height: "25px" }}>
                  Detail: {item.disc}
                </p>
                <Button color="info">info</Button>{" "}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
