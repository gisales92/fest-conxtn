const router = require("express").Router();
const api = require("./api");

router.use("/api", api);

// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../client/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
}



module.exports = router;
