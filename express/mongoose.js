const mongoose = required("mongoose");

mongoose.connection.on("error", (error) => {
  console.log("mongodb connection failed!", error.message);
});

const startMongoDB = () => {
  mongoose.connect(
    "mongodb+srv://msv00:qwer@1234@msvdatabase.omramku.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbname: "MsvDataBase",
    }
  );
};
module.exports = startMongoDB;
