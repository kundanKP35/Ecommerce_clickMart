const app = require("./app");
const { path } = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Configure
    require("dotenv").config({path:"backend/config/config.env"});        

// Connecting to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "production") {
    // Set the static folder to serve frontend build files
    app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  
    // Serve the index.html file for all routes
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
    );
  }


const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`);

    server.close( () => {
        process.exit(1);
    });
});