import { getUserSharedData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("shareData")) || [
  {
    "id": "U5HAeXUv8ZM",
    "description": "I was taking a night drone flight over Portland and saw that vibrant green soccer field and had to take a photo. This is PGE Park in Portland, Oregon, home of our MLS team the Timbers. ",
    "urls": {
      "full": "https://images.unsplash.com/photo-1574561937874-23dd3e64dc89?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "regular": "https://images.unsplash.com/photo-1574561937874-23dd3e64dc89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
      "small": "https://images.unsplash.com/photo-1574561937874-23dd3e64dc89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
    },
    "likes": 25,
    "user": {
      "id": "C7T_sCdLU38",
      "username": "dmey503",
      "name": "Dan Meyers",
      "first_name": "Dan",
      "last_name": "Meyers",
      "twitter_username": "GoingOregoning",
      "portfolio_url": null,
      "bio": "I finally gave in and joined Instagram (@dmeyers503) where I'll upload additional photos from my PNW adventures. Won't you follow me? Every time someone follows me or likes a photo, my brain releases endorphins! Mmmmmm",
      "location": "Oregon",
      "profile_image": {
        "small": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "dmeyers503",
      "total_collections": 0,
      "total_likes": 1,
      "total_photos": 268,
      "accepted_tos": true
    }
  },
  {
    "id": "0470be78-a485-4755-8369-0851f796e2f8",
    "description": "look to this tree",
    "urls": {
      "full": "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
      "regular": "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
      "small": "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0"
    },
    "likes": 0,
    "user": {
      "id": "IIcufp54NL4",
      "username": "johannsiemens",
      "name": "Johann Siemens",
      "first_name": "Johann",
      "last_name": "Siemens",
      "twitter_username": "js_n_art",
      "portfolio_url": "http://jsnart.de/",
      "bio": null,
      "location": "Germany",
      "profile_image": {
        "small": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
        "medium": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        "large": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
      },
      "instagram_username": "js.n.art",
      "total_collections": 0,
      "total_likes": 4,
      "total_photos": 1,
      "accepted_tos": false
    },
    "time": "18:20 H/MN",
    "day": "02-08-2020"
  }
];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getUserSharedData_type:
      return action.payload;
    default:
      return state;
  }
};