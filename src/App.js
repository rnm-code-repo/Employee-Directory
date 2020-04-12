import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Employee from "./components/Employee"
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Employee/>
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
