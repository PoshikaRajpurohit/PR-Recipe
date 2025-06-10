import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button,Spinner,Container,Card,Row,Col,Form,InputGroup,} from "react-bootstrap";
import { FaArrowLeft, FaEdit, FaTrash,FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, getAllRecipesAsync } from "../Services/Actions/Action";
import "./Recipe.css";

const ITEMS_PER_PAGE = 3;
const Home = () => {
  const { recipes, isLoading } = useSelector((state) => state.recipeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllRecipesAsync());
  }, [dispatch]);
  const handleChange = (setter) => (event) => {
  setter(event.target.value);
  setCurrentPage(1); 
};

  const handleEdit = (id) => navigate(`/edit-recipe/${id}`);
 const handleDelete = (id) => {
  alert("Recipe deleted successfully!");
  dispatch(deleteRecipe(id));
};
  const handleView = (id) => navigate(`/recipe/${id}`);
  const filteredRecipes = recipes.filter((recipe) =>
    filterCategory ? recipe.category === filterCategory : true
  );
const searchedRecipes = filteredRecipes.filter(recipe => {
  if (!recipe) return false; 
  const lowerSearch = searchTerm.toLowerCase();
  return (
    recipe.title.toLowerCase().includes(lowerSearch) ||
    recipe.desc.toLowerCase().includes(lowerSearch)
  );
});
  const sortedRecipes = [...searchedRecipes].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "cookTime") return (a.cookTime || 0) - (b.cookTime || 0);
    if (sortBy === "difficulty") {
      const order = { Easy: 1, Medium: 2, Hard: 3 };
      return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
    }
    return 0;
  });
  const totalPages = Math.ceil(sortedRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };
  return (
    <Container className="home-container mt-5">
      <h2 className="text-center fw-bold mb-4">🍽️ Recipe List</h2>
      <Row className="mb-4 align-items-center">
        <Col md={3} sm={6} className="mb-2">
          <Form.Select className="form-select" value={filterCategory} onChange={handleChange(setFilterCategory)}>
            <option value="">Filter by Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Snacks">Dinner</option>
            <option value="Dessert">Dessert</option>
          </Form.Select>
        </Col>
        <Col md={3} sm={6} className="mb-2">
          <Form.Select className="form-select" value={sortBy} onChange={handleChange(setSortBy)} >
            <option value="">Sort By</option>
            <option value="title">Title (A-Z)</option>
            <option value="cookTime">Cook Time (Asc)</option>
            <option value="difficulty">Difficulty (Easy to Hard)</option>
          </Form.Select>
        </Col>
        <Col md={3} sm={12}>
          <InputGroup>
            <Form.Control className="form-control" type="text" placeholder="Search by title or description" value={searchTerm} 
            onChange={handleChange(setSearchTerm)}/>
          </InputGroup>
        </Col>
      </Row>
      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : paginatedRecipes.length === 0 ? (
        <p className="text-center">No recipes found. Please add some!</p>
      ) : (
        <>
          <Row xs={1}  md={2} lg={3} className="g-4">
            {paginatedRecipes.map((recipe) => (
              <Col key={recipe.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" fluid src={recipe.image} alt={recipe.title} style={{ cursor: "pointer", height: "300px",
                   objectFit: "cover" }} onClick={() => handleView(recipe.id)}/>
                  <Card.Body>
                    <Card.Title className="card-title" onClick={() => handleView(recipe.id)} title={recipe.title}>
                      {recipe.title}
                    </Card.Title>
                    <Card.Text>
                      <small>
                        <strong>Cook Time:</strong> {recipe.cookTime || "N/A"} mins
                      </small>
                      <br />
                      <small>
                        <strong>Servings:</strong> {recipe.servings || "N/A"}
                      </small>
                      <br />
                      <small>
                        <strong>Category:</strong> {recipe.category}
                      </small>
                      <br />
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(recipe.id)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(recipe.id)}>
                      <FaTrash />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
              <Button variant="outline-success" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="me-2 mt-3">
              <FaArrowLeft />
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button key={i + 1} variant={currentPage === i + 1 ? "success" : "outline-success"} onClick={() => goToPage(i + 1)} 
                className="mx-1 mt-3">{i + 1}
                </Button>
              ))}
              <Button variant="outline-success" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} 
              className="ms-2 mt-3">
                <FaArrowRight />
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};
export default Home;
