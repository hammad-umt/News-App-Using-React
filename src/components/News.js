import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Loading from './Loading';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxPage = 5;

  const fetchArticles = async (currentPage) => {
    try {
      props.setProgress(10);
      setLoading(true);
      
      const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${currentPage}`;
      props.setProgress(30);
      
      const res = await fetch(url);
      props.setProgress(50);
      
      const data = await res.json();
      props.setProgress(70);

      if (data.articles) {
        setArticles(data.articles);
      } else {
        console.error("Invalid response from API:", data);
        setArticles([]);
      }

      setLoading(false);
      props.setProgress(100);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    fetchArticles(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const formattedCategory = props.category.charAt(0).toUpperCase() + props.category.slice(1).toLowerCase();
    document.title = `${formattedCategory} - NowCast`;
    return () => {
      document.title = 'NowCast';
    };
  }, [props.category]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < maxPage) setPage((prev) => prev + 1);
  };

  const formattedCategory = props.category.charAt(0).toUpperCase() + props.category.slice(1).toLowerCase();

  return (
    <>
      <h1 className="text-center my-4">NowCast - {formattedCategory}</h1>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Loading />
        </div>
      )}

      <div className="row">
        {!loading && articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItems
              title={element.title ? element.title.slice(0, 45) : "No Title Available"}
              description={element.description ? element.description.slice(0, 88) : "No Description Available"}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              publishedAt={element.publishedAt}
              source={element.source?.name || "Unknown"}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between my-3 sticky-bottom bg-white py-2 px-3 border-top">
        <button className="btn btn-dark" onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <button className="btn btn-dark" onClick={handleNext} disabled={page === maxPage}>
          Next
        </button>
      </div>
    </>
  );
}
