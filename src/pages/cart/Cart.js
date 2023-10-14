import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Cart.css";
import { NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    const total = state.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setAmounts(total);
  }, [state]);

  const handleSubmitPay = (e) => {
    e.preventDefault();
    if (amounts === "") {
      alert("Please Enter amount");
    } else {
      const amountInPaise = parseFloat(amounts) * 100;
      let details = {
        key: "rzp_test_mlKgzvXdbN4DTl",
        key_secret: "1WVxmJEdXT3Y8lPdIlkAgv7E",
        amount: amountInPaise,

        currency: "INR",
        name: "Shoping",
        descreption: "parchasing products",
        image: "",
        handler: function (response) {
          alert("PAYMENT ID : " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Vishnusharma",
          email: "bandarivishnusharmi9043@gmail.com",
          contact: "8465092829",
        },
        notes: {
          address: "Hyderabad",
        },
        theme: {
          color: "green",
        },
      };
      let pay = new window.Razorpay(details);
      pay.open();
      console.log(pay);
    }
  };
  return (
    <div className="container">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand">
            <NavLink to="/">
              <i className="bi bi-house-door-fill house"></i>
            </NavLink>
          </p>
          <h4 style={{ color: "blue" }}>shoping cart</h4>
          <form class="d-flex">
            <NavLink to="/cart">
              <i className="bi bi-cart4 cartIcon" style={{ color: "red" }}></i>
            </NavLink>
          </form>
        </div>
      </nav>
      {/* {state.map((item, index) => {
        return (
          <div className="cards" key={index}>
            <img
              src={item.image}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
            <p>{item.title}</p>
            <p>
              <b>Price :</b>
              {item.quantity * item.price}
            </p>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => dispatch({ type: "INCREASE", payload: item })}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    dispatch({ type: "DECREASE", payload: item });
                  } else {
                    dispatch({ type: "REMOVE", payload: item });
                  }
                }}
              >
                -
              </button>
            </div>
            <h2 onClick={() => dispatch({ type: "REMOVE", payload: item })}>
              <i class="bi bi-trash3"></i>
            </h2>
          </div>
        );
      })} */}

      <div className="">
        {state.map((item, index) => {
          return (
            <div className="card mb-3" key={index}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    alt=""
                    className="img-fluid rounded-start"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      <b>Price:</b> ${(item.quantity * item.price).toFixed(2)}
                    </p>
                    <div className="d-flex">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: item })
                        }
                      >
                        <b>+</b>
                      </button>
                      <p className="mx-2">
                        <b>{item.quantity}</b>
                      </p>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({ type: "DECREASE", payload: item });
                          } else {
                            dispatch({ type: "REMOVE", payload: item });
                          }
                        }}
                      >
                        <b>-</b>
                      </button>
                    </div>
                    <h2
                      className="text-danger mt-2"
                      onClick={() =>
                        dispatch({ type: "REMOVE", payload: item })
                      }
                    >
                      <i className="bi bi-trash"></i>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {state.length > 0 && (
        <div className="total">
          <h2>Total amount : {amounts}</h2>

          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Checkout
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    delivery address
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form
                    class="row g-3 needs-validation"
                    novalidate
                    onSubmit={handleSubmitPay}
                  >
                    <div class="col-md-4">
                      <label for="validationCustom01" class="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        required
                      />
                      <div class="valid-feedback">Looks good!</div>
                    </div>
                    <div class="col-md-4">
                      <label for="validationCustom02" class="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom02"
                        required
                      />
                      <div class="valid-feedback">Looks good!</div>
                    </div>
                    <div class="col-md-4">
                      <label for="validationCustomUsername" class="form-label">
                        enter email
                      </label>
                      <div class="input-group has-validation">
                        <input
                          type="email"
                          class="form-control"
                          id="validationCustomEmail"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div class="invalid-feedback">
                          Please choose a email.
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label for="validationCustom03" class="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom03"
                        required
                      />
                      <div class="invalid-feedback">
                        Please provide a valid city.
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label for="validationCustom04" class="form-label">
                        State
                      </label>
                      <select
                        class="form-select"
                        id="validationCustom04"
                        required
                      >
                        <option selected disabled value="">
                          select
                        </option>
                        <option>Ap</option>
                        <option>Ts</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label for="validationCustom05" class="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom05"
                        required
                      />
                      <div class="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label class="form-check-label" for="invalidCheck">
                          Agree to terms and conditions
                        </label>
                        <div class="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-success" type="submit">
                        Confirm and Pay
                      </button>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
