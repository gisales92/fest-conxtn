const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { Event, Genre, Post, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validatePost } = require("../../utils/validation");

const router = express.Router();

// get all events or query events by genre
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const { genreId } = req.query;
    let options = { include: Genre, order: ["startDate"], };
    if (typeof genreId !== "undefined") {
      // update options if genreId query parameter has been provided
      const genre = parseInt(genreId);
      options = {
        include: {
          model: Genre,
          order: ["startDate"],
          where: {
            id: {
              [Op.eq]: genre,
            },
          },
        },
      };
    }
    const events = await Event.findAll(options);
    const parsedEvents = [];
    const attributes = [
      "id",
      "name",
      "url",
      "startDate",
      "endDate",
      "venueName",
      "address",
      "city",
      "state",
      "zipCode",
      "lat",
      "lng",
      "mainPicUrl",
      "description",
      "link",
    ];
    events.forEach((eventObj) => {
      const event = {};
      attributes.forEach((key) => {
        event[key] = eventObj[key];
      });
      event.genre = eventObj.Genre.type;
      parsedEvents.push(event);
    });
    if (parsedEvents.length === 0) {
      res.status(404);
      return res.json({
        message: "Unable to find a Genre with that ID",
        statusCode: 404,
      });
    }
    res.status(200);
    return res.json({ events: parsedEvents });
  })
);

// get details of an event by its eventId
router.get(
  "/:eventId",
  asyncHandler(async function (req, res, next) {
    const eventId = req.params.eventId;
    try {
      const event = await Event.findByPk(eventId, {
        include: Genre,
      });
      const parsedEvent = {};
      const attributes = [
        "id",
        "name",
        "url",
        "startDate",
        "endDate",
        "venueName",
        "address",
        "city",
        "state",
        "zipCode",
        "lat",
        "lng",
        "mainPicUrl",
        "description",
        "link",
      ];

      attributes.forEach((key) => {
        parsedEvent[key] = event[key];
      });
      parsedEvent.genre = event.Genre.type;

      res.status(200);
      return res.json({ ...parsedEvent });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
  })
);

// get all posts for an event by its eventId
router.get(
  "/:eventId/posts",
  asyncHandler(async function (req, res, next) {
    const eventId = req.params.eventId;
    try {
      // try to retrieve event with associated posts ordered with most recent first
      const event = await Event.findByPk(eventId, {
        include: {
          model: Post,
          order: ["createdAt", "DESC"],
          include: {
            model: User,
            attributes: ["id", "username", "profilePicUrl"],
          },
        },
      });

      const eventPosts = event.Posts;
      const posts = [];
      eventPosts.forEach((postObj) => {
        const post = {};
        post.id = postObj.id;
        post.user = postObj.User;
        post.event = {
          id: event.id,
          name: event.name,
          url: event.url,
          mainPicUrl: event.mainPicUrl,
        };
        post.title = postObj.title;
        post.body = postObj.body;
        post.time = postObj.createdAt;
        posts.push(post);
      });

      res.status(200);
      return res.json({ posts });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
  })
);

// create a post for an event by its eventId
router.post(
  "/:eventId/posts",
  requireAuth,
  validatePost,
  asyncHandler(async function (req, res, next) {
    const eventId = req.params.eventId;

    // check if event exists and return error if it does not
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });

    }
    const { userId, title, body } = req.body;
    const post = await Post.create({
        userId,
        eventId,
        title,
        body
    });
    // get the user info via the post's association, we already have event info from our first query/test
    const user = await post.getUser();
    const filteredPost = {};
    filteredPost.id = post.id;
    filteredPost.user = {
        id: user.id,
        username: user.username,
        profilePicUrl: user.profilePicUrl
    };
    filteredPost.event = {
        id: event.id,
        name: event.name,
        url: event.url,
        mainPicUrl: event.mainPicUrl
    };
    filteredPost.title = post.title;
    filteredPost.body = post.body;
    filteredPost.time = post.createdAt;

    res.status(201);
    return res.json({ ...filteredPost });
  })
);

module.exports = router;
