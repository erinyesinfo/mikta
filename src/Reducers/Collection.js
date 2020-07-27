import { getCollection } from '../Actions/types.js';

const INIALSTATE = JSON.parse(localStorage.getItem("CollectionData")) || [
  {
    "id": "f3056ef",
    "name": "amazing",
    "preview": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
    "preview_photos": [
      {
        "id": "e47f1fb9-b689-4c5b-958d-8ad7175214c3",
        "created_at": "2018-02-12T23:33:34-05:00",
        "width": 3648,
        "height": 5472,
        "description": "look to this tree",
        "alt_description": "sun light passing through green leafed tree",
        "urls": {
          "full": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
          "regular": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
          "small": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0"
        },
        "likes": 0,
        "user": {
          "id": "fbPZwdKgWWs",
          "username": "jeremybishop",
          "name": "Jeremy Bishop",
          "first_name": "Jeremy",
          "last_name": "Bishop",
          "twitter_username": null,
          "portfolio_url": "http://jeremybishopphotography.com",
          "bio": "I love supporting and inspiring creatives around the world.\r\nMy passion is the ocean and water photography, and I am striving to make an impact to save our Oceans and our Reefs!\r\n",
          "location": "California",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1475405901109-04b2f633a548?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1475405901109-04b2f633a548?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1475405901109-04b2f633a548?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "bluumind",
          "total_collections": 19,
          "total_likes": 3842,
          "total_photos": 827,
          "accepted_tos": true
        }
      },
      {
        "id": "daI3bMiVYd8",
        "created_at": "2019-11-12T22:20:09-05:00",
        "width": 4000,
        "height": 6000,
        "color": "#F4F5F9",
        "description": null,
        "alt_description": "road beside red trees",
        "urls": {
          "full": "https://images.unsplash.com/photo-1573615168235-5b20c7c642ce?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
          "regular": "https://images.unsplash.com/photo-1573615168235-5b20c7c642ce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
          "small": "https://images.unsplash.com/photo-1573615168235-5b20c7c642ce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0"
        },
        "likes": 477,
        "user": {
          "id": "YR_kUAmnr18",
          "username": "trapnation",
          "name": "Andre Benz",
          "first_name": "Andre",
          "last_name": "Benz",
          "twitter_username": "AllTrapNation",
          "portfolio_url": null,
          "bio": "Music & photo lover, founder of Trap Nation, Sony & Canon advocate.",
          "location": "New York, NY.",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1513183198594-66e21a4cfe3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1513183198594-66e21a4cfe3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1513183198594-66e21a4cfe3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "benz",
          "total_collections": 2,
          "total_likes": 95,
          "total_photos": 187,
          "accepted_tos": true
        },
        "exif": {
          "make": "SONY",
          "model": "ILCE-7M3",
          "exposure_time": "1/640",
          "aperture": "2.8",
          "focal_length": "54.0",
          "iso": 100
        },
        "location": {
          "title": "Going-to-the-Sun Road, West Glacier, MT, USA",
          "name": "Going-to-the-Sun Road, West Glacier, MT, USA",
          "city": null,
          "country": "United States",
          "position": {
            "latitude": 48.6787003,
            "longitude": -113.6545789
          }
        },
        "views": 9480485,
        "downloads": 7222
      },
      {
        "id": "SzE-EUQynn0",
        "created_at": "2019-12-04T00:56:52-05:00",
        "width": 4160,
        "height": 6240,
        "description": "Bibliothek am Mailänder Platz in Stuttgart.",
        "alt_description": "interior library scnery",
        "urls": {
          "full": "https://images.unsplash.com/photo-1575438922952-8ebd22b0bc1f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "regular": "https://images.unsplash.com/photo-1575438922952-8ebd22b0bc1f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "small": "https://images.unsplash.com/photo-1575438922952-8ebd22b0bc1f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0"
        },
        "likes": 110,
        "user": {
          "id": "IHrsFOnXrsg",
          "username": "martzzl",
          "name": "Marcel Strauß",
          "first_name": "Marcel",
          "last_name": "Strauß",
          "twitter_username": "martzzl",
          "portfolio_url": "https://www.martzzl.com",
          "bio": "Age: 19 || Instagram: @martzzlstrauss",
          "location": "Stuttgart",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1568185654581-9595b4995806image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1568185654581-9595b4995806image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1568185654581-9595b4995806image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "martzzlstrauss",
          "total_collections": 13,
          "total_likes": 383,
          "total_photos": 217,
          "accepted_tos": true
        }
      },
      {
        "id": "N-oqUcG_ymc",
        "created_at": "2019-11-09T15:33:42-05:00",
        "width": 7289,
        "height": 4862,
        "color": "#2E2C26",
        "description": null,
        "alt_description": "gray concrete road",
        "urls": {
          "full": "https://images.unsplash.com/photo-1573331519198-12325f010ae2?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "regular": "https://images.unsplash.com/photo-1573331519198-12325f010ae2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "small": "https://images.unsplash.com/photo-1573331519198-12325f010ae2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0"
        },
        "likes": 89,
        "user": {
          "id": "0HFrbtyEDUI",
          "username": "pthom__",
          "name": "Peter Thomas",
          "first_name": "Peter",
          "last_name": "Thomas",
          "twitter_username": null,
          "portfolio_url": "http://www.peterthom.com",
          "bio": "Photographer and college student\r\nEmail: Peterthomass82@gmail.com",
          "location": "Riverside, CA",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1569099570857-610048e4de33image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "pthom__",
          "total_collections": 0,
          "total_likes": 0,
          "total_photos": 53,
          "accepted_tos": true
        }
      },
      {
        "id": "azQkreSQxq4",
        "created_at": "2019-12-05T06:25:00-05:00",
        "width": 3456,
        "height": 5184,
        "description": null,
        "alt_description": "red tree and bare trees scenery",
        "urls": {
          "full": "https://images.unsplash.com/photo-1575545089039-83a2996bc342?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "regular": "https://images.unsplash.com/photo-1575545089039-83a2996bc342?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "small": "https://images.unsplash.com/photo-1575545089039-83a2996bc342?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0"
        },
        "likes": 6,
        "user": {
          "id": "YdsTagGWsuU",
          "username": "matreding",
          "name": "Mat Reding",
          "first_name": "Mat",
          "last_name": "Reding",
          "twitter_username": "matreding",
          "portfolio_url": "https://www.instagram.com/matreding/",
          "bio": "Hey,  I'm French Photographer I share my best photo here ;)\r\nig: matreding",
          "location": "Paris",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "matreding",
          "total_collections": 20,
          "total_likes": 7318,
          "total_photos": 1842,
          "accepted_tos": true
        }
      },
      {
        "id": "SlvTZqa2nfk",
        "created_at": "2019-12-05T06:24:38-05:00",
        "width": 3456,
        "height": 5184,
        "description": null,
        "alt_description": "foggy pathway surrounded by bare trees",
        "urls": {
          "full": "https://images.unsplash.com/photo-1575545060997-573ee2814b2b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "regular": "https://images.unsplash.com/photo-1575545060997-573ee2814b2b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "small": "https://images.unsplash.com/photo-1575545060997-573ee2814b2b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0"
        },
        "likes": 11,
        "user": {
          "id": "YdsTagGWsuU",
          "username": "matreding",
          "name": "Mat Reding",
          "first_name": "Mat",
          "last_name": "Reding",
          "twitter_username": "matreding",
          "portfolio_url": "https://www.instagram.com/matreding/",
          "bio": "Hey,  I'm French Photographer I share my best photo here ;)\r\nig: matreding",
          "location": "Paris",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1572301339228-f8f08c23c6daimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "matreding",
          "total_collections": 20,
          "total_likes": 7318,
          "total_photos": 1842,
          "accepted_tos": true
        }
      },
      {
        "id": "wXt0DiISf38",
        "created_at": "2018-10-22T06:00:30-04:00",
        "width": 3031,
        "height": 5388,
        "description": "The gentle beasts, they harm no human and no corals but they try their best to bring life back to the oceans. This one is a small Whale shark just 4 meters. they can grow up to 12 meters and each have a unique identity dots on a side near their head. just like humans differentiate with finger prints. they can’t talk to us but I think it’s time for us humans to stop harming our oceans. No Ocean No Planet. As a fellow human who have seeing these I warn and remind you all to stop harming our planet to make money. We are wasting so much resources.",
        "alt_description": "black fish at water",
        "urls": {
          "full": "https://images.unsplash.com/photo-1540202404-b2979d19ed37?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNDY3MX0",
          "regular": "https://images.unsplash.com/photo-1540202404-b2979d19ed37?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNDY3MX0",
          "small": "https://images.unsplash.com/photo-1540202404-b2979d19ed37?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDY3MX0"
        },
        "likes": 634,
        "user": {
          "id": "cYNNst8ZosY",
          "username": "seefromthesky",
          "name": "Ishan @seefromthesky",
          "first_name": "Ishan",
          "last_name": "@seefromthesky",
          "twitter_username": "SeefromtheSky",
          "portfolio_url": "http://www.instagram.com/seefromthesky",
          "bio": "‎لآ اِلَهَ اِلّا اللّهُ مُحَمَّدٌ رَسُوُل اللّهِ\r\n ••• \r\nPeace and love. 🇲🇻 #seefromthesky\r\n📧 ishan@seefromthesky.com\r\n",
          "location": "maldives",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1470411901970-0f48a5d5e958?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1470411901970-0f48a5d5e958?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1470411901970-0f48a5d5e958?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "seefromthesky",
          "total_collections": 0,
          "total_likes": 59,
          "total_photos": 102,
          "accepted_tos": true
        }
      }
    ],
    "img": {
      "description": "look to this tree",
      "urls": {
        "full": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
        "regular": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0",
        "small": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTQ2NX0"
      }
    },
    "ib": "27d903bb-d940-413f-84fc-acd659522d91"
  },
  {
    "id": "17003ca",
    "name": "cars",
    "preview": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
    "preview_photos": [
      {
        "id": "u6BPMXgURuI",
        "created_at": "2016-08-17T20:25:59-04:00",
        "width": 4800,
        "height": 2092,
        "description": "Porsche 911 on a rainy evening",
        "alt_description": "gray Porsche car on road",
        "urls": {
          "full": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 828,
        "user": {
          "id": "exx823Z-Xis",
          "username": "gabrielgurrola",
          "name": "Gabriel Gurrola",
          "first_name": "Gabriel",
          "last_name": "Gurrola",
          "twitter_username": "gabrielgurrola",
          "portfolio_url": "http://gabrielgurrola.com",
          "bio": "Principal at www.nuu.co",
          "location": "Houston, TX",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1542597981493-f67dc58f598d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1542597981493-f67dc58f598d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1542597981493-f67dc58f598d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "gabrielgurrola",
          "total_collections": 0,
          "total_likes": 7,
          "total_photos": 26,
          "accepted_tos": true
        }
      },
      {
        "id": "f_SDCASisgs",
        "created_at": "2017-08-26T04:33:38-04:00",
        "width": 2720,
        "height": 2040,
        "description": "Ferrari 70th anniversary drive",
        "alt_description": "panning photography of Ferrari 458 on road",
        "urls": {
          "full": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 228,
        "user": {
          "id": "9sIFlrvaTt8",
          "username": "gohrhyyan",
          "name": "Goh Rhy Yan",
          "first_name": "Goh",
          "last_name": "Rhy Yan",
          "twitter_username": null,
          "portfolio_url": "http://gryshoots.wixsite.com/home",
          "bio": "[SINGAPORE]",
          "location": "Singapore",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1564390760623-3b5e38a85d75?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1564390760623-3b5e38a85d75?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1564390760623-3b5e38a85d75?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "gohrhy",
          "total_collections": 1,
          "total_likes": 15,
          "total_photos": 134,
          "accepted_tos": true
        }
      },
      {
        "id": "N9Pf2J656aQ",
        "created_at": "2017-05-15T23:48:22-04:00",
        "width": 5760,
        "height": 3840,
        "description": "Just wondering how my photography of my car does on unsplash",
        "alt_description": "black Ford Mustang GT",
        "urls": {
          "full": "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 496,
        "user": {
          "id": "1NNUgAxib30",
          "username": "lance_asper",
          "name": "Lance Asper",
          "first_name": "Lance",
          "last_name": "Asper",
          "twitter_username": "Lance_Asper",
          "portfolio_url": "http://www.lanceasper.com",
          "bio": "Video Producer / Licensed  Drone pilot / Photographer /  www.lanceasper.com",
          "location": "Jacksonville, florida",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1578102928215-3bc0cf50442bimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1578102928215-3bc0cf50442bimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1578102928215-3bc0cf50442bimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "Lance_Asper",
          "total_collections": 0,
          "total_likes": 276,
          "total_photos": 71,
          "accepted_tos": true
        }
      },
      {
        "id": "SZhqWnmBhRA",
        "created_at": "2018-07-22T03:39:59-04:00",
        "width": 4000,
        "height": 6000,
        "description": "Exotic Car",
        "alt_description": "white and red Ford Mustang",
        "urls": {
          "full": "https://images.unsplash.com/photo-1532245128003-3db26c775465?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1532245128003-3db26c775465?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1532245128003-3db26c775465?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 135,
        "user": {
          "id": "b1Tsv7nLkTA",
          "username": "rithwickpr",
          "name": "rithwick. pr",
          "first_name": "rithwick.",
          "last_name": "pr",
          "twitter_username": "@rithwickpr",
          "portfolio_url": null,
          "bio": "💻Designer 📸Photographer\r\n\r\n Instagram: @rithwick.pr",
          "location": "Dubai,UAE",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1531910772068-4c3b0d24220d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1531910772068-4c3b0d24220d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1531910772068-4c3b0d24220d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "rithwick.pr",
          "total_collections": 0,
          "total_likes": 11,
          "total_photos": 16,
          "accepted_tos": true
        }
      },
      {
        "id": "m3m-lnR90uM",
        "created_at": "2017-04-14T00:59:12-04:00",
        "width": 5357,
        "height": 3164,
        "description": "I shot this while doing a job for a luxury automotive storage facility in Baltimore, MD. I wanted to create an ominous sense of intrigue, giving the feeling of a space that was both expansive and enclosed. I enjoy the journey my eyes take from the focal point of the headlamps to the contours of the Camero’s body, and then to the backdrop of stacked automobiles.",
        "alt_description": "white car",
        "urls": {
          "full": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 792,
        "user": {
          "id": "9aTMQdp_Djo",
          "username": "peterbroomfield",
          "name": "Peter Broomfield",
          "first_name": "Peter",
          "last_name": "Broomfield",
          "twitter_username": null,
          "portfolio_url": "http://workingdesignstudio.com/",
          "bio": null,
          "location": "Baltimore, MD",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-fb-1484539966-12de6566b969.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-fb-1484539966-12de6566b969.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-fb-1484539966-12de6566b969.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "pnbroom",
          "total_collections": 36,
          "total_likes": 127,
          "total_photos": 1,
          "accepted_tos": true
        }
      }
    ],
    "img": {
      "description": "Porsche 911 on a rainy evening",
      "urls": {
        "full": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
        "regular": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
        "small": "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
      }
    },
    "ib": "b56075d9-9db3-4257-a475-ddf3eda8be49"
  },
  {
    "id": "7a523f6",
    "name": "cats",
    "preview": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
    "preview_photos": [
      {
        "id": "sQlAe-3AFPA",
        "created_at": "2019-12-08T09:17:20-05:00",
        "width": 6000,
        "height": 4000,
        "description": "Cat starring",
        "alt_description": "short-fur gray cat",
        "urls": {
          "full": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
          "regular": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
          "small": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
        },
        "likes": 56,
        "user": {
          "id": "IPXJAnYBKHk",
          "username": "julianhochgesang",
          "name": "Julian Hochgesang",
          "first_name": "Julian",
          "last_name": "Hochgesang",
          "twitter_username": null,
          "portfolio_url": "http://julianhochgesang.de/",
          "bio": "Contemporary and slowing photography in a modern, fast moving world.",
          "location": "Bavaria, Germany",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1562792613192-dbd072779970?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1562792613192-dbd072779970?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1562792613192-dbd072779970?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "julian_hochgesang",
          "total_collections": 4,
          "total_likes": 1204,
          "total_photos": 216,
          "accepted_tos": true
        },
        "exif": {
          "make": "SONY",
          "model": "ILCE-7",
          "exposure_time": "1/250",
          "aperture": "4",
          "focal_length": "200.0",
          "iso": 1000
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
        "views": 75402,
        "downloads": 401
      },
      {
        "id": "eFJfJkufGCU",
        "created_at": "2019-05-23T11:29:03-04:00",
        "width": 5472,
        "height": 3648,
        "description": null,
        "alt_description": "pet cat beside leaves",
        "urls": {
          "full": "https://images.unsplash.com/photo-1558625316-286c594efea7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "regular": "https://images.unsplash.com/photo-1558625316-286c594efea7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0",
          "small": "https://images.unsplash.com/photo-1558625316-286c594efea7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMjc2Mn0"
        },
        "likes": 21,
        "user": {
          "id": "JLgaUEOsBp4",
          "username": "sindystrife",
          "name": "Sindy Strife",
          "first_name": "Sindy",
          "last_name": "Strife",
          "twitter_username": null,
          "portfolio_url": null,
          "bio": "I add meaning and remove noise.",
          "location": "Slovenia",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": null,
          "total_collections": 2,
          "total_likes": 10,
          "total_photos": 53,
          "accepted_tos": true
        }
      },
      {
        "id": "W8iQBo22Mp4",
        "created_at": "2019-06-03T08:17:04-04:00",
        "width": 5472,
        "height": 3648,
        "description": null,
        "alt_description": "black and white kitten",
        "urls": {
          "full": "https://images.unsplash.com/photo-1559564207-09c99dc78a70?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1559564207-09c99dc78a70?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1559564207-09c99dc78a70?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 146,
        "user": {
          "id": "JLgaUEOsBp4",
          "username": "sindystrife",
          "name": "Sindy Strife",
          "first_name": "Sindy",
          "last_name": "Strife",
          "twitter_username": null,
          "portfolio_url": null,
          "bio": "I add meaning and remove noise.",
          "location": "Slovenia",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1553544122600-423782378b11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": null,
          "total_collections": 2,
          "total_likes": 10,
          "total_photos": 53,
          "accepted_tos": true
        }
      },
      {
        "id": "9_G_-HfY5Kg",
        "created_at": "2019-06-26T13:48:19-04:00",
        "width": 5472,
        "height": 3648,
        "description": "Neighbors princess ... :-) ",
        "alt_description": "brown Persian cat walking",
        "urls": {
          "full": "https://images.unsplash.com/photo-1561571284-4e29efba8972?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1561571284-4e29efba8972?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1561571284-4e29efba8972?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 27,
        "user": {
          "id": "XZDJrfKzdWY",
          "username": "eberhardgross",
          "name": "eberhard grossgasteiger",
          "first_name": "eberhard",
          "last_name": "grossgasteiger",
          "twitter_username": "eberhardgross",
          "portfolio_url": "http://instagram.com/eberhard_grossgasteiger",
          "bio": "photography is the addiction to amaze others - paired whit a dash of soul!                     \r\n\r\n\r\n\r\n\r\n",
          "location": "Ahrntal, South Tyrol, Italy",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1536052438125-133137ad2359?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1536052438125-133137ad2359?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1536052438125-133137ad2359?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "eberhard_grossgasteiger",
          "total_collections": 5,
          "total_likes": 3126,
          "total_photos": 1171,
          "accepted_tos": true
        }
      },
      {
        "id": "t_Z5ND4Ce3k",
        "created_at": "2019-05-06T14:34:33-04:00",
        "width": 6720,
        "height": 4480,
        "description": null,
        "alt_description": "white and brown long-fur cat close-up photography",
        "urls": {
          "full": "https://images.unsplash.com/photo-1557166983-5939644443a0?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1557166983-5939644443a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1557166983-5939644443a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 34,
        "user": {
          "id": "qDcBzR3Ijp4",
          "username": "jdk4lyfe",
          "name": "Jeanie de Klerk",
          "first_name": "Jeanie",
          "last_name": "de Klerk",
          "twitter_username": null,
          "portfolio_url": "https://www.facebook.com/JeaniedeKlerkPhotography",
          "bio": "Auditing clerk with an arty hearty.",
          "location": "Pretoria, South Africa",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-fb-1556950529-a3c49a8b1d73.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-fb-1556950529-a3c49a8b1d73.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-fb-1556950529-a3c49a8b1d73.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "jeaniedeklerkphotography",
          "total_collections": 4,
          "total_likes": 0,
          "total_photos": 63,
          "accepted_tos": true
        }
      },
      {
        "id": "MNju0A6EeE0",
        "created_at": "2019-05-30T12:51:36-04:00",
        "width": 3600,
        "height": 2400,
        "description": null,
        "alt_description": "two silver tabby kittens",
        "urls": {
          "full": "https://images.unsplash.com/photo-1559235038-1b0fadf76f78?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1559235038-1b0fadf76f78?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1559235038-1b0fadf76f78?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 39,
        "user": {
          "id": "hzBuZwDQkxc",
          "username": "amybaugess",
          "name": "Amy Baugess",
          "first_name": "Amy",
          "last_name": "Baugess",
          "twitter_username": null,
          "portfolio_url": null,
          "bio": null,
          "location": "Columbus, Ohio",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-fb-1554227696-3afa4dab2fae.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-fb-1554227696-3afa4dab2fae.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-fb-1554227696-3afa4dab2fae.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": null,
          "total_collections": 0,
          "total_likes": 81,
          "total_photos": 47,
          "accepted_tos": true
        }
      },
      {
        "id": "pdALzg0yN-8",
        "created_at": "2019-01-29T17:58:09-05:00",
        "width": 3024,
        "height": 4032,
        "description": null,
        "alt_description": "cat sleeping on bed",
        "urls": {
          "full": "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 410,
        "user": {
          "id": "8Om_yzCmBfI",
          "username": "izandphil",
          "name": "Iz & Phil",
          "first_name": "Iz & Phil",
          "last_name": null,
          "twitter_username": null,
          "portfolio_url": "https://www.facebook.com/izandphil/",
          "bio": "A little bit of crazy, a lot of love, and some cats too, mixed with our adventures and life in Chicago!",
          "location": "Chicago, IL",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1548443633167-e9f83f7f29e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1548443633167-e9f83f7f29e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1548443633167-e9f83f7f29e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "philandiz",
          "total_collections": 0,
          "total_likes": 0,
          "total_photos": 43,
          "accepted_tos": true
        }
      }
    ],
    "img": {
      "description": "Cat starring",
      "urls": {
        "full": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "regular": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "small": "https://images.unsplash.com/photo-1575814599918-34d7d3df9373?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
      }
    },
    "ib": "f97541a5-716d-45e9-b351-6a49bb640c6f"
  },
  {
    "id": "6809f74",
    "name": "wonderfull",
    "preview": "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
    "preview_photos": [
      {
        "id": "kHP6Lfd8e_0",
        "created_at": "2018-12-04T19:06:40-05:00",
        "width": 7952,
        "height": 5304,
        "description": "South Beach",
        "alt_description": "vehicles parked beside sidewalk at daytime",
        "urls": {
          "full": "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 28,
        "user": {
          "id": "SSdsMwtkzbg",
          "username": "tuannguyen728",
          "name": "Tuan Nguyen",
          "first_name": "Tuan",
          "last_name": "Nguyen",
          "twitter_username": null,
          "portfolio_url": null,
          "bio": null,
          "location": null,
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1541360754974-f3062ddc751d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1541360754974-f3062ddc751d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1541360754974-f3062ddc751d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "Romeo0119",
          "total_collections": 0,
          "total_likes": 6,
          "total_photos": 52,
          "accepted_tos": true
        }
      },
      {
        "id": "nnzkZNYWHaU",
        "created_at": "2017-08-13T01:43:31-04:00",
        "width": 5309,
        "height": 3530,
        "description": null,
        "alt_description": "Eiffel Tower, Paris France",
        "urls": {
          "full": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 458,
        "user": {
          "id": "o-Lvl_IvuR4",
          "username": "chriskaridis",
          "name": "Chris Karidis",
          "first_name": "Chris",
          "last_name": "Karidis",
          "twitter_username": "ckaridis89",
          "portfolio_url": "https://www.instagram.com/chriskaridis/",
          "bio": "Amateur photographer from Corfu, Greece. Currently living in Thessaloniki, Greece. I usually do landscape photography. If you like my photos consider adding me on instagram: https://www.instagram.com/chriskaridis/",
          "location": "Thessaloniki, Greece",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1513065946967-ba0f8faa10d3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1513065946967-ba0f8faa10d3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1513065946967-ba0f8faa10d3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "chriskaridis",
          "total_collections": 12,
          "total_likes": 317,
          "total_photos": 33,
          "accepted_tos": true
        }
      },
      {
        "id": "WTPp4wgourk",
        "created_at": "2017-07-24T13:15:20-04:00",
        "width": 3094,
        "height": 4649,
        "description": null,
        "alt_description": "yellow car running on the street between the building during daytime",
        "urls": {
          "full": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 811,
        "user": {
          "id": "oadtZo3G3eM",
          "username": "robertbye",
          "name": "Robert Bye",
          "first_name": "Robert",
          "last_name": "Bye",
          "twitter_username": "RobJBye",
          "portfolio_url": "https://www.robjbye.com/",
          "bio": "Product Manager and Freelance Photographer in NYC",
          "location": "London",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1513354143387-2191349b9629?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1513354143387-2191349b9629?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1513354143387-2191349b9629?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "robjbye",
          "total_collections": 3,
          "total_likes": 119,
          "total_photos": 365,
          "accepted_tos": true
        }
      },
      {
        "id": "HDhdXFs9LTQ",
        "created_at": "2018-11-19T05:20:47-05:00",
        "width": 3785,
        "height": 5677,
        "description": "Photo taken from a helicopter over Central Park",
        "alt_description": "aerial view photography of city skyline",
        "urls": {
          "full": "https://images.unsplash.com/photo-1542622805-980533ee81ae?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1542622805-980533ee81ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1542622805-980533ee81ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 838,
        "user": {
          "id": "l8CX37-bWns",
          "username": "ts_imagery",
          "name": "Trent Szmolnik",
          "first_name": "Trent",
          "last_name": "Szmolnik",
          "twitter_username": null,
          "portfolio_url": "https://www.instagram.com/ts_imagery/",
          "bio": "Sydney, Australia. Canon 5D Mk III, IV and A1 35mm film camera. Instagram: @ts_imagery",
          "location": "Sydney, Australia",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1549191824556-8a4de96aaf3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1549191824556-8a4de96aaf3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1549191824556-8a4de96aaf3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "ts_imagery",
          "total_collections": 3,
          "total_likes": 153,
          "total_photos": 87,
          "accepted_tos": true
        }
      },
      {
        "id": "xaYaJAUr2n0",
        "created_at": "2019-07-25T17:48:14-04:00",
        "width": 6000,
        "height": 4000,
        "description": "Trump Tower over the Chicago River",
        "alt_description": "boats on sea viewing high-rise buildings",
        "urls": {
          "full": "https://images.unsplash.com/photo-1564091234306-c0e7dde8ce3a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1564091234306-c0e7dde8ce3a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1564091234306-c0e7dde8ce3a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 3,
        "user": {
          "id": "VXtzpXkiKB0",
          "username": "jimmydtt",
          "name": "Jimmy Tompkins",
          "first_name": "Jimmy",
          "last_name": "Tompkins",
          "twitter_username": "jimmydtt",
          "portfolio_url": null,
          "bio": "Wheaton College '23 - Christo et Regno Eius",
          "location": "Wheaton, Illinois",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1571540410267-d14c65b4e4e9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1571540410267-d14c65b4e4e9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1571540410267-d14c65b4e4e9image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "jimmydtt",
          "total_collections": 6,
          "total_likes": 262,
          "total_photos": 149,
          "accepted_tos": true
        }
      },
      {
        "id": "VmX3vmBecFE",
        "created_at": "2018-02-24T14:42:46-05:00",
        "width": 4912,
        "height": 6144,
        "description": "Caught this photo walking around after work. Streets were packed with cars and the sun was setting and it made me so glad that I was driving and could just be taking pictures.",
        "alt_description": "vehicles near buildings at night time",
        "urls": {
          "full": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "regular": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0",
          "small": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMzk3OH0"
        },
        "likes": 1052,
        "user": {
          "id": "JuqHbHtpPDE",
          "username": "maxwbender",
          "name": "Max Bender",
          "first_name": "Max",
          "last_name": "Bender",
          "twitter_username": null,
          "portfolio_url": "https://www.instagram.com/maxwbender/",
          "bio": "Say hi or start a project | DM or email | Stay lit fam",
          "location": "Chicago IL",
          "profile_image": {
            "small": "https://images.unsplash.com/profile-1541082497584-73f391a8da0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
            "medium": "https://images.unsplash.com/profile-1541082497584-73f391a8da0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
            "large": "https://images.unsplash.com/profile-1541082497584-73f391a8da0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          },
          "instagram_username": "maxwbender",
          "total_collections": 29,
          "total_likes": 1790,
          "total_photos": 186,
          "accepted_tos": true
        }
      }
    ],
    "img": {
      "description": "Finding my roots",
      "urls": {
        "full": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "regular": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "small": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
      }
    },
    "ib": "df03ca99-21c9-4d6e-b34c-52c426700570"
  },
  {
    "id": "5660f22",
    "name": "empty",
    "preview": "",
    "preview_photos": [],
    "img": {
      "description": null,
      "urls": {
        "full": "https://images.unsplash.com/photo-1572535958799-77dda6e8257e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "regular": "https://images.unsplash.com/photo-1572535958799-77dda6e8257e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ",
        "small": "https://images.unsplash.com/photo-1572535958799-77dda6e8257e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjQxMDQ3fQ"
      }
    },
    "ib": "724c9691-70bb-44a3-a42e-0161c3b2790a"
  }
];

export default (state = INIALSTATE, action) => {
  switch (action.type) {
    case getCollection:
      return action.payload;
    default:
      return state;
  }
};