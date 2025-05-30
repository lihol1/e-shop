import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/mainPage/HomePage";
import CategoryPage from "./components/categoryPage/CategoryPage";
import OrderPage from "./components/orderPage/OrderPage";
import SearchPage from "./components/searchPage/SearchPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="category/:categoryId" element={<CategoryPage />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="search" element={<SearchPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
