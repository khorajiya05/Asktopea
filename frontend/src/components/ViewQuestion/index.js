import React from 'react'
import '../Asktopea/CSS/index.css'
import Sidebar from '../Asktopea/Sidebar'
import MainQuestion from './MainQuestion'
import './index.css';

function index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
         <MainQuestion />
      </div>
    </div>
  )
}

export default index
