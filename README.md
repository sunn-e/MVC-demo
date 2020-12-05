# MVC demo

## Question

Please write a scrape in React.js (or if you dont know React in plain JS) and for backend use Node.js, Use Mongo or any database of your choice.
Can you scrape this page fineartamerica.com/shop/canvas+prints/frog
And list the program on your github and share before we schedule an interview?

## How this works/overview.

1. Fetch url html using Axios
2. Grab the needed elements using Cheerio.
3. Put those elements in our mongodb database.
4. Show whatever we scrapped on homepage"/", currently I'm just giving status 200 rather than redirecting to home. You can also see the progress in terminal.

## UI

1. Click `Scrape` button
2. Wait for app to do it's magic.
3. Either manually go to root upon "OK" status. Can uncomment `res.redirect` line to do it for you.

## Dependencies

`npm i express ejs expres-ejs-layouts mongoose`

### website request and fetching

`npm install axios cheerio`

- axios for http request.
- cheerio to parse dom.

### dev dep

`npm i --save-dev nodemon`

run `nodemon server.js` and open `localhost://4567` in any browser. I'm using firefox 83.0 (64-bit) on windows 10.

## License

All rights reserved till I put MIT or similar license here. :)
