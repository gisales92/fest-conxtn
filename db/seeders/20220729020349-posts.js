"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      r({
        userId: 2,
        eventId: 2,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 3,
        eventId: 3,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 4,
        eventId: 3,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 5,
        eventId: 3,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 2,
        eventId: 4,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 3,
        eventId: 4,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 4,
        eventId: 4,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 5,
        eventId: 4,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 2,
        eventId: 4,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 3,
        eventId: 6,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 4,
        eventId: 7,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 5,
        eventId: 7,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 2,
        eventId: 7,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 3,
        eventId: 8,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 4,
        eventId: 8,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 5,
        eventId: 8,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 2,
        eventId: 8,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 3,
        eventId: 8,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 4,
        eventId: 10,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 5,
        eventId: 11,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 2,
        eventId: 11,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 3,
        eventId: 11,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 4,
        eventId: 12,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 5,
        eventId: 12,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 2,
        eventId: 12,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 3,
        eventId: 12,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 4,
        eventId: 12,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 5,
        eventId: 14,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 1,
        eventId: 15,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 3,
        eventId: 15,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 4,
        eventId: 15,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 5,
        eventId: 16,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 2,
        eventId: 16,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 3,
        eventId: 16,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 4,
        eventId: 16,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 5,
        eventId: 16,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 2,
        eventId: 18,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 3,
        eventId: 19,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 4,
        eventId: 19,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 5,
        eventId: 19,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 2,
        eventId: 20,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 3,
        eventId: 20,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 4,
        eventId: 20,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 5,
        eventId: 20,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 2,
        eventId: 20,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 1,
        eventId: 22,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 4,
        eventId: 23,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 5,
        eventId: 23,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
      r({
        userId: 2,
        eventId: 23,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 1,
        eventId: 24,
        title: "Anyone ever gone without knowing the lineup?",
        body: "I feel like sometimes we get so wrapped up in making each set and planning it perfectly, has anyone ever attended without knowing the schedule and just enjoyed the surprises?",
      }),
      r({
        userId: 3,
        eventId: 24,
        title: "How much are VIP tickets and are they worth it?",
        body: "Hey y'all. I'm wondering how much does it cost? What does it give that GA doesn't? Is it worth it overall to those who have done it before?",
      }),
      r({
        userId: 4,
        eventId: 24,
        title: "Outfit Ideas",
        body: "This year will be my first time going, and I am wondering what the vibe is like.",
      }),
      r({
        userId: 5,
        eventId: 24,
        title: "Carpooling to the venue",
        body: "Anyone have space in their car for one more? I can chip in for gas and the parking fee!",
      }),
      r({
        userId: 2,
        eventId: 24,
        title: "Lineup thoughts?",
        body: "I feel like this year's lineup is so much stronger than last year's.",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts");
  },
};
