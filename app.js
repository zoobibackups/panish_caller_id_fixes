require("rootpath")();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/_middleware/error-handler");
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));


app.use(bodyParser.urlencoded({ extended: false,limit:'150mb' }));
app.use(bodyParser.json({limit: '150mb'}));
app.use(cookieParser());

// api routes
app.use("/", require("./src/controllers/index.controller"));

app.use("/users", require("./src/controllers/users.controller"));
app.use("/categories", require("./src/controllers/categories.controller"));
app.use("/countries", require("./src/controllers/countries.controller"));
app.use("/user_friends", require("./src/controllers/users_friends.controller"));
const number_search = require("./src/services/number_search.service");
app.use(
  "/business_profile",
  require("./src/controllers/user_business_profile.controller")
);
app.use(
  "/user_social_link",
  require("./src/controllers/user_social_link.controller")
);
app.use("/working_days", require("./src/controllers/working_days.controller"));
app.use("/spam_report", require("./src/controllers/spam_report.controller"));
app.use(
  "/number_name_suggestion",
  require("./src/controllers/number_name_suggestion.controller")
);
app.use("/network", require("./src/controllers/network.controller"));

app.use("/profileviews", require("./src/controllers/profileviews.controller"));
app.use("/search", require("./src/controllers/number_search.controller"));
 app.use("/upload_image", require("./src/controllers/images.controller"));
//
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
app.listen(port, () => console.log("Server listening on port " + port));
