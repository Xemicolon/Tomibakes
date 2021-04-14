require("dotenv").config();
const express = require("express");
const http = require("http");
// const session = require("express-session");
// const { sess } = require("./middleware/session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const xss = require("xss-clean");
const logger = require("morgan");
const { db } = require("./config/db");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const imageRouter = require("./routes/image");
const cartRouter = require("./routes/cart");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_PROD
        : process.env.CORS_LOCAL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}
// app.use(session(sess));
app.disable("x-powered-by");
app.use(helmet());
app.use(helmet.hsts());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

// Data Sanitization against XSS attacks
app.use(xss());

// DB here
db();

//  route here
app.use("/", indexRouter);
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/", imageRouter);
app.use("/", cartRouter);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("Up and running...");
});
