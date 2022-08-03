const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const {
  Post,
  Reply,
  User,
  Genre,
  User_Genres,
  Event,
  User_Events,
  RSVP,
  Message,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validatePost, validateReply } = require("../../utils/validation");

const router = express.Router();

// get all genres that have been subscribed to by the current User.
router.get(
  "/genres",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    // grab userId from the req.user object, use it to retrieve that user's record and include their genres
    const userId = req.user.id;
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
  })
);

// subscribe to a genre
router.post(
  "/genres",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    // grab userId from the req.user object, use check to make sure it matches the userId from the req body
    const id = req.user.id;
    const { userId, genreId } = req.body;
    if (id !== userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // check to make sure it's a valid genre
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      res.status(404);
      res.json({
        message: "Unable to find a Genre with that ID",
        statusCode: 404,
      });
    }
    // check to make sure user is not already subscribed to that genre to prevent duplicates
    const userGenre = await User_Genres.findOne({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            genreId: {
              [Op.eq]: genreId,
            },
          },
        ],
      },
    });
    if (userGenre) {
      res.status(200);
      return res.json({
        message: "Already subscribed",
        statusCode: 200,
      });
    }
    // create the new record on the User_Genres table format the response
    const newGenreSub = await User_Genres.create({
      userId,
      genreId,
    });
    const subbedGenre = {};
    subbedGenre.id = newGenreSub.id;
    subbedGenre.userId = newGenreSub.userId;
    subbedGenre.genre = {
      id: genre.id,
      type: genre.type,
    };
    res.status(201);
    return res.json({ ...subbedGenre });
  })
);

// unsubscribe from a genre.
router.delete(
  "/genres/:genreId",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    // grab userId from the req.user object, grab genreId from req params
    const userId = req.user.id;
    const genreId = req.params.genreId;
    // check to make sure it's a valid genre
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      res.status(404);
      return res.json({
        message: "Unable to find a Genre with that ID",
        statusCode: 404,
      });
    }
    // look for User_Genre record using that info
    const userGenre = await User_Genres.findOne({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            genreId: {
              [Op.eq]: genreId,
            },
          },
        ],
      },
    });
    if (userGenre) {
      await userGenre.destroy();
      res.status(200);
      return res.json({
        message: "Successfully Unsubscribed",
        statusCode: 200,
      });
    } else {
      res.status(200);
      return res.json({
        message: "Already Unsubscribed",
        statusCode: 200,
      });
    }
  })
);

// get current user's rsvp'd events
router.get(
  "/events",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
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
  })
);

// RSVP to an event
router.post(
  "/events",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const id = req.user.id;
    const { userId, eventId, rsvpId } = req.body;
    // check to make sure user is submitting an rsvp for themselves
    if (id !== userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // check to make sure it's for a valid event
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
    // check to make sure it's a valid rsvp
    const rsvp = await RSVP.findByPk(rsvpId);
    if (!rsvp) {
      res.status(404);
      return res.json({
        message: "Unable to find an RSVP with that ID",
        statusCode: 404,
      });
    }
    // check to make sure user is not already rsvp'd - if they are changing rsvp type, delete the old rsvp record to prevent duplicates. If no change, return message to user that they already rsvp'd
    const userEvent = await User_Events.findOne({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            eventId: {
              [Op.eq]: eventId,
            },
          },
        ],
      },
    });
    if (userEvent) {
      if (userEvent.rsvpId === rsvpId) {
        res.status(200);
        return res.json({
          message: "Already submitted this RSVP",
          statusCode: 200,
        });
      } else {
        await userEvent.destroy();
      }
    }
    const newRsvp = await User_Events.create({
      userId,
      eventId,
      rsvpId,
    });
    const cleanUserEvent = {};
    cleanUserEvent.id = newRsvp.id;
    cleanUserEvent.userId = newRsvp.userId;
    cleanUserEvent.event = {
      id: event.id,
      name: event.name,
      url: event.url,
      mainPicUrl: event.mainPicUrl,
    };
    cleanUserEvent.rsvp = rsvp.type;
    res.status(201);
    return res.json({ ...cleanUserEvent });
  })
);

// update rsvp to an event
router.put(
  "/events/:eventId",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const eventId = req.params.eventId;
    const { rsvpId } = req.body;
    // check to make sure it's for a valid event
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
    // check to make sure it's a valid rsvp
    const rsvp = await RSVP.findByPk(rsvpId);
    if (!rsvp) {
      res.status(404);
      return res.json({
        message: "Unable to find an RSVP with that ID",
        statusCode: 404,
      });
    }
    // find rsvp record
    const userEvent = await User_Events.findOne({
      attributes: ["id", "userId", "eventId", "rsvpId"],
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            eventId: {
              [Op.eq]: eventId,
            },
          },
        ],
      },
    });
    if (!userEvent) {
      res.status(404);
      return res.json({
        message: "Unable to find RSVP",
        statusCode: 404,
      });
    }
    // update rsvp record with new rsvp, return updated info
    await userEvent.update({
      rsvpId,
    });
    const updatedRsvp = {};
    updatedRsvp.id = userEvent.id;
    updatedRsvp.userId = userEvent.userId;
    updatedRsvp.event = {
      id: event.id,
      name: event.name,
      url: event.url,
      mainPicUrl: event.mainPicUrl,
    };
    updatedRsvp.rsvp = rsvp.type;
    res.status(200);
    return res.json({ ...updatedRsvp });
  })
);

