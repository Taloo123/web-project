import React, { useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Collapse, IconButton } from "@mui/material";
import Navbar from './navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Cart icon
import "../styles/Store.css"; // Link to CSS file
import { useNavigate } from "react-router-dom";
            

const Store = () => {
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartVisible, setCartVisible] = useState(false); // Track visibility of cart
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment", { state: { cart } });
  };

  const products = [
    {
      id: 1,
      name: "Sports Jersey",
      description: "High-quality, breathable sports jersey ideal for any sport. Available in various sizes and colors.",
      price: 2500,
      image: "/products/jersey.png"
    },
    {
      id: 2,
      name: "Football",
      description: "Durable and perfectly balanced football suitable for matches and training sessions.",
      price: 1500,
      image: "/products/download.jpeg",
    },
    {
      id: 3,
      name: "Tennis Racket",
      description: "Lightweight and sturdy tennis racket designed for both beginners and professionals.",
      price: 3500,
      image: "/products/download (2).jpeg",
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Comfortable and supportive running shoes with advanced cushioning for long-distance runs.",
      price: 5000,
      image: "/products/download (1).jpeg",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);  // Adding quantity to the product
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleDescription = (id) => {
    setSelectedProductId(selectedProductId === id ? null : id);
  };

  // Increase the quantity of an item in the cart
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease the quantity of an item in the cart
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible); // Toggle cart visibility
  };

  return (
    <div>
      <Navbar />
      <div className="store-container">
        <Container className="store-content">
          <Typography variant="h4" align="center" className="store-title">
            Sports Store
            <hr />
          </Typography>

          {/* Product Listings */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  className="product-card"
                  onClick={() => toggleDescription(product.id)}
                  style={{ cursor: "pointer" }}
                >
                   <CardMedia
  component="img"
  image={product.image}
  alt={product.name}
  style={{
    width: "100%",       // Fit the width of the container
    height: "100px",     // Set a fixed height for the frame
    objectFit: "contain" // Ensure the entire image is visible
  }}
/>
                  <CardContent>
                    <Typography variant="h6" className="product-title">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: Rs. {product.price}
                    </Typography>
                  </CardContent>
                  <Collapse in={selectedProductId === product.id}>
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <CardActions>
                    <Button
                      variant="contained"
                      backgroud-color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling description
                        addToCart(product);
                      }} 
                       className="str-btn"
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Cart Icon */}
      <IconButton
        color="default"
        onClick={toggleCartVisibility}
        style={{
          position: "absolute",
          top: "70px",
          right: "20px",
          zIndex: 1000
        }}
      >
        <ShoppingCartIcon style={{ fontSize: 40, color:"white"}} />
      </IconButton>

     {/* Cart Section */}
{cartVisible && (
  <div 
    className="cart-container" 
    style={{
      position: "fixed", 
      right: 0, 
      top: "100px", 
      padding: "20px", 
      width: "300px", 
      maxHeight: "calc(100vh - 160px)", // Ensure the container fits within the viewport
      overflowY: "auto" // Enable vertical scrolling
    }}
  >
    <Typography variant="h4" align="center">
      Shopping Cart
    </Typography>
    {cart.length === 0 ? (
      <Typography variant="body1" align="center">
        Your cart is empty
      </Typography>
    ) : (
      <Grid container spacing={2}>
        {cart.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card className="cart-item">
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Rs. {item.price}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeFromCart(item.id)}
                  className="btn-rem"
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
    <Typography variant="h6" align="center" className="total-price">
      Total: Rs. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className="str-btn"
      onClick={handleCheckout} // Redirect to payment page
    >
      Checkout
    </Button>
  </div>
      )}
    </div>
  );
};

export default Store;

