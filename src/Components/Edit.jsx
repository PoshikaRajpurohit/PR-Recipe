import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "../Services/Actions/Action";
import './Recipe.css'
const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe } = useSelector((state) => state.recipeReducer);
  const [inputForm, setInputForm] = useState({
    id: "",
    title: "",
    desc: "",
    ingredients: "",
    method: "",
    cookTime: "",
    difficulty: "",
    servings: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (id) dispatch(getRecipe(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (recipe) {
      setInputForm(recipe);
    }
  }, [recipe]);
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };
  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title) newErrors.title = "Title is required.";
    if (!inputForm.desc) newErrors.desc = "Description is required.";
    if (!inputForm.ingredients) newErrors.ingredients = "Ingredients are required.";
    if (!inputForm.method) newErrors.method = "Method is required.";
    if (!inputForm.cookTime || inputForm.cookTime <= 0) newErrors.cookTime = "Enter valid cook time.";
    if (!inputForm.servings || inputForm.servings <= 0) newErrors.servings = "Enter valid servings.";
    if (!inputForm.difficulty) newErrors.difficulty = "Please select difficulty.";
    if (!inputForm.category) newErrors.category = "Please select category.";
    if (!inputForm.image) newErrors.image = "Valid image URL required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateRecipe(inputForm));
      alert("Recipe updated successfully!..")
      navigate("/");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 container" 
    style={{ background: "linear-gradient(to right, #fffaf0, #fff0e6)" }}>
      <Card className="recipe-card w-100 mt-3" style={{ maxWidth: "800px" }}>
        <h3 className="title">Edit Recipe</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={inputForm.title} onChange={handleChanged} isInvalid={!!errors.title}/>
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="desc" rows={3} value={inputForm.desc} onChange={handleChanged} isInvalid={!!errors.desc}/>
            <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Ingredients</Form.Label>
                <Form.Control as="textarea" name="ingredients" rows={3} value={inputForm.ingredients} onChange={handleChanged} 
                isInvalid={!!errors.ingredients} placeholder="Comma-separated ingredients (e.g. Sugar, Flour)"/>
                <Form.Control.Feedback type="invalid">{errors.ingredients}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Method</Form.Label>
                <Form.Control as="textarea" name="method" rows={3} value={inputForm.method} onChange={handleChanged} 
                isInvalid={!!errors.method} placeholder="How it is made"/>
                <Form.Control.Feedback type="invalid">{errors.method}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Cook Time (mins)</Form.Label>
                <Form.Control type="number" name="cookTime" value={inputForm.cookTime} onChange={handleChanged} isInvalid={!!errors.cookTime}/>
                <Form.Control.Feedback type="invalid">{errors.cookTime}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Servings</Form.Label>
                <Form.Control type="number" name="servings" value={inputForm.servings} onChange={handleChanged} isInvalid={!!errors.servings}/>
                <Form.Control.Feedback type="invalid">{errors.servings}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select name="difficulty" value={inputForm.difficulty} onChange={handleChanged} isInvalid={!!errors.difficulty}>
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.difficulty}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={inputForm.category} onChange={handleChanged} isInvalid={!!errors.category}>
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Snacks">Dinner</option>
                  <option value="Dessert">Dessert</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" value={inputForm.image} onChange={handleChanged} isInvalid={!!errors.image}/>
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Form.Group>
          <div className="text-center">
            <Button type="submit" className="submit-btn">Update Recipe</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default EditRecipe;

