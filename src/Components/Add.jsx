import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Form, Card, Row, Col, Alert } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router-dom";
import { addNewRecipe } from "../Services/Actions/Action";
import "./Recipe.css";
const AddRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    title: "",
    desc: "",
    ingredients: "",
    method:" ",
    cookTime: "",
    difficulty: "",
    servings: "",
    category: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
    const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };
  const validate = () => {
    const errors = {};
    if (!inputForm.title) errors.title = "Title is required.";
    if (!inputForm.desc) errors.desc = "Description is required.";
    if (!inputForm.ingredients) errors.ingredients = "Ingredients are required.";
    if (!inputForm.method) errors.method = "Method is required.";
    if (!inputForm.cookTime || isNaN(inputForm.cookTime) || Number(inputForm.cookTime) <= 0)
      errors.cookTime = "Cook time must be a positive number.";
    if (!inputForm.servings || isNaN(inputForm.servings) || Number(inputForm.servings) <= 0)
      errors.servings = "Servings must be a positive number.";
    if (!inputForm.difficulty) errors.difficulty = "Select difficulty level.";
    if (!inputForm.category) errors.category = "Select a category.";
    if (!inputForm.image) {
      errors.image = "Image URL is required.";
    } 
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const id = generateUniqueId({ length: 6, useLetters: false });
    const RecipeForm = {
      ...inputForm,
      id
    };
    dispatch(addNewRecipe(RecipeForm));
    setInputForm(initialState);
    setErrors({});
    navigate("/");
  };
  return (
  <Container className="add-recipe-container">
    <Card className="recipe-card mt-3">
      <h3 className="title">Add a New Recipe</h3>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="add-recipe-error">
          Please fix the highlighted errors.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={inputForm.title} onChange={handleChanged} isInvalid={!!errors.title} 
          placeholder="Enter recipe title"/>
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="desc" rows={3} value={inputForm.desc} onChange={handleChanged} isInvalid={!!errors.desc} 
          placeholder="Enter recipe description" />
          <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control as="textarea" name="ingredients" rows={3} value={inputForm.ingredients} onChange={handleChanged} 
              isInvalid={!!errors.ingredients} placeholder="Comma-separated ingredients (e.g. Sugar, Flour)"/>
              <Form.Control.Feedback type="invalid">{errors.ingredients}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Method</Form.Label>
              <Form.Control as="textarea" name="method" rows={3} value={inputForm.method} onChange={handleChanged} isInvalid={!!errors.method} 
              placeholder="How it is made" />
              <Form.Control.Feedback type="invalid">{errors.method}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cook Time (mins)</Form.Label>
              <Form.Control type="number" name="cookTime" value={inputForm.cookTime} onChange={handleChanged} isInvalid={!!errors.cookTime}/>
              <Form.Control.Feedback type="invalid">{errors.cookTime}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Servings</Form.Label>
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
        <Form.Group className="mb-4">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={inputForm.image} onChange={handleChanged} isInvalid={!!errors.image} 
          placeholder="image url"/>
          <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
        </Form.Group>
        <div className="text-center mt-4">
          <Button  type="submit" className="submit-btn">Add Recipe</Button>
        </div>
      </Form>
    </Card>
  </Container>
);
};
export default AddRecipe;


