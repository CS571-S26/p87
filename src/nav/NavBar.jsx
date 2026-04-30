import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar(props) {
    return <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {/* <Navbar.Brand as={Link} to="/">
                <img
                    alt="Badger Buddies Logo"
                    src={crest}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Badger Buddies!
            </Navbar.Brand> */}
            <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/theater">Theater</Nav.Link>
                    <Nav.Link as={Link} to="/bios">Bios</Nav.Link>
                    <Nav.Link as={Link} to="/Getting_Started">Getting Started</Nav.Link>
                    <Nav.Link as={Link} to="/events_calendar">Calendar</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}
