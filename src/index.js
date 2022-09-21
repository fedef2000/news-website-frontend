import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './routes/home/Home';
import Articolo from './routes/articolo/articolo';
import Login from './routes/login/login';
import Tag from './routes/tag/tag';
import Post from './routes/post/post';
import Delete from './routes/delete/delete';
import Update from './routes/update/update';
import ChiSono from './routes/others/ChiSono';
import Contact from './routes/others/Contact'
import Donation from './routes/others/Donation'
import Search from './routes/search/Search'
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:titleUrl" element={<Articolo />}/>
        <Route path="/tag/:tag" element={<Tag />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/update" element={<Update />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chi-sono" element={<ChiSono />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offrici-una-paglia" element={<Donation />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Pagina non trovata</p>
              <button>Torna alla home</button>
            </main>
          }
        />
      </Routes>
    </Router>
    </HelmetProvider>
  </React.StrictMode>
);
