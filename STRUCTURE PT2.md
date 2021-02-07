# App Structure
A structure is an arrangement and organization of code best practices to make it easy to read

## Content
- Explore
- Header
- Pages

## Explore
- Display the **UserList** and the **hackernews** top stories
- **UserList** display **Welcom.js**, **NewPost.js**, and **randomImages**
- **Welcom.js** display greeting for the current user
- **NewPost.js** let you create text posts, posts with imagess
- **randomImages** display 5 random images with a nice user grid, plus the ability to comment on a post

## Header
- Has the ability to search images
- Has the ability to sign up, log in, logout
- Has the ability to visit the profile, settings, and the explore page

## Pages
- **NotFound** is a page you can visit it when you type a path that doesn't exist
- **Contact us** is a page to contact the app author
  - *(/contact)*
- **License** is a page that describe the app license
  - *(/license)*
- **Search** is a page that let you search images
  - *(/s/photos/:title)*
- **User** is a page for user profile that uses 3 pages paths
  - user uploaded photos path *(/@:username)*
  - user likes path *(/@:username/likes)*
  - user collections path *(/@:username/collections)*
- **Home** is a page for the logged user profile that uses 3 pages paths
  - user shared path *(/home)*
  - user likes path *(/home/likes)*
  - user collections path *(/home/collections)*
- **Edit Account** is a page that let you edit your info
  - *(/account)*
  - *(/account/password)*
  - *(/account/close])*
- **Collections Photos** is a page that shows the user collection photos of a specific collection
  - *(/collections/:id)*
  - *(/collections/:id/:title)*
  - *(/collections/:id/:title/:ib)*
