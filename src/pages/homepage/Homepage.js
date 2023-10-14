import { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Cartcontext } from "../../context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  const cartItemsCount = Globalstate.state.length;

  const handleCategoryChange = (selectedCategory) => {
    setCategoryFilter(selectedCategory);
  };

  const handlePriceChange = (selectedPrice) => {
    setPriceFilter(selectedPrice);
  };
  const handleRatingChange = (selectedRating) => {
    setRatingFilter(parseInt(selectedRating));
  };
  const filteredData = data.filter((item) => {
    const price = parseFloat(item.price);
    return (
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (priceFilter === "all" || price <= parseFloat(priceFilter)) &&
      (ratingFilter === 0 || item.rating.rate <= ratingFilter)
    );
  });

  return (
    <div className="container subtle">
      <div>
        <nav class="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <div class="container-fluid">
            <p class="navbar-brand">
              <NavLink to="/">
                <i className="bi bi-house-door-fill house"></i>
              </NavLink>
            </p>
            <h4 style={{ color: "orange" }}>Shop Hub</h4>
            <form class="d-flex">
              <NavLink to="/cart">
                <i
                  className="bi bi-cart4 cartIcon"
                  style={{ color: "dodgerblue" }}
                ></i>
                {cartItemsCount > 0 && (
                  <span className="badge badge-danger" style={{ color: "red" }}>
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>
            </form>
          </div>
        </nav>
      </div>
      <div className="filters" style={{ display: "flex" }}>
        <div className="filter" style={{ flex: "1" }}>
          <h6>Filter by Category</h6>
          <select onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div className="filter" style={{ flex: "1" }}>
          <h6>Filter by Price</h6>
          <select onChange={(e) => handlePriceChange(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="20">less $20</option>
            <option value="50">less $50</option>
            <option value="100">less $100</option>
          </select>
        </div>
        <div className="filter" style={{ flex: "1" }}>
          <h6>Filter by Rating</h6>
          <select onChange={(e) => handleRatingChange(e.target.value)}>
            <option value="0">All Ratings</option>
            <option value="1">below 1 star</option>
            <option value="2">below 2 star</option>
            <option value="3">below 3 star</option>
            <option value="4">below 4 star</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
      <br />
      <hr />

      <div>
        <div className="container">
          <div className="row">
            {filteredData.map((item, index) => {
              item.quantity = 1;

              return (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4">
                    <img
                      src={item.image}
                      alt=""
                      className="card-img-top"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div className="card-body">
                      <p className="card-title">{item.title}</p>
                      <p className="card-text" style={{ fontWeight: "bold" }}>
                        Price: $ <span className="pcolor">{item.price}</span>
                      </p>
                      <p className="card-text">
                        <b>Rating: </b>
                        <span className="rate">{item.rating.rate}</span>
                      </p>
                      <button
                        className="btn btn-info"
                        onClick={() => dispatch({ type: "ADD", payload: item })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="bg-light text-center text-lg-start">
        <div class="text-center p-3" style={{ backgroundColor: "gray" }}>
          © 2023 shoping website:
          <a class="text-dark">
            <i class="bi bi-instagram" style={{ paddingLeft: "10px" }}></i>
            <i class="bi bi-linkedin" style={{ paddingLeft: "10px" }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
