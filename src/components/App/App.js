import React from "react";
import Header from "./../Header/Header";
import Main from "./../Main/Main";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}
