"use strict";

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Events", [
      r({
        name: "Secret Dreams Music & Arts Festival",
        url: "secret-dreams",
        genreId: 4,
        startDate: "2022-08-18",
        endDate: "2022-08-20",
        venueName: "Legend Valley",
        address: "7585 Kindle Road",
        city: "Thornville",
        state: "Ohio",
        zipCode: "43076",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658981269/107706_1655410905582-secret-dreams-PHASE3-1200x1200px_bpl53w.jpg",
        description: "A fresh and immersive weekend festival focusing on both visual and performance art at the esteemed Legend Valley in Thornville, OH.",
        link: "https://www.secretdreamsfest.com/",
      }),
      r({
        name: "Bass Canyon",
        url: "bass-canyon",
        genreId: 5,
        startDate: "2022-08-19",
        endDate: "2022-08-21",
        venueName: "The Gorge Amphitheatre",
        address: "754 Silica Road NW",
        city: "George",
        state: "Washington",
        zipCode: "98848",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658981553/Bass_Canyon_Lineup_2022_PosterSize1000px-777x1200_r1rt26.jpg",
        description: "Featuring 3 days of non-stop headbanging, tons of bass, massive stage production, unforgettable sunsets, and more!",
        link: "https://www.basscanyon.com/",
      }),
      r({
        name: "Breakaway Music Festival",
        url: "breakaway-ohio",
        genreId: 3,
        startDate: "2022-08-26",
        endDate: "2022-08-28",
        venueName: "Historic Crew Stadium",
        address: "1 Black and Gold Boulevard",
        city: "Columbus",
        state: "Ohio",
        zipCode: "43211",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658982419/BREAKAWAY_LINEUP_POSTER_FRI-SAT_OH_LINEUP_4X5_rgsgvi.png",
        description: "If you are ready to breakaway from reality and enjoy a rad weekend filled with great music, then head down to Columbus, Ohio this summer from August 26th - 28th, 2022 for Breakaway Columbus, OH.",
        link: "https://www.breakawayfestival.com/venues/ohio",
      }),
      r({
        name: "Deep Tropics Music, Art & Style Festival",
        url: "deep-tropics",
        genreId: 1,
        startDate: "2022-08-26",
        endDate: "2022-08-27",
        venueName: "Bicentennial Park",
        address: "600 James Robertson Parkway",
        city: "Nashville",
        state: "Tennessee",
        zipCode: "37243",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658982805/mainlineupflyer_myhkou.png",
        description: "The fourth iteration of Deep Tropics' boutique festival returns to Music City on August 26-27, 2022. It is a carefully curated, music, art, & style experience at Bicentennial Capitol Mall State Park in Nashville's beloved Germantown neighborhood from 3PM- 11PM each day.",
        link: "https://www.deeptropics.org/",
      }),
      r({
        name: "ARC Music Festival",
        url: "arc-music-fest",
        genreId: 1,
        startDate: "2022-09-02",
        endDate: "2022-09-04",
        venueName: "Union Park",
        address: "1501 W Randolph Street",
        city: "Chicago",
        state: "Illinois",
        zipCode: "60606",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658983489/ARC_2022_DESIGN-PHASE1-1350-e1647215433946_skdam6.jpg",
        description: "ARC Festival conjures the spirit of house music in the birthplace of the genre. The event united scenes and connected communities.",
        link: "https://arcmusicfestival.com/",
      }),
      r({
        name: "Electric Zoo",
        url: "electric-zoo",
        genreId: 3,
        startDate: "2022-09-02",
        endDate: "2022-09-04",
        venueName: "Randall's Island Park",
        address: "20 Randalls Island Park",
        city: "New York",
        state: "New York",
        zipCode: "10035",
        mainPicUrl: "https://res.cloudinary.com/djsh50cka/image/upload/v1658983851/EZoo2022_StageByStageLineup_4x5_xeolkx.png",
        description: "Established in 2009 by Made Event, the internationally renowned Electric Zoo Festival is one of New York City's largest music festivals and features the top names in electronic music, bringing a wide variety of acts from around the world and across the spectrum of electronic music's various sub-genres.",
        link: "https://electriczoo.com/",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events");
  },
};
