# App Structure
A structure is an arrangement and organization of code best practices to make it easy to read

## Content
- Public
- Actions
- Reducers
- API
- Component

## Public
- **_redirects** file is way to use routes in netlify
- **index.html** render the views of React app
- files .png, .ico, .svg render the logo app of **Mikta**

## Actions
- Actions are the only source of information for the store as per Redux official documentation
- Functions that Create, Updata, Read, and Delete data

## Reducers
- A reducer is a function that determines changes to an application's state. It uses the action it receives to determine this change
- Redux relies heavily on reducer functions that take the previous state and an action in order to execute the next state.

## API
- **News.js** display the Hackernews top stories
- **Server.js** connect to the mikta nodejs server to fetch users from MongoDB
- **Unsplash.js** generate photos, users, collections

## Component
- **App.js** display the logic of the routes to serve files based on paths, and asynchronously check whether the user is logged in.
- **ThirdParty-Library/Lazy Image** is a way to render low-quality images while you are waiting for the real image mount.
