# aniseed

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
LINK DEPLOYMENT: https://aniseed-1997.netlify.app

Stages/Requirements:
Basic requirement: 
- [x] Display the list of anime on the home page. Implement infinite scrolling on the list. Feel free to add as much information as you like on the list.
- [x] Display the details of an anime on /anime/{id}, accessible through the list. 
- [x] You must display a cover image of the anime.
- [x] At minimum, include the title, description, genres and average score on the detail page. Other information is optional to implement.
- [x] No need to implement links for the genres.
- [x] Create a filter feature based on genres for the anime list.
- [x] Create a bookmark feature. Users can bookmark their favorite anime when opening the detail page. Display the bookmark list on a dedicated page, and add an entry point to that page on the home page.

- [x] (Optional) Plus if you can build the homepage based on the most trending order.
- [x] (Optional) Big plus if you add some unit testing in your project.
- [x] (Optional) Big plus if you can implement offline capabilities with PWA/Service Workers.
- [x] Show an offline warning on the page when the user device is offline.
- [x] Cache the visited pages so the user can still see them when their device is offline. Show an offline warning/content unavailable if content is not cached. You can choose any way of storing and accessing this data client-side (dynamic caching through Service Worker, storing response on localStorage/indexedDB, etc).

