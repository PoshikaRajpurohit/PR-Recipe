import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="notfound-container d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
      <p className="lead mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Button variant="primary" size="lg" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </Container>
  );
};
export default NotFound;

