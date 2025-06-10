import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "./Recipe.css"; 
const Header = () => {
  return (
    <Navbar expand="lg" className="shadow-sm py-3 bg-white sticky-top border-bottom">
  <Container>
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
      <img src={logo} alt="Logo" height="60" className="d-inline-block align-top me-2" style={{ objectFit: "contain" }}/>
      <span className="fw-bold fs-4 text-dark">Recipe Book</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav" className="justify-content-end">
      <Nav className="align-items-center">
        <Nav.Link as={Link} to="/" className="fw-medium px-3 text-dark">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/add-recipe" className="fw-semibold px-4 btn btn-outline-success rounded-pill">
          +Add Recipe
          </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default Header;
