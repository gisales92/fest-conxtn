const express = require("express");
const asyncHandler = require("express-async-handler");

const { RSVP } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
   const rsvps = await RSVP.findAll();
   const filteredRSVPs = [];
   rsvps.forEach(rsvpObj => {{
    const rsvp = {};
    rsvp.id = rsvpObj.id;
    rsvp.type = rsvpObj.type;
    filteredRSVPs.push(rsvp);
   }})
   res.status(200);
   res.json({ rsvps: filteredRSVPs })
  })
);

module.exports = router;