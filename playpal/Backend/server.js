const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// const MONGO_URI = "mongodb+srv://i221270:22i1270@webcluster.yt0z7.mongodb.net/?retryWrites=true&w=majority&appName=WebCluster";
const MONGO_URI = "mongodb+srv://i221270:22i1270@webcluster.yt0z7.mongodb.net/playpal?retryWrites=true&w=majority&appName=WebCluster";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 30000 // Optional: Increase timeout for slow networks
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  // Add Mongoose connection debugging
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

// Signup API route
app.post("/api/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    // return res.status(400).json({ message: "Passwords do not match" });
    alert("Passwords do not match");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Signin Route
app.post("/api/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      res.status(200).json({ message: "Sign In successful", user });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });