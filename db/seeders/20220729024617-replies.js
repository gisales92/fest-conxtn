"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Replies", [
      r({
        userId: 2,
        postId: 1,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 1,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 1,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 2,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 3,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 3,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 3,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 5,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 5,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 5,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 5,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 6,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 3,
        postId: 6,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 8,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 9,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 9,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 9,
        body: "Same here",
      }),
      r({
        userId: 2,
        postId: 10,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 10,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 10,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 11,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 12,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 12,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 12,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 14,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 14,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 14,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 14,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 15,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 3,
        postId: 15,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 17,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 18,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 18,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 18,
        body: "Same here",
      }),
      r({
        userId: 2,
        postId: 19,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 19,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 19,
        body: "Sa9me here",
      }),
      r({
        userId: 5,
        postId: 20,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 21,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 21,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 21,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 23,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 23,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 23,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 23,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 24,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 3,
        postId: 24,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 26,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 27,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 27,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 27,
        body: "Same here",
      }),
      r({
        userId: 2,
        postId: 28,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 28,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 28,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 29,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 30,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 30,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 30,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 32,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 32,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 32,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 32,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 33,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 3,
        postId: 33,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 35,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 36,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 36,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 36,
        body: "Same here",
      }),
      r({
        userId: 2,
        postId: 37,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 37,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 37,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 38,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 39,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 39,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 39,
        body: "Same here",
      }),
      r({
        userId: 1,
        postId: 41,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 41,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 41,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 41,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 42,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 3,
        postId: 42,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 44,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 45,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 45,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 45,
        body: "Same here",
      }),
      r({
        userId: 2,
        postId: 46,
        body: "100% this^^^",
      }),
      r({
        userId: 1,
        postId: 46,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 46,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 47,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 48,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 48,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 48,
        body: "Same here",
      }),
      r({
        userId: 5,
        postId: 50,
        body: "I went last year fist time. I knew the lineup but had no specific plan except to see 2 people. It was what I read was best and goes best with my spontaneous attitude. It was great I discovered plenty of producers who were unreal",
      }),
      r({
        userId: 2,
        postId: 50,
        body: "I stopped paying attention to the lineup a couple years ago. I just show up and go wherever feels/sounds good. This is the way.",
      }),
      r({
        userId: 3,
        postId: 50,
        body: "Yes. Honestly a festival is gonna be more for the vibe and environment than the artist.",
      }),
      r({
        userId: 4,
        postId: 50,
        body: "This 100%. It drives me crazy when I try to get friends to go to a festival for the first time and they refuse because the lineup doesn't interest them.",
      }),
      r({
        userId: 4,
        postId: 51,
        body: "I did VIP this year and it was worth it because I went with a group of 4 people that also all had VIP. If I was the only one with VIP in the group I would have done GA.",
      }),
      r({
        userId: 1,
        postId: 51,
        body: "Done both. It's very, \"nice to have\" but you can skip it for sure, it doesn't make or break the experience, imo.",
      }),
      r({
        userId: 5,
        postId: 53,
        body: "Yeah, message me",
      }),
      r({
        userId: 2,
        postId: 54,
        body: "100% this^^^",
      }),
      r({
        userId: 3,
        postId: 54,
        body: "Yeah, agreed",
      }),
      r({
        userId: 4,
        postId: 54,
        body: "Same here",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Replies");
  },
};
