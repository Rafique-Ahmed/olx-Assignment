import "./style.css";
import React from "react";
import swal from "sweetalert";
import firebase from "firebase";
import History from "../History";
import { Button, Navbar, FormControl, Nav, Form } from "react-bootstrap";

export default class Home extends React.Component {

  state = {
    disc: "",
    price: "",
    title: "",
    file: {},
    imageUrl: "",
  };

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePrice = (event) => {
    this.setState({ price: event.target.value });
  };

  handleDisc = (event) => {
    this.setState({ disc: event.target.value });
  };

  postAdd = () => {
    let uid = localStorage.getItem("uid");
    let imgRef = firebase.storage().ref(this.state.file.name);
    imgRef.put(this.state.file).then((snapshot) => {
      imgRef.getDownloadURL().then((url) => {
        firebase
          .firestore()
          .collection("adds")
          .add({
            disc: this.state.disc,
            title: this.state.title,
            price: this.state.price,
            url,
            uid,
          })
          .then(function (docRef) {
            History.push("/Home");
            swal(
              "Your Add Is Live On Olx",
              "Hope Your Product Sell Soon",
              "success"
            );
          })
          .catch((error) => alert(error));
      });
    });
  };

  uploadImage = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Olx</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/myAdds">Features</Nav.Link>
            <Nav.Link href="/Sell">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>

        <div className="width">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Titile</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
              placeholder="Enter Product Title"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={this.state.price}
              onChange={this.handlePrice}
              placeholder="Product Price"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Discription</Form.Label>
            <Form.Control
              type="text"
              value={this.state.disc}
              onChange={this.handleDisc}
              placeholder="Product Discription"
            />
          </Form.Group>

          <input type="file" onChange={(event) => this.uploadImage(event)} />

          <br />
          <br />

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Enable Chatting" />
          </Form.Group>
          <Button variant="primary" onClick={this.postAdd} type="submit">
            Post
          </Button>
        </div>
      </div>
    );
  }
}
