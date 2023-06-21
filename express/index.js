const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URL =
  "mongodb+srv://root:sadegh_1234@msvdatabase.6xvzm3c.mongodb.net/?retryWrites=true&w=majority";
const PORT = 3001;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    dbName: "MsvDataBase",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

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

app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const errors = validateRegistration(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const registration = new Registration({
      firstName,
      lastName,
      email,
      address,
    });
    await registration.save();
    return res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Failed to signup" });
  }
});

app.get("/api/get-user-list", async (req, res) => {
  const search = req.query.search;

  try {
    const searchQuery = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const registrations = await Registration.find(searchQuery);
    return res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
