import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#e0ff9d] sm:px-8 px-38 py-12 border-b border-b-[#e6ebf4] h-16">
      <Link to="/">
        <img src={logo} alt="logo" className="w-48 object-contain" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#8fb534] text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#ffffe5] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
