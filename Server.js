
```js
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/videos", express.static(path.join(__dirname, "videos")));

const storage = multer.diskStorage({
  destination: "./videos",
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  const files = fs.readdirSync("./videos");
  res.render("index", { videos: files });
});

app.get("/watch/:filename", (req, res) => {
  const { filename } = req.params;
  res.render("watch", { video: filename });
});

app.get("/upload", (req, res) => res.render("upload"));

app.post("/upload", upload.single("video"), (req, res) => res.redirect("/"));

app.listen(3000, () => console.log("LYRICAL STREEMER running on http://localhost:3000"));
```

Let me know if you want other files too!
