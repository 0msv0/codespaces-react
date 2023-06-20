const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://root:sadegh_1234@msvdatabase.6xvzm3c.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increase the timeout to 10 seconds
    dbName: "MsvDataBase",
  }
);

// Create a MongoDB schema for registration
const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
});

// Create a MongoDB model for registration
const Registration = mongoose.model("Registration", registrationSchema);

// Parse JSON bodies
app.use(express.json());

// Validate registration form data
const validateRegistration = (data) => {
  const errors = {};
  if (!data.firstName || data.firstName.trim() === "") {
    errors.firstName = "First name is required";
  }
  if (!data.lastName || data.lastName.trim() === "") {
    errors.lastName = "Last name is required";
  }
  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!data.address || data.address.trim() === "") {
    errors.address = "Address is required";
  }
  return errors;
};

// Handle registration form submission
app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const errors = validateRegistration(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const registration = new Registration({
    firstName,
    lastName,
    email,
    address,
  });
  console.log("a");
  registration.save().then((success, reject) => {
    console.log(success, reject);
    if (reject) {
      return res.status(500).json({ error: "Failed to save registration" });
    }
    if (success) {
      return res
        .status(200)
        .json({ message: "Registration saved successfully" });
    }
  });
});

app.get("/api/registrations", (req, res) => {
  Registration.find().then((registrations, err) => {
    if (err) {
      console.error("Error fetching registrations:", err);
      return res.status(500).json({ error: "Failed to fetch registrations" });
    }

    return res.status(200).json(registrations);
  });
});

// Start the server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
