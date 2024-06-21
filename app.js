import express from "express";
import "express-async-errors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import session from "express-session";
import dotenv from "dotenv";
import passport from "./auth.js";

import postsRouter from "./routes/UserPosts.js";
import commentsRouter from "./routes/UserComments.js";
import FriendsRouter from "./routes/Friends.js";
import PostsDataRouter from "./routes/PostsData.js";
import UserInteractionsRouter from "./routes/UserInteractions.js";

import errorHandlerMiddleware from "./middleware/error_handler.js";
import PageNotFoundMiddleware from "./middleware/Page_not_found.js";
import AuthMiddleware from "./middleware/authMiddleware.js";

import checkAndCreateSchema from "./utils/checkAndCreateSchema.js";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 second
    },
  })
);
app.use(cors())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      description: "Social Media API Information",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    // prompt: "consent",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/api-docs");
  }
);


app.use(
  "/profile/",
  AuthMiddleware,
  postsRouter,
  commentsRouter,
  FriendsRouter
);
app.use("/post/:id/", AuthMiddleware, PostsDataRouter);
app.use("/",AuthMiddleware,UserInteractionsRouter);

app.use(PageNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    await checkAndCreateSchema();
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error);
  }
};

start();