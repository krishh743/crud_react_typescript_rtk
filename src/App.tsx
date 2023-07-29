import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {Route, Routes} from 'react-router';
import Create from './components/Create';
import EditComponents from './components/EditComponents';
import AllList from './components/AllList';

function App() {

const onSubmit = (formData: any) => {
  console.log(formData, "formData");
};

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/alldetails" element={<AllList />}></Route>
        <Route path="/create" element={<Create onSubmit={onSubmit} />}></Route>
        <Route path="/edit/:id" element={<EditComponents />}></Route>
      </Routes>
    </div>
  );
}

export default App;
