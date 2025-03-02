const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));----This one is for express
// console.log(process.env);----This is for node core

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`.bold.bgYellow);
});
