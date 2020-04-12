import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
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
