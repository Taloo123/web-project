import React, { useState } from "react";
import { TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, Card, CardContent, Typography, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import "../styles/payment.css";

const Payment = () => {
  const { state } = useLocation(); // Get cart data passed from store page
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
    paymentMethod: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: ""
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cart = state?.cart || []; // Default to an empty array if no cart is passed

  // Handle form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle payment form submission
  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.address || !formData.postalCode) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (isNaN(formData.postalCode)) {
      setErrorMessage("Postal code should be numeric.");
      return;
    }

    if (formData.paymentMethod === "card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV)) {
      setErrorMessage("Please fill in card details.");
      return;
    }

    setErrorMessage(""); // Reset error message
    setPaymentSuccess(true); // Show payment success alert
  };

  // Calculate total price of cart items
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Navbar />
      <div className="pay-container">
        <div className="pay-content">
          <Typography variant="h4" align="center" className="pay-title">Payment Page</Typography>

          {/* Show Success Payment Alert */}
          {paymentSuccess && (
            <Alert severity="success" style={{ marginBottom: "20px" }}>
              Payment Successful!
            </Alert>
          )}

          {/* Show Error Message */}
          {errorMessage && (
            <Alert severity="error" style={{ marginBottom: "20px" }}>
              {errorMessage}
            </Alert>
          )}

          {/* Order Summary */}
          <Card style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <div>
                {cart.map((item, index) => (
                  <div key={index}>
                    <Typography variant="body2">{item.name} - {item.quantity} x Rs. {item.price}</Typography>
                  </div>
                ))}
              </div>
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                Total: Rs. {calculateTotal()}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <form onSubmit={handlePaymentSubmit}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ marginBottom: "15px" }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ marginBottom: "15px" }}
                />

                {/* Address Field */}
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ marginBottom: "15px" }}
                />

                {/* Postal Code Field */}
                <TextField
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  style={{ marginBottom: "15px" }}
                />

                {/* Payment Method Radio Buttons */}
                <FormControl component="fieldset" style={{ marginBottom: "15px" }}>
                  <RadioGroup
                    row
                    aria-label="payment-method"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                    <FormControlLabel value="card" control={<Radio />} label="Card Payment" />
                  </RadioGroup>
                </FormControl>

                {/* Card Details (only shown for card payment) */}
                {formData.paymentMethod === "card" && (
                  <div>
                    <TextField
                      fullWidth
                      label="Card Number"
                      variant="outlined"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                    />
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      variant="outlined"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                    />
                    <TextField
                      fullWidth
                      label="CVV"
                      variant="outlined"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginBottom: "10px" }}
                  className="pay-button"
                >
                  Proceed to Payment
                </Button>

                {/* Continue Shopping Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  href="/store/"
                  className="pay-button1"
                >
                  Continue Shopping
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
