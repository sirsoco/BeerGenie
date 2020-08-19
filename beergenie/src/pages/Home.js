import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import API from "../utils/API";

class Home extends Component {
  state = {
    beers: [],
    q: "",
    message: "Search for a Beer",
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState3({
      [name]: value,
    });
  };

  getBeers = () => {
    API.getBeers(this.state.q)
      .then((res) =>
        this.setState({
          beers: res.data,
        })
      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No beers found, Try again",
        })
      );
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.getBeers();
  };

  handleBeerSAve = (id) => {
    const beer = this.state.beers.find((beer) => beer.id === id);

    API.saveBeer({
      beerName: beer.name,
      beerData: beer.beerData,
    }).then(() => this.getBeers());
  };
  render() {
    return (
      <>
        <Navbar bg="light">
          <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        </Navbar>
        <br />
        <Navbar bg="light">
          <Navbar.Brand>Brand text</Navbar.Brand>
        </Navbar>
        <br />
        <Navbar bg="dark">
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar>
        <br />
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
        </Navbar>
      </>
    );
  }
}

export default Home; 
