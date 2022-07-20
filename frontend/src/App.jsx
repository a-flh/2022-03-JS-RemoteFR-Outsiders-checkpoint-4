import Home from "@pages/Home";
import Favorites from "@pages/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainContextProvider } from "./contexts/MainContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/mes-favoris" element={<Favorites />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
