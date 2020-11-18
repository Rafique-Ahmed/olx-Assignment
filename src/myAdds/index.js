import "../Home/style.css";
import db from "../fire";
import React from "react";
import { Button, Navbar, FormControl, Nav, Form } from "react-bootstrap";

export default class Home extends React.Component {
  state = {
    adds: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    let uid = await localStorage.getItem("uid");
    let arr = [];
    db.collection("adds")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ adds: arr });
      })
      .catch((error) => console.log(error));
  };

  deleteAdd = (id) => {
    db.collection("adds")
      .doc(id)
      .delete()
      .then(() => console.log("Document successfully deleted!"))
      .catch((error) => console.error(error));
  };

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
        </Navbar>

        <div className="postsView">
          {this.state.adds.map((item, index) => {
            console.log("Home -> render -> item", item);
            return (
              <div className="addscontainer">
                <img src={item.url} width="200px" />
                <h3>Title: {item.data.title}</h3>
                <h2>Rs. {item.data.price}</h2>
                <p>Detail: {item.data.disc}</p>
                <button onClick={() => this.deleteAdd(item.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
