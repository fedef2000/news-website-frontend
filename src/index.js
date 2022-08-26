import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './routes/Home';
import Articolo from './routes/articolo';
import Login from './routes/login';
import Post from './routes/post';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/articolo/:id" element={<Articolo />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
    </HelmetProvider>
  </React.StrictMode>
);
