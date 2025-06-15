import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Investimentos from "./pages/Investimentos";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/investimentos" element={<Investimentos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
