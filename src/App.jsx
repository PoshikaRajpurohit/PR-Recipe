import './App.css'
import { Route, Routes } from 'react-router';
import Header from './Components/Header';
import Home from './Components/Home';;
import NotFound from './Components/Notfound';
import AddRecipe from './Components/Add';
import EditRecipe from './Components/Edit';
import ViewRecipe from './Components/View';


function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/edit-recipe/:id' element={<EditRecipe />} />
        <Route path='/recipe/:id' element={<ViewRecipe />} />
        <Route path="/recipe-method/:id" element={<ViewRecipe />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;