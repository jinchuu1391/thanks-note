const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const authRouter = require("./api/auth");
const postRouter = require("./api/post");
const commentRouter = require("./api/comment");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
