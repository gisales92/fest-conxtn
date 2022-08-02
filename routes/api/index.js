const router = require("express").Router();

const routes = ["users", "auth", "events"];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
