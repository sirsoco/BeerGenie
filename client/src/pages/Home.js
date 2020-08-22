import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropDown'
import API from '../utils/API';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { FaBeer } from 'react-icons/fa';
import './styles.css'



class Home extends Component {
  state = {
    beers: [],
    q: "",
    message: "Search for a Beer",
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
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

  handleBeerSave = (id) => {
    const beer = this.state.beers.find((beer) => beer.id === id);

    API.saveBeer({
      beerName: beer.name,
      beerData: beer.beerData,
    }).then(() => this.getBeers());
  };
  render() {
    return (
 <Container>
  <Row>
    <Col lg>
    <Navbar bg="dark" expand="lg">
  <Navbar.Brand href="#home"> <h2><FaBeer size={30} />BeerGeenie</h2></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline handleInputChange ={this.handleInputChange} handleFormSubmit ={this.handleFormSubmit}
    q={this.state.q}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button onClick = {console.log("hello")} variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

 
  </Col>
  </Row>
</Container>
        
    );
  }
}

export default Home; 
