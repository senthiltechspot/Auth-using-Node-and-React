import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function FetchDataFromAPI(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((Data) => setData(Data.results));
  }, [url]);
  return data;
}

const Collection = () => {
  const result = FetchDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon/?limit=100"
  );
  const navigate = useNavigate();

  function NavigateToPoke(name) {
    navigate(`/Card/${name}`);
  }
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };
  console.log(result && result);
  // https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg
  return (
    <div>
    <div className="d-flex flex-wrap justify-content-evenly gap-3">
      {result.map((e, i) => (
        <div key={i}>
          <div
            key={i}
            className="card"
            style={{ width: "18rem", backgroundColor: randColor() }}
          >
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                i + 1
              }.svg`}
              className="card-img-top p-3"
              alt="..."
              width={"20px"}
              height="150px"
            />
            <div className="card-body">
              <h5 className="card-title" style={{textShadow:"0 0 6px #FFFFFF"}} > {e.name.toUpperCase()}</h5>
              <button
                className="btn btn-primary"
                onClick={() => {
                  NavigateToPoke(e.name);
                }}
              >
                For More Details
              </button>
            </div>
          </div>
         
        </div>
      ))}
    </div>

    </div>
  );
};

export default Collection;