import { getUserLikesData } from '../Actions/types';

const INIALSTATE = JSON.parse(localStorage.getItem("LikesData")) || [
  {
    "id": "HlJuQDBh3w4",
    "created_at": "2019-11-18T18:54:04-05:00",
    "width": 6000,
    "height": 4000,
    "description": null,
    "alt_description": "brown wooden terrace outside clear glass door",
    "urls": {
      "full": "https://images.unsplash.com/photo-1574120583586-de8847ae992c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "regular": "https://images.unsplash.com/photo-1574120583586-de8847ae992c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "small": "https://images.unsplash.com/photo-1574120583586-de8847ae992c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
    },
    "likes": 33,
    "user": {
      "id": "a9ZzfgQgzVk",
      "username": "im3rdmedia",
      "name": "Im3rd Media",
      "first_name": "Im3rd",
      "last_name": "Media",
      "twitter_username": "im3rdmedia",
      "portfolio_url": "https://im3rdmedia.com",
      "bio": "We are an innovative real estate marketing brand that helps you create and advertise beautiful images/videos of your listing!",
      "location": "Seattle, WA",
      "profile_image": {
        "small": "https://images.unsplash.com/profile-1573583155411-4f17ce62e2b6image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/profile-1573583155411-4f17ce62e2b6image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/profile-1573583155411-4f17ce62e2b6image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "im3rd_media",
      "total_collections": 0,
      "total_likes": 0,
      "total_photos": 26,
      "accepted_tos": true
    },
    "exif": {
      "make": null,
      "model": null,
      "exposure_time": null,
      "aperture": null,
      "focal_length": null,
      "iso": null
    },
    "location": {
      "title": null,
      "name": null,
      "city": null,
      "country": null,
      "position": {
        "latitude": null,
        "longitude": null
      }
    },
    "views": 334975,
    "downloads": 965
  },
  {
    "id": "vhztm9QC0L0",
    "created_at": "2019-11-24T19:53:08-05:00",
    "width": 5760,
    "height": 3840,
    "description": "📷 : Kylie Fitts / www.kyliefitts.com",
    "alt_description": "white bed sheet",
    "urls": {
      "full": "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "regular": "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "small": "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
    },
    "likes": 27,
    "user": {
      "id": "dyn6qu2sMis",
      "username": "shop_slo",
      "name": "SHOP SLO®",
      "first_name": "SHOP SLO®",
      "last_name": "",
      "twitter_username": "shopslo",
      "portfolio_url": "http://www.shopslo.org",
      "bio": "SHOP | SLO® is committed to slowing down the fast fashion industry by bringing sustainability to its products and the planet. Shop sustainable decor + textiles.",
      "location": "Denver, CO",
      "profile_image": {
        "small": "https://images.unsplash.com/profile-1572895019946-1cf9986b4683image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/profile-1572895019946-1cf9986b4683image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/profile-1572895019946-1cf9986b4683image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "shopslodesigns",
      "total_collections": 0,
      "total_likes": 0,
      "total_photos": 10,
      "accepted_tos": true
    },
    "exif": {
      "make": "Canon",
      "model": "Canon EOS 5D Mark III",
      "exposure_time": "1/125",
      "aperture": "5.0",
      "focal_length": "30.0",
      "iso": 3200
    },
    "location": {
      "title": "Denver, CO, USA",
      "name": "Denver, CO, USA",
      "city": "Denver",
      "country": "United States",
      "position": {
        "latitude": 39.7392358,
        "longitude": -104.990251
      }
    },
    "views": 287559,
    "downloads": 928
  },
  {
    "id": "luPLX6KnkL0",
    "created_at": "2019-11-23T19:13:07-05:00",
    "width": 2026,
    "height": 2959,
    "description": null,
    "alt_description": "woman in white off-shoulder wedding dress holding bouquet of flowers",
    "urls": {
      "full": "https://images.unsplash.com/photo-1574554339131-e163491b452b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "regular": "https://images.unsplash.com/photo-1574554339131-e163491b452b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "small": "https://images.unsplash.com/photo-1574554339131-e163491b452b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
    },
    "likes": 39,
    "user": {
      "id": "oOv2B7ehboo",
      "username": "23jenni0524",
      "name": "Jennifer Marquez",
      "first_name": "Jennifer",
      "last_name": "Marquez",
      "twitter_username": null,
      "portfolio_url": "https://www.facebook.com/JAMsPhotography1/",
      "bio": "\"Why just be one thing when you can be many\".\r\nWelcome! Enjoy my Artwork and  creativity.\r\n\r\n*Creative Instagram: jams_photography\r\n*Personal Instagram: 23jenni0524\r\n",
      "location": null,
      "profile_image": {
        "small": "https://images.unsplash.com/profile-1561645424876-0e5bcdb44f4a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/profile-1561645424876-0e5bcdb44f4a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/profile-1561645424876-0e5bcdb44f4a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "jams_photography",
      "total_collections": 0,
      "total_likes": 3,
      "total_photos": 42,
      "accepted_tos": true
    },
    "exif": {
      "make": "SONY",
      "model": "ILCE-7M2",
      "exposure_time": "1/160",
      "aperture": "3.5",
      "focal_length": "50.0",
      "iso": 2000
    },
    "location": {
      "title": null,
      "name": null,
      "city": null,
      "country": null,
      "position": {
        "latitude": null,
        "longitude": null
      }
    },
    "views": 298709,
    "downloads": 658
  },
  {
    "id": "9rlEYpHj7uw",
    "created_at": "2020-01-12T02:06:05-05:00",
    "width": 1985,
    "height": 2981,
    "color": "#F2F0F1",
    "description": "Sunny Side ",
    "alt_description": "aerial photography of green trees beside body of water",
    "urls": {
      "full": "https://images.unsplash.com/photo-1578812734282-e77a6fdcaae4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
      "regular": "https://images.unsplash.com/photo-1578812734282-e77a6fdcaae4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
      "small": "https://images.unsplash.com/photo-1578812734282-e77a6fdcaae4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
    },
    "likes": 13,
    "user": {
      "id": "vdcRpqCtqpA",
      "username": "__siraaj__",
      "name": "Husen Siraaj",
      "first_name": "Husen",
      "last_name": "Siraaj",
      "twitter_username": null,
      "portfolio_url": null,
      "bio": "𝓜𝓪𝓵𝓭𝓲𝓿𝓮𝓼 𝓟𝓱𝓸𝓽𝓸𝓰𝓻𝓪𝓹𝓱𝓮𝓻 🇲🇻 📸\r\n",
      "location": null,
      "profile_image": {
        "small": "https://images.unsplash.com/profile-1570351384870-d961b55c0688image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/profile-1570351384870-d961b55c0688image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/profile-1570351384870-d961b55c0688image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "Siraaj.mv",
      "total_collections": 0,
      "total_likes": 14,
      "total_photos": 40,
      "accepted_tos": true
    },
    "exif": {
      "make": "DJI",
      "model": "FC7203",
      "exposure_time": "1/2000",
      "aperture": "2.8",
      "focal_length": "4.5",
      "iso": 100
    },
    "location": {
      "title": "Amilla Fushi, Maldives",
      "name": "Amilla Fushi, Maldives",
      "city": null,
      "country": "Maldives",
      "position": {
        "latitude": 5.2347393,
        "longitude": 73.1120936
      }
    },
    "views": 359525,
    "downloads": 656
  }
];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getUserLikesData:
      return action.payload;
    default:
      return state;
  }
};