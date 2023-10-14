import React, { useContext, useState } from "react";
import { Cartcontext } from "../../context/Context";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const { state, dispatch } = useContext(Cartcontext);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const calculateTotal = () => {
    return state.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      // Simulate a request to a payment gateway
      const response = await makePayment({
        total: calculateTotal(),
        paymentMethod: shippingInfo.paymentMethod,
      });

      if (response.success) {
        // Payment was successful, you can update order status here
        // For example, send a request to your backend to record the order

        // Simulate clearing the cart after successful payment
        dispatch({ type: "CLEAR_CART" });

        console.log("Payment successful");
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("An error occurred during payment processing:", error);
    }
  };

  const makePayment = async (paymentData) => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        return { success: true, message: "Payment successful" };
      } else {
        return { success: false, message: "Payment failed" };
      }
    } catch (error) {
      console.error("Payment API error:", error);
      return { success: false, message: "Payment failed" };
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="shipping-info">
        <h2>Shipping Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={shippingInfo.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleInputChange}
        />
        <select
          name="paymentMethod"
          value={shippingInfo.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>
      <div className="cart-items"></div>
      <div className="total">
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button onClick={handleCheckout}>Complete Purchase</button>
      <NavLink to="/Cart">Back to Cart</NavLink>
    </div>
  );
};

export default Checkout;
