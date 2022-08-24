const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post, Reply, User, Event } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateReply } = require("../../utils/validation");

const router = express.Router();

// get all replies that have been made on a post specified by its postId
router.get(
  "/:postId/replies",
  asyncHandler(async function (req, res, next) {
    const postId = req.params.postId;

    const post = await Post.findByPk(postId, {
      include: {
        model: Reply,
        include: {
          model: User,
          attributes: ["id", "username", "profilePicUrl"],
        },
      },
    });
    if (!post) {
      res.status(404);
      return res.json({
        message: "Unable to find a Post with that ID",
        statusCode: 404,
      });
    }
    // remove extra data from replies and the og post
    const postReplies = post.Replies;
    const replies = [];
    postReplies.forEach((replyObj) => {
      const rep = {};
      rep.id = replyObj.id;
      rep.user = replyObj.User;
      rep.postId = replyObj.postId;
      rep.body = replyObj.body;
      rep.time = replyObj.createdAt;
      replies.push(rep);
    });
    res.status(200);
    res.json({ replies });
  })
);

// post a reply to a post specified by its postId
router.post(
  "/:postId/replies",
  requireAuth,
  validateReply,
  asyncHandler(async function (req, res, next) {
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404);
      return res.json({
        message: "Unable to find a Post with that ID",
        statusCode: 404,
      });
    }

    const { userId, body } = req.body;
    const reply = await Reply.create({
      userId,
      postId,
      body,
    });

    // get user info from the reply's association, then format reply response object
    const user = await reply.getUser();
    const post1 = await reply.getPost();
    const event = await Event.findByPk(post1.eventId)
    const filteredReply = {};
    filteredReply.id = reply.id;
    filteredReply.user = {
      id: user.id,
      username: user.username,
      profilePicUrl: user.profilePicUrl,
    };
    filteredReply.post = {
      id: post1.id,
      title: post1.title,
      Event: event
    };
    filteredReply.body = reply.body;
    filteredReply.time = reply.createdAt;

    res.status(200);
    res.json({ ...filteredReply });
  })
);

module.exports = router;
