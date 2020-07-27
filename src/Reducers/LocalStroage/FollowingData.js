import { getUserFollowingData_type } from '../../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("following")) || [
  {
    "id": "0HFrbtyEDUI",
    "username": "pthom__",
    "name": "Peter Thomas",
    "first_name": "Peter",
    "last_name": "Thomas",
    "twitter_username": null,
    "instagram_username": "pthom__",
    "portfolio_url": "http://www.peterthom.com",
    "location": "Riverside, CA",
    "bio": "Photographer and college student\r\nPrint Shop: https://peterthomas.pixieset.com/prints/\r\nEmail: Peterthomass82@gmail.com",
    "total_photos": 78,
    "total_likes": 0,
    "total_collections": 0,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "IHrsFOnXrsg",
    "username": "martzzl",
    "name": "Marcel Strauß",
    "first_name": "Marcel",
    "last_name": "Strauß",
    "twitter_username": "martzzl",
    "instagram_username": "martzzlstrauss",
    "portfolio_url": "https://www.martzzl.com",
    "location": "Stuttgart",
    "bio": "Age: 20 || Instagram: @martzzlstrauss",
    "total_photos": 522,
    "total_likes": 7316,
    "total_collections": 24,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1592552910276-a506d2e74e96image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1592552910276-a506d2e74e96image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1592552910276-a506d2e74e96image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "YdsTagGWsuU",
    "username": "matreding",
    "name": "Mat Reding",
    "first_name": "Mat",
    "last_name": "Reding",
    "twitter_username": "matreding",
    "instagram_username": "matreding",
    "portfolio_url": "https://www.instagram.com/matreding/",
    "location": "Paris",
    "bio": "Hey,  I'm French Photographer I share my best photo here ;)\r\n If you use my images and want to say thanks, feel free to buy me a coffee! 😊 buymeacoff.ee/matreding  ",
    "total_photos": 3051,
    "total_likes": 11616,
    "total_collections": 32,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1595107648252-e6602a979cfeimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1595107648252-e6602a979cfeimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1595107648252-e6602a979cfeimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "IFcEhJqem0Q",
    "username": "anniespratt",
    "name": "Annie Spratt",
    "first_name": "Annie",
    "last_name": "Spratt",
    "twitter_username": "anniespratt",
    "instagram_username": "anniespratt",
    "portfolio_url": "https://anniespratt.com",
    "location": "New Forest National Park, UK",
    "bio": "Hobbyist photographer from England, sharing my digital and film photos along with vintage slide scans.  \r\nClick the 'Collections' tab below to view my images in handy folders 💛",
    "total_photos": 9935,
    "total_likes": 14632,
    "total_collections": 89,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1508107410047-a34950174b6b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1508107410047-a34950174b6b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1508107410047-a34950174b6b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "5-ZZGSepYuk",
    "username": "jonathanborba",
    "name": "Jonathan Borba",
    "first_name": "Jonathan",
    "last_name": "Borba",
    "twitter_username": null,
    "instagram_username": "jonathansborba",
    "portfolio_url": "https://instagram.com/jonathansborba",
    "location": "Brazil",
    "bio": "I challenge you to donate $1 per download.  I you want to give more feel free.\r\n PayPal: jonathanborba@yahoo.com.br",
    "total_photos": 1067,
    "total_likes": 3617,
    "total_collections": 20,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-fb-1545341021-62b8ffa131d9.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-fb-1545341021-62b8ffa131d9.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-fb-1545341021-62b8ffa131d9.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "BjS1-jEoEOY",
    "username": "mirandanene",
    "name": "Leonardo Miranda",
    "first_name": "Leonardo",
    "last_name": "Miranda",
    "twitter_username": null,
    "instagram_username": "mirandanene",
    "portfolio_url": null,
    "location": "Rio Claro SP",
    "bio": "Rio Claro - SP | Brazil - did you like my photos? follow me on instagram @mirandanene",
    "total_photos": 41,
    "total_likes": 27,
    "total_collections": 0,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1568123416561-f6f0e3de39bcimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1568123416561-f6f0e3de39bcimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1568123416561-f6f0e3de39bcimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "TUPb7yjQCt4",
    "username": "junscythe",
    "name": "Jeanson Wong",
    "first_name": "Jeanson",
    "last_name": "Wong",
    "twitter_username": null,
    "instagram_username": "Junscythe ",
    "portfolio_url": null,
    "location": null,
    "bio": null,
    "total_photos": 75,
    "total_likes": 146,
    "total_collections": 0,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1574045141066-6315c581a987image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1574045141066-6315c581a987image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1574045141066-6315c581a987image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "bvARgV6iDeY",
    "username": "blackpoetry",
    "name": "pixpoetry",
    "first_name": "pixpoetry",
    "last_name": null,
    "twitter_username": null,
    "instagram_username": null,
    "portfolio_url": "http://www.ericmasur.com",
    "location": null,
    "bio": null,
    "total_photos": 55,
    "total_likes": 126,
    "total_collections": 1,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1568617518246-c317ced77f56image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-1568617518246-c317ced77f56image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-1568617518246-c317ced77f56image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  },
  {
    "id": "QDfJp9sc8LY",
    "username": "leemckenzieluis",
    "name": "Lee Luis",
    "first_name": "Lee",
    "last_name": "Luis",
    "twitter_username": null,
    "instagram_username": "leemckenzieluis",
    "portfolio_url": null,
    "location": null,
    "bio": "Find me on Instagram @ leemckenzieluis",
    "total_photos": 33,
    "total_likes": 10,
    "total_collections": 0,
    "profile_image": {
      "small": "https://images.unsplash.com/profile-fb-1570322061-02b5741c9de3.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
      "medium": "https://images.unsplash.com/profile-fb-1570322061-02b5741c9de3.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
      "large": "https://images.unsplash.com/profile-fb-1570322061-02b5741c9de3.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
    },
    "accepted_tos": true
  }
];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getUserFollowingData_type:
      return action.payload;
    default:
      return state;
  }
};