import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import CategoryPage from './components/CategoryPage';
import OrderPage from './components/OrderPage';
import SearchPage from './components/SearchPage';

function App(){
  return (
    <>     
      <Routes>
        <Route path="/" element={<Layout />} >          
          <Route index element={<HomePage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} /> 
          <Route path="order" element={<OrderPage />} />
          <Route path="search" element={<SearchPage />} /> 
        </Route> 
      </Routes> 
    </>
  )
}

export default App
