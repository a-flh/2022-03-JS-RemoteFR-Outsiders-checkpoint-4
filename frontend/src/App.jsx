import Home from "@pages/Home";
import Favorites from "@pages/Favorites";
import Forum from "@pages/Forum";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainContextProvider } from "./contexts/MainContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mes-favoris" element={<Favorites />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
