import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detailed from "./components/Detailed";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Detailed />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;