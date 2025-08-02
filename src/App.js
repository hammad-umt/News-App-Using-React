import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

function App() {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);

  const categories = [
    { path: '/', category: 'general' },
    { path: '/general', category: 'general' },
    { path: '/business', category: 'business' },
    { path: '/entertainment', category: 'entertainment' },
    { path: '/health', category: 'health' },
    { path: '/science', category: 'science' },
    { path: '/sports', category: 'sports' },
    { path: '/technology', category: 'technology' }
  ];

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

        <Routes>
          {categories.map(({ path, category }) => (
            <Route
              key={category}
              path={path}
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key={category}
                  pageSize={pageSize}
                  country="us"
                  category={category}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;