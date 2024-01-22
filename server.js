const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");
const userRoute = require("./routes/userRoute");
const roleRoutes = require("./routes/roleRoute");
const locationRoutes = require("./routes/LocationMaster");
const DepartmentGroupRoutes = require("./routes/DepartmentGroupMaster");
const DepartmentTypeRoutes = require("./routes/DepartmentType");
const EmployeeRolesRoutes = require("./routes/EmployeeRoleRoutes");
const EmployeeNamesRoutes = require("./routes/EmployeeNameRoutes");
const communityMaster=require('./routes/communitymaster')
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const protect = require("./middlewares/authMiddleware");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const User = require("./models/User");
const Oauth2strategy = require("passport-google-oauth2").Strategy
const app = express();
const port =  process.env.PORT || 5005;
const clientId = "754656440817-pu9uar2o5tkubv0g88nbvpb9vp8ffmrc.apps.googleusercontent.com"
const clientSecret = "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"
const redirectUri = 'http://localhost:3000/auth/google/callback';


app.use(session({
  secret:"youarebitch",
  resave:false,
  saveUninitialized:true
}))

app.use(passport.initialize());

// Configure Google OAuth strategy
passport.use(
  new Oauth2strategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUri,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in your database based on Google profile
      const user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // Create a new user if not found
        const newUser = new User({
          email: profile.emails[0].value,
          // Add other necessary fields
        });

        await newUser.save();
        return done(null, newUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// MIDDLEWARES
connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);




// ----------------------------------Define a custom morgan format ----------------------------------------
morgan.token("color-status", (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) {
    color = "\x1b[31m";
  } else if (status >= 400) {
    color = "\x1b[33m";
  } else if (status >= 300) {
    color = "\x1b[36m";
  } else {
    color = "\x1b[32m";
  }
  return color + status + "\x1b[0m";
});

const customFormat = ":method :url :color-status :response-time ms";


app.use(morgan(customFormat));


app.use(cors());
app.use("/uploads", express.static("./uploads"));



// Routes Middleware
app.use("/api", userRoute);
app.use("/api", roleRoutes);
app.use("/location", locationRoutes);
app.use("/departmentgroup", DepartmentGroupRoutes);
app.use("/departmenttype", DepartmentTypeRoutes);
app.use("/employeerole", EmployeeRolesRoutes);
app.use("/employeename", EmployeeNamesRoutes);
app.use("/communitymaster",communityMaster)



// ROUTES
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.listen(port, () => {
  console.log("Server Started on", port);
});