// Delete the current user's rsvp to an event
router.delete(
  "/events/:eventId",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const eventId = req.params.eventId;
    // check to make sure it's for a valid event
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404);
      return res.json({
        message: "Unable to find an Event with that ID",
        statusCode: 404,
      });
    }
    // find rsvp record
    const userEvent = await User_Events.findOne({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: userId,
            },
          },
          {
            eventId: {
              [Op.eq]: eventId,
            },
          },
        ],
      },
    });
    if (!userEvent) {
      res.status(404);
      return res.json({
        message: "Unable to find RSVP",
        statusCode: 404,
      });
    }
    // delete the rsvp
    await userEvent.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted RSVP",
      statusCode: 200,
    });
  })
);

// get the current user's posts
router.get(
  "/posts",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    //getting the current user's posts, with most recent post first
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
  })
);

// Edit a post
router.put(
  "/posts/:postId",
  requireAuth,
  validatePost,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { title, body } = req.body;

    // get the post from database
    const post = await Post.findByPk(postId, {
      include: [User, Event],
    });
    if (!post) {
      res.status(404);
      return res.json({
        message: "Unable to find a Post with that ID",
        statusCode: 404,
      });
    }
    // check that the post was made by our current user
    if (userId !== post.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // update the title and body of the post
    await post.update({
      title,
      body,
    });
    // return updated post info to frontend
    const updatedPost = {};
    updatedPost.id = post.id;
    updatedPost.user = {
      id: post.User.id,
      username: post.User.username,
      profilePicUrl: post.User.profilePicUrl,
    };
    updatedPost.event = {
      id: post.Event.id,
      name: post.Event.name,
      url: post.Event.url,
      mainPicUrl: post.Event.mainPicUrl,
    };
    updatedPost.title = post.title;
    updatedPost.body = post.body;
    updatedPost.time = post.createdAt;

    res.status(200);
    return res.json({ ...updatedPost });
  })
);

// Delete a post made by the current user
router.delete(
  "/posts/:postId",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const postId = req.params.postId;
    // get the post from database
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404);
      return res.json({
        message: "Unable to find a Post with that ID",
        statusCode: 404,
      });
    }
    // make sure the post belongs to our current user
    if (userId !== post.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // delete the post and return the success message to the frontend
    await post.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted post",
      statusCode: 200,
    });
  })
);

// Get the current user's replies
router.get(
  "/replies",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    // Get the user's replies, with most recent first
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
  })
);

// Edit a reply made by the current user, specified by the replyId
router.put(
  "/replies/:replyId",
  requireAuth,
  validateReply,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const replyId = req.params.replyId;
    const { body } = req.body;

    // get the reply from database
    const reply = await Reply.findByPk(replyId, {
      include: [User],
    });
    if (!reply) {
      res.status(404);
      return res.json({
        message: "Unable to find a reply with that ID",
        statusCode: 404,
      });
    }
    // check that the reply was made by our current user
    if (userId !== reply.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // update the title and body of the reply
    await reply.update({
      body,
    });
    // return updated reply info to frontend
    const updatedReply = {};
    updatedReply.id = reply.id;
    updatedReply.user = {
      id: reply.User.id,
      username: reply.User.username,
      profilePicUrl: reply.User.profilePicUrl,
    };
    updatedReply.postId = reply.postId;
    updatedReply.body = reply.body;
    updatedReply.time = reply.createdAt;

    res.status(200);
    return res.json({ ...updatedReply });
  })
);

// Delete a reply belonging to the current user, specified by replyId
router.delete(
  "/replies/:replyId",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const replyId = req.params.replyId;
    // get the reply from the database
    const reply = await Reply.findByPk(replyId);
    if (!reply) {
      res.status(404);
      return res.json({
        message: "Unable to find a reply with that ID",
        statusCode: 404,
      });
    }
    // check that the reply was made by our current user
    if (userId !== reply.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    await reply.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted reply",
      statusCode: 200,
    });
  })
);

// Get the current user's messages
router.get(
  "/messages",
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    // get messages with the current user as sender or recipient, oldest first
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: { [Op.eq]: userId } },
          { recipientId: { [Op.eq]: userId } },
        ],
      },
      include: [
        { model: User, as: "sender", attributes: ["id", "username", "profilePicUrl"] },
        { model: User, as: "recipient", attributes: ["id", "username", "profilePicUrl"] },
      ],
      order: [["createdAt", "ASC"]],
    });
    if (!messages.length) {
      res.status(200);
      return res.json({
        message: "User has no messages",
        statusCode: 200,
      });
    }
    // create obj we'll return
    const returnObj = {};
    // iterate through the messages to sort them into conversations, using the other user's id as the key
    messages.forEach((messObj) => {
      let id;
      if (messObj.sender.id === userId) {
        id = messObj.recipient.id;
      } else {
        id = messObj.sender.id;
      }
      const message = {};
      message.id = messObj.id;
      message.sender = messObj.sender;
      message.recipient = messObj.recipient;
      message.body = messObj.body;
      message.time = messObj.createdAt;
      message.read = messObj.read;
      if (returnObj[id]) {
        returnObj[id].push(message);
      } else {
        returnObj[id] = [message];
      }
    });
    res.status(200);
    return res.json({ messages: returnObj });
  })
);

module.exports = router;
