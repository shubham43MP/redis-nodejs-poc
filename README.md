# Nodejs Redis based User Management POC

## This app is only for demonstration purposes for how to integrate Redis with the Express App

### Pre-requisites (Installation)
 * Redis
 * Nodejs
 * Yarn/NPM

## Commands
 * `yarn` OR  `npm install`
 * `yarn start`  OR  `npm run start`


## First Interaction
 * After server starts, check whether you get `Server started on 3000` and `REDIS CONNECTED` at server logs
 * If you get above logs after starting the application, you are good to go! Kudos!
 * Open the localhost:3000 in browser to see an interactive webpage.
 * Use redis-cli to create a user - command is given as under
 > `HMSET user001 first_name "Munshi" last_name "Premchand" email "munshi.writer@bestone.com" phone "123456789"`
 * Search with user001 and other users to see the nuances and your POC is done.

## To be noted
 * Redis is a great tool for caching and stuff in backend. It can use disk space as a pseudo db like utility
 * Views provided by handlebar templating is just for demonstration purposes. We can make direct API calls too.
 * Redis can be further explored in detail [here](https://redis.io/)
