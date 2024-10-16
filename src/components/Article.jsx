import { useEffect, useState } from "react";
import { Spin } from "antd";
import "./App.css";

function Article() {
  // const [datas, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  function nextPage() {
    setCount(count + 1);
  }
  function prevPage() {
    setCount(count - 1);
  }

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch("https://dummyjson.com/posts/" + count)
        .then((res) => res.json())
        .then((data) => setArticle(data));
      setLoading(false);
    }, 200);
  }, [count]);

  return (
    <div className="app">
      {loading ? (
        <div
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" tip="loading..." spinning="" />
        </div>
      ) : (
        <div className="article">
          <h3>{article.title}</h3>
          <p>{article.body}</p>
        </div>
      )}
      <div>
        <button onClick={prevPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
      <div className="page">
        <p>page : {count}</p>
      </div>
    </div>
  );
}

export default Article;
