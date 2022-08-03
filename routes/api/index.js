const router = require("express").Router();

const routes = ["users", "auth", "events", "genres", "rsvps", "posts", "my"];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
