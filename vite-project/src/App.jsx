import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form/Form'
import List from './components/List/List'
import { Link } from 'react-router-dom' 
import './App.css' 

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>

      <Link to="/list"><button className='user-list-button'>User List</button></Link>
    </div>
  )
}

export default App