import React, {  useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropDown";
import API from "../utils/API";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaBeer } from "react-icons/fa";
import "./styles.css";


function Home() {
  

  const [q, setQ] = useState();
  const [beer_name, setbeer_name] = useState()
  const [beer_label, setLabel] =
  useState()
  const [beer_description, setDescription] = useState() 

  //handleInputChange = (event) => {

  const handleFormSubmit = (e) => {

    
       console.log()
      API.getBeers(q)

      var retrievedObject = localStorage.getItem('beersearch');

      const obj = JSON.parse(retrievedObject);
      

 
  var beerObject = {
    beername:obj.data.response.beers.items[0].beer.beer_name,
    beer_label: obj.data.response.beers.items[0].beer.beer_label,
    beer_description: obj.data.response.beers.items[0].beer.beer_description
  

  }
   setbeer_name(beerObject.beername)
   setLabel(beerObject.beer_label)
   setDescription(beerObject.beer_description)
  };

  return (
    <Container>
      <Row>
        <Col lg>
          <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="#home">
              {" "}
              <h2>
                <FaBeer size={30} />
                BeerGeenie
              </h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div>
          <label for="destinationInput">Destination</label>
          <input
            type="text"
            class="form-control"
            id="destinationInput"
            name="destination"
            value={q}
            placeholder="Destination"
            onChange = { e => setQ(e.target.value)}
            required
          />
        </div>
                <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
              
            </Navbar.Collapse>
          </Navbar>
        <div>
          <div>{beer_name}</div>
          <div><img src = {beer_label}></img></div>
          <div>{beer_description}</div>
      </div>
        </Col>
      </Row>
    </Container>
  );
  }
export default Home;
