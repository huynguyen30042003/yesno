import React from 'react'
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import StartGame from "./pages/StartGame/StartGame";
import Result from "./pages/Result/Result";
import Answer from "./pages/Answer/Answer";
import { useState, useEffect } from "react";

function App() {
  // const [list,setList] = useState('')


  return (
    <>
      <Routes>
        <Route path="/"  element={<Home></Home>} />
        <Route path="/home"  element={<Home></Home>} />
        <Route path="/start/:id"  element={<StartGame></StartGame>} />
        <Route path="/Answer" element={<Answer></Answer>} />
        <Route path="/Result" element={<Result></Result>} />
      </Routes>
    </>
  );
}

export default App;
