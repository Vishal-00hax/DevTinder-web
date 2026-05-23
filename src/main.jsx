import { StrictMode } from 'react'
import './App.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <StrictMode>
     <div data-theme="dark">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App />} />
        
    </Routes>
    </BrowserRouter>
    </div>
  </StrictMode>,
);
