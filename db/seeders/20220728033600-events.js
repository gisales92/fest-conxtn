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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658981269/107706_1655410905582-secret-dreams-PHASE3-1200x1200px_bpl53w.jpg",
        description:
          "A fresh and immersive weekend festival focusing on both visual and performance art at the esteemed Legend Valley in Thornville, OH.",
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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658981553/Bass_Canyon_Lineup_2022_PosterSize1000px-777x1200_r1rt26.jpg",
        description:
          "Featuring 3 days of non-stop headbanging, tons of bass, massive stage production, unforgettable sunsets, and more!",
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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658982419/BREAKAWAY_LINEUP_POSTER_FRI-SAT_OH_LINEUP_4X5_rgsgvi.png",
        description:
          "If you are ready to breakaway from reality and enjoy a rad weekend filled with great music, then head down to Columbus, Ohio this summer from August 26th - 28th, 2022 for Breakaway Columbus, OH.",
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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658982805/mainlineupflyer_myhkou.png",
        description:
          "The fourth iteration of Deep Tropics' boutique festival returns to Music City on August 26-27, 2022. It is a carefully curated, music, art, & style experience at Bicentennial Capitol Mall State Park in Nashville's beloved Germantown neighborhood from 3PM- 11PM each day.",
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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658983489/ARC_2022_DESIGN-PHASE1-1350-e1647215433946_skdam6.jpg",
        description:
          "ARC Festival conjures the spirit of house music in the birthplace of the genre. The event united scenes and connected communities.",
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
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1658983851/EZoo2022_StageByStageLineup_4x5_xeolkx.png",
        description:
          "Established in 2009 by Made Event, the internationally renowned Electric Zoo Festival is one of New York City's largest music festivals and features the top names in electronic music, bringing a wide variety of acts from around the world and across the spectrum of electronic music's various sub-genres.",
        link: "https://electriczoo.com/",
      }),
      r({
        name: "North Coast Music Festival",
        url: "north-coast",
        genreId: 3,
        startDate: "2022-09-02",
        endDate: "2022-09-04",
        venueName: "SeatGeek Stadium",
        address: "7000 S Harlem Avenue",
        city: "Bridgeview",
        state: "Illinois",
        zipCode: "60455",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659040267/ncmf-2022-lineup-final_u4jmbd.png",
        description:
          "North Coast is more than music. We strive to create an experience that allows our Coasties to create their own journey. With installations that interact with all your senses.",
        link: "https://www.northcoastfestival.com/",
      }),
      r({
        name: "ILLfest",
        url: "illfest",
        genreId: 3,
        startDate: "2022-09-03",
        endDate: "2022-09-04",
        venueName: "Travis County Expo Center",
        address: "7311 Decker Lane",
        city: "Austin",
        state: "Texas",
        zipCode: "78724",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659040767/illfest-lineup-2022-819x1024_ikez5z.jpg",
        description:
          "Featuring over 50 electronic & live music artists across 4 stages, mind-blowing visuals and installations, more than 30 internationally renowned muralists and plenty of surprises.",
        link: "https://www.illfest.com/",
      }),
      r({
        name: "Same Same But Different",
        url: "same-same",
        genreId: 4,
        startDate: "2022-09-09",
        endDate: "2022-09-11",
        venueName: "Lake Perris State Park",
        address: "18095 Lake Perris Drive",
        city: "Perris",
        state: "California",
        zipCode: "92571",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659041150/SSBD-2022-SOCIAL-FINAL_qg3vlt.webp",
        description:
          "Same Same But Different Music & Arts Festival is a four-day campout where music, art, and wellness converge to create a wide-ranging experience designed to rejuvenate your mind, body and soul.",
        link: "https://www.ssbdfest.com/",
      }),
      r({
        name: "Resonance Music and Arts Festival",
        url: "resonance-fest",
        genreId: 4,
        startDate: "2022-09-15",
        endDate: "2022-09-17",
        venueName: "Woodlands Nature Reserve",
        address: "4279 Ashley River Road",
        city: "Charleston",
        state: "South Carolina",
        zipCode: "29414",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1660015981/294883614_2155351931311914_8603266166990964713_n_m1hla5.png",
        description:
          "The law of Resonance provides the answers as to how the law of attraction operates and creates the events, conditions, and circumstances in your life. A gathering of like-minded, motivated, music-loving individuals.",
        link: "https://resonancemusicfest.com/",
      }),
      r({
        name: "Lost Lands",
        url: "lost-lands",
        genreId: 5,
        startDate: "2022-09-23",
        endDate: "2022-09-25",
        venueName: "Legend Valley",
        address: "7585 Kindle Road",
        city: "Thornville",
        state: "Ohio",
        zipCode: "43076",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659044654/E6dXvDFWQAIfXS6_jibtgj.jpg",
        description:
          "Join us for the filthiest 3 days of bass music you have ever experienced!",
        link: "https://www.lostlandsfestival.com/",
      }),
      r({
        name: "Rolling Loud New York",
        url: "rolling-loud-nyc",
        genreId: 6,
        startDate: "2022-09-23",
        endDate: "2022-09-25",
        venueName: "Citi Field",
        address: "41 Seaver Way",
        city: "Queens",
        state: "New York",
        zipCode: "11368",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659049035/RL22_NY_-_FINAL_FLYER_resized_ztfias.jpg",
        description: "The Largest Hip-Hop Festival in the World.",
        link: "https://www.rollingloud.com/",
      }),
      r({
        name: "Voyage to the Caverns",
        url: "voyage-caverns",
        genreId: 4,
        startDate: "2022-09-23",
        endDate: "2022-09-25",
        venueName: "The Caverns",
        address: "555 Charlie Roberts Road",
        city: "Pelham",
        state: "Tennessee",
        zipCode: "37366",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659051630/d1bc2004-6e7d-468f-81d1-2d1678ea6972_ffzqoc.png",
        description:
          "Immerse yourself in three full days of music, arts, and activities curated by CloZee and Odyzey. This will be an intimate, limited capacity event, packed with amazing music during the day and at night.",
        link: "https://www.odyzeymusic.com/voyage",
      }),
      r({
        name: "CRSSD Festival Fall",
        url: "crssd-fall",
        genreId: 2,
        startDate: "2022-09-24",
        endDate: "2022-09-25",
        venueName: "Waterfront Park",
        address: "1600 Pacific Highway",
        city: "San Diego",
        state: "California",
        zipCode: "92101",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1660015918/download_aif6m5.jpg",
        description: "House x Techno",
        link: "https://www.crssdfest.com/",
      }),
      r({
        name: "Dirtybird Campout",
        url: "dirtybird-campout",
        genreId: 1,
        startDate: "2022-10-07",
        endDate: "2022-10-09",
        venueName: "Modesto Reservoir Campgrounds",
        address: "18143 Reservoir Road",
        city: "Waterford",
        state: "California",
        zipCode: "95386",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659052506/DBC22_-_Lineup_Announce_-_FINAL_aywmfq.jpg",
        description:
          "Welcome Campers to Dirtybird Campout - the most unique festival experience in the world. Your counselors are your favorite DJs. Your campmates - fellow fans from across the planet. And your itinerary - anything you can dream up!",
        link: "https://www.dirtybirdcampout.com/west/",
      }),
      r({
        name: "Above & Beyond: Group Therapy 500",
        url: "abgt-500",
        genreId: 7,
        startDate: "2022-10-15",
        endDate: "2022-10-16",
        venueName: "Banc of California Stadium",
        address: "3939 S Figueroa Street",
        city: "Los Angeles",
        state: "California",
        zipCode: "90037",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659052837/IMG_4768-819x1024_no042o.jpg",
        description:
          "Above & Beyond will be celebrating 500 episodes of their long-running mix show, Group Therapy Radio, in the city of Los Angeles this October at the Banc of California Stadium.",
        link: "https://abgt500.live/",
      }),
      r({
        name: "Rezz Rocks",
        url: "rezz-rocks",
        genreId: 5,
        startDate: "2022-10-27",
        endDate: "2022-10-28",
        venueName: "Red Rocks Amphitheatre",
        address: "18300 W Alameda Parkway",
        city: "Morrison",
        state: "Colorado",
        zipCode: "80465",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659053567/FPmH5x1XsAcFn0J-819x1024_ijonhq.jpg",
        description:
          "Rezz is returning for not one, but two performances at Colorado's legendary Red Rocks.",
        link: "http://officialrezz.com/tour/",
      }),
      r({
        name: "Movement Festival",
        url: "movement-detroit",
        genreId: 2,
        startDate: "2023-05-27",
        endDate: "2023-05-29",
        venueName: "Hart Plaza",
        address: "1 Hart Plaza",
        city: "Detroit",
        state: "Michigan",
        zipCode: "48226",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659054075/Movment-Closing-Set-Katie-Laskowska-7W5A4235_onralr.jpg",
        description:
          "Multiple carefully curated stages with unique personalities that encompass distinctive showcases and performances spanning the three-day weekend.",
        link: "https://www.movementfestival.com/",
      }),
      r({
        name: "Dreamstate",
        url: "dreamstate",
        genreId: 7,
        startDate: "2022-11-18",
        endDate: "2022-11-19",
        venueName: "NOS Events Center",
        address: "689 S E Street",
        city: "San Bernardino",
        state: "California",
        zipCode: "92408",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659054604/Dreamstate-2022-Banner_bronza.jpg",
        description:
          "Envision a world where ethereal beats and timeless melodies rescue you from the everyday and transport you to a higher state of consciousness.",
        link: "https://socal.dreamstateusa.com/",
      }),
      r({
        name: "HiJinx Festival",
        url: "hijinx-fest",
        genreId: 5,
        startDate: "2022-12-30",
        endDate: "2022-12-31",
        venueName: "Pennsylvania Convention Center",
        address: "1101 Arch Street",
        city: "Philadelphia",
        state: "Pennsylvania",
        zipCode: "19107",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659055045/hijinx_feature_2019-1200x675_isalnb.jpg",
        description:
          "HiJinx returns to ring in the New Year at Pennsylvania Convention Center in Philadelphia. The lineup is heavy with bass artists so be prepared for some head thrashing beats along with a spectacular light show.",
        link: "https://hijinxfest.com/",
      }),
      r({
        name: "Head in the Clouds Music & Arts Festival",
        url: "head-clouds-fest",
        genreId: 6,
        startDate: "2022-08-20",
        endDate: "2022-08-21",
        venueName: "Rose Bowl Stadium",
        address: "1001 Rose Bowl Drive",
        city: "Pasadena",
        state: "California",
        zipCode: "91103",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659055489/H7z0kHKcBvKtdfRoJOUyH0qabKqlmAej4sbNY8vP_jem9lo.png",
        description:
          "Head In The Clouds is a 2-day festival organized by 88rising. The lineups feature musical artists across the Asian diaspora.",
        link: "https://la.hitcfestival.com/",
      }),
      r({
        name: "EDC Las Vegas",
        url: "edc-vegas",
        genreId: 3,
        startDate: "2023-05-19",
        endDate: "2023-05-21",
        venueName: "Las Vegas Motor Speedway",
        address: "7000 Las Vegas Boulevard N",
        city: "Las Vegas",
        state: "Nevada",
        zipCode: "89115",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659055849/03-edc-lv-press-photo-2018-billboard-1548-compressed_nzturo.jpg",
        description:
          "Under the Electric Sky, we come together to celebrate life, love, art, and music. From the stages and the sound to the pyrotechnics and the performers, so many unique elements go into bringing this world to life. We invite you to wander, explore, interact, and connect.",
        link: "https://lasvegas.electricdaisycarnival.com/",
      }),
      r({
        name: "Desert Hearts Festival",
        url: "desert-hearts-fest",
        genreId: 2,
        startDate: "2023-04-27",
        endDate: "2023-05-01",
        venueName: "Lake Perris State Park",
        address: "18095 Lake Perris Drive",
        city: "Perris",
        state: "California",
        zipCode: "92571",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659056237/64328294_1136145919843020_2712146850990784512_o_nai3m7.jpg",
        description:
          "Desert Hearts is a tribute to House, Techno, & Love with intimate gatherings focused on art, music and community.",
        link: "https://festival.deserthearts.us/",
      }),
      r({
        name: "HARD Summer",
        url: "hard-summer",
        genreId: 6,
        startDate: "2022-07-29",
        endDate: "2022-07-31",
        venueName: "NOS Events Center",
        address: "689 S E Street",
        city: "San Bernardino",
        state: "California",
        zipCode: "92408",
        mainPicUrl:
          "https://res.cloudinary.com/djsh50cka/image/upload/v1659056411/hs_2022_mk_lu_full_1080x1350_r04v01_uyjmms.png",
        description:
          "HARD Summer music festival comes to the NOS Events Center! Join us for three days of stacked lineups, including larger-than-life electronic and hip-hop acts.",
        link: "https://www.hardsummer.com/",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events");
  },
};
