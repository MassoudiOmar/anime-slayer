import Home from "./compopnents/Home/Home";
import Popular from "./compopnents/Popular/Popular";
import Tips from './compopnents/Tips/Tips'
import Details from './compopnents/Details/Details'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="Popular" element={<Popular />} />
          <Route path="Manga" element={<Tips />} />
          <Route path="Details" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
