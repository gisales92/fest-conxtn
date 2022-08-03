const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Genre, Event, Post, Reply } = require("../../db/models");

const router = express.Router();

// get user details for the user with the given userId
router.get(
  "/:userId",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await User.getUserById(userId);
      res.status(200);
      return res.json({ ...user });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the genres subscribed to by the user with the given userId
router.get(
  "/:userId/genres",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await User.findByPk(userId, {
        include: Genre,
      });
      const genres = user.Genres;
      // got to remove extra data like createdAt, updatedAt, and the user_genre join table info
      userGenres = genres.map((genreObj) => {
        const genre = {};
        genre.id = genreObj.id;
        genre.type = genreObj.type;
        return genre;
      });
      res.status(200);
      return res.json({ genres: userGenres });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the events RSVP'd to by the user with the given userId
router.get(
  "/:userId/events",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const user = await User.findByPk(userId, {
        include: {
          model: Event,
          include: Genre,
        },
      });
      const userEvents = user.Events;
      const events = {
        going: [],
        interested: [],
      };
      // got to remove extra data like createdAt, updatedAt, extra genre info, and the extra user_events join table info as well as sort into going vs interested
      userEvents.forEach((eventObj) => {
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
          "mainPicUrl",
          "description",
          "link",
        ];
        const event = {};
        attributes.forEach((key) => {
          event[key] = eventObj[key];
        });
        event.genre = eventObj.Genre.type;
        // using this to sort into proper rsvp categories, which is why we're including User_Events table in the query
        if (eventObj.User_Events.rsvpId === 1) {
          events.going.push(event);
        } else {
          events.interested.push(eventObj);
        }
      });
      res.status(200);
      return res.json({ events });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the posts made by the user with the given userId
router.get(
  "/:userId/posts",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      //try getting the user's posts, with most recent post first
      const user = await User.findByPk(userId, {
        include: {
          model: Post,
          order: ["createdAt", "DESC"],
          include: {
            model: Event,
            attributes: ["id", "name", "url", "mainPicUrl"],
          },
        },
      });
      const userPosts = user.Posts;
      const posts = [];
      userPosts.forEach((postObj) => {
        const post = {};
        post.id = postObj.id;
        post.user = {
          id: user.id,
          username: user.username,
          profilePicUrl: user.profilePicUrl,
        };
        post.event = postObj.Event;
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
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

// get the replies made by the user with the given userId
router.get(
  "/:userId/replies",
  asyncHandler(async function (req, res, next) {
    const userId = req.params.userId;
    try {
      //try getting the user's replies, with most recent first
      const user = await User.findByPk(userId, {
        include: {
          model: Reply,
          order: ["createdAt", "DESC"],
        },
      });
      const userReplies = user.Replies;
      const replies = [];
      userReplies.forEach((replyObj) => {
        const reply = {};
        reply.id = replyObj.id;
        reply.user = {
          id: user.id,
          username: user.username,
          profilePicUrl: user.profilePicUrl,
        };
        reply.postId = replyObj.postId;
        reply.body = replyObj.body;
        reply.time = replyObj.createdAt;
        replies.push(reply);
      });
      res.status(200);
      return res.json({ replies });
    } catch (e) {
      res.status(404);
      return res.json({
        message: "Unable to find a User with that ID",
        statusCode: 404,
      });
    }
  })
);

module.exports = router;
