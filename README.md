# nodejs-wood-snake-fortune-teller 
An Example of using `Fetch` to get data via an API endpoint.

## Modules
- `npm install --save express`
- `npm install --save express-handlebars`
- `npm install --save body-parser` (deprecated)
- `npm install --save node-fetch@2` (use this version so we can use this the "traditional" way)

## Routes
- `/`: Default. Displays the form.
- `fortune`: POST. This is run when form is submitted. Data from the form is used as a prompt for `ChatGPT`.
- `500`: This is run when an error occurs.
- `404`: This is run when the requested route does not exist.

## Views
- `main.handlebars`: Parent layout for all other views.
- `form.handlebars`: Form for gathering input.
- `500.handlebars`: Displays error.
- `400.handlebars`: Displays 404.

## Assets
- `img/snake.jpg`
- `js/functions.js`
- `css/styles.css`
