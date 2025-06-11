import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Row, Col, Image, Container } from "react-bootstrap";
import { getRecipe } from "../Services/Actions/Action";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";

const ViewRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isMethodPage = location.pathname.includes("recipe-method");

  const { recipe } = useSelector((state) => state.recipeReducer);

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id, dispatch]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
    alert("You can edit your recipe.");
  };

  const handleDelete = () => {
    alert("Your Recipe has been deleted successfully!");
  };

  const ingredients = recipe?.ingredients?.split(",").map((i) => i.trim()) || [];

  const renderFormattedMethod = (methodText) => {
    const lines = methodText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line);

    const sections = [];
    let currentSection = { title: null, steps: [] };

    lines.forEach((line) => {
      if (line.endsWith(":")) {
        if (currentSection.title || currentSection.steps.length) {
          sections.push(currentSection);
        }
        currentSection = { title: line.slice(0, -1), steps: [] };
      } else {
        currentSection.steps.push(line);
      }
    });

    if (currentSection.title || currentSection.steps.length) {
      sections.push(currentSection);
    }

    return sections.map((section, sectionIndex) => (
      <div key={sectionIndex} className="mb-4">
        {section.title && (
          <h5 className="fw-bold text-capitalize mb-2">{section.title}</h5>
        )}
        {section.steps.map((step, i) => (
          <p key={i} className="method-step">
            <strong>{i + 1}.</strong> {step}
          </p>
        ))}
      </div>
    ));
  };

  if (!recipe)
    return (
      <div className="text-center py-5 fs-4 fw-semibold text-secondary">
        Loading...
      </div>
    );


  if (isMethodPage) {
    return (
      <Container className="py-4">
        <div className="d-flex align-items-center mb-4">
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="fs-4 fw-bold text-dark text-decoration-none p-0 me-2"
          >
            <FaArrowLeft />
          </Button>
          <h2 className="fw-bold mb-0">Method: {recipe.title}</h2>
        </div>

        <div className="method-section">{renderFormattedMethod(recipe.method)}</div>
      </Container>
    );
  }


  return (
    <div className="view-recipe-container my-5 mx-auto px-3 px-md-0">
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          className="fs-4 fw-bold text-dark text-decoration-none p-0 me-2"
        >
          <FaArrowLeft />
        </Button>
        <h2 className="fw-bold mb-0">{recipe.title}</h2>
      </div>

      <Row className="gx-5">
        <Col md={4}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            fluid
            rounded
            className="mb-4 shadow-sm view-recipe-image"
          />
          <div className="ingredients-list">
  <h5 className="mb-3 fw-semibold">Ingredients</h5>
  {(recipe?.ingredients
    ?.split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0) || []
  ).map((item, i) => (
    <p className="mb-1 ingredient-item" key={i}>
      <strong>•</strong> {item}
    </p>
  ))}
</div>

        </Col>

        <Col md={8}>
          <div className="method-section mb-4">
            <h5 className="fw-semibold mb-3">Method</h5>
            <p>
              {recipe.method.length > 200
                ? recipe.method.substring(0, 200) + "..."
                : recipe.method}
            </p>
            <Button
              variant="link"
              className="ps-0"
              onClick={() => navigate(`/recipe-method/${id}`)}
            >
              View Full Method
            </Button>
          </div>

          <div className="recipe-info">
            <h5 className="fw-semibold mb-3">Details</h5>
            <p className="mb-1">
              <strong>Category:</strong> {recipe.category}
            </p>
            <p className="mb-1">
              <strong>Cook Time:</strong> {recipe.cookTime} Minutes
            </p>
            <p className="mb-1">
              <strong>Servings:</strong> {recipe.servings}
            </p>
          </div>
        </Col>
      </Row>

      <div className="d-flex gap-3 mt-4 flex-wrap">
        <Button variant="danger" onClick={handleDelete}>
          Delete Recipe
        </Button>
        <Button variant="secondary" onClick={handleEdit}>
          Edit Recipe
        </Button>
      </div>
    </div>
  );
};

export default ViewRecipe;



