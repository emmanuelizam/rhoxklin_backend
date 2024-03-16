const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mysql = require("mysql2/promise");
const flash = require("express-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// opens a global connection that can be used in any module
require("dotenv").config(); // to use process.env.VARIABLE_NAME

const db = require("./models/index.js");
const { passport, generateToken } = require("./middlewares/security.js")(
  db.Staff
);

const app = express();

const cors_options = {
  origin: "http://localhost:3000",
};

// setting up logger
app.use(logger("combined"));

// configure to parse request of content-type application/json
app.use(express.json());

// configure to parse request of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// configure cors
app.use(cors(cors_options));

// configure cookie parser
app.use(cookieParser());

const {
  MySQLSessionStoreOptions,
  MySQLConnectionOptions,
} = require("./config/db.config.js");

const mysqlConnection = mysql.createPool(MySQLConnectionOptions);

const sessionStore = new MySQLStore(MySQLSessionStoreOptions, mysqlConnection);

// configure session and login
app.use(
  session({
    secret: ["my first secret", "my second secret"],
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  })
);

// set up passport
app.use(passport.initialize()); // 'user' is the property on req that will be set to the authenticated user object
app.use(passport.session()); //this middleware will populate req.user with the current user

// set up flash messages
app.use(flash());

//login route
app.post(
  "/protected-api/login",
  passport.authenticate("local", {
    successFlash: true,
    successMessage: "successfully authenticated",
    failureFlash: true,
    failureMessage: "authentication failed",
    session: true,
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.status(200).json({ token: token, user: req.user });
    } catch (error) {
      console.log(error);
    }
  }
);

// logout route
app.get("/api/logout", (req, res) => {
  req.logout({}, (e) => {
    console.log(e);
  });
  res.redirect("/api/login");
});

// configure routes

const [TestimonialRoutes, ProtectedTestimonialRoutes] =
  require("./routes/testimonial.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const ProtectedStaffRoutes = require("./routes/staff.routes.js")(
  express.Router({ caseSensitive: false, strict: true })
);
const [StaffCustomerMessageRoutes, ProtectedStaffCustomerMessageRoutes] =
  require("./routes/staffCustomerMessage.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const [ServiceRoutes, ProtectedServiceRoutes] =
  require("./routes/service.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const [ProductRoutes, ProtectedProductRoutes] =
  require("./routes/product.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const ProtectedCustomerProductOrderRoutes =
  require("./routes/customerProductOrder.routes.js")(
    express.Router({ caseSensitive: false, strict: true })
  );
const ProtectedCustomerServiceOrderRoutes =
  require("./routes/customerServiceOrder.routes.js")(
    express.Router({ caseSensitive: false, strict: true })
  );
const [ServiceOptionRoutes, ProtectedServiceOptionRoutes] =
  require("./routes/serviceOption.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const ProtectedManagerRoutes = require("./routes/manager.routes.js")(
  express.Router({ caseSensitive: false, strict: true })
);
const ProtectedCustomerRoutes = require("./routes/customer.routes.js")(
  express.Router({ caseSensitive: false, strict: true })
);
const [ContactUsRoutes, ProtectedContactUsRoutes] =
  require("./routes/contactUs.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );
const [CartItemRoutes, ProtectedCartItemRoutes] =
  require("./routes/cartItem.routes.js")(
    express.Router({ caseSensitive: false, strict: true }),
    express.Router({ caseSensitive: false, strict: true })
  );

// disable trailing slash redirect. It didn't work though
app.set("strict routing", true);

// unprotected routes
app.use("/api/", ProductRoutes);
app.use("/api/", ServiceRoutes);
app.use("/api/", CartItemRoutes);
app.use("/api/", StaffCustomerMessageRoutes);
app.use("/api/", TestimonialRoutes);
app.use("/api/", ServiceOptionRoutes);
app.use("/api/", ContactUsRoutes);
//app.use("/api/", ProtectedStaffRoutes); used to create the first staff

// protected routes that require jwt authentication
app.use(passport.authenticate("jwt", { session: false }));
app.use("/protected-api/", ProtectedStaffCustomerMessageRoutes);
app.use("/protected-api/", ProtectedProductRoutes);
app.use("/protected-api/", ProtectedServiceRoutes);
app.use("/protected-api/", ProtectedStaffRoutes);
app.use("/protected-api/", ProtectedCustomerServiceOrderRoutes);
app.use("/protected-api/", ProtectedCustomerRoutes);
app.use("/protected-api/", ProtectedCustomerProductOrderRoutes);
app.use("/protected-api/", ProtectedServiceOptionRoutes);
app.use("/protected-api/", ProtectedManagerRoutes);
app.use("/protected-api/", ProtectedContactUsRoutes);
app.use("/protected-api/", ProtectedTestimonialRoutes);
app.use("/protected-api/", ProtectedCartItemRoutes);

app.use("/api/home", (req, res) => {
  res.json({ message: "welcome to rhoxklin" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message || "Error" });
  console.log(err.stack);
});

module.exports = app;
