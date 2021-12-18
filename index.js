const express = require('express');
const userRouter = require('./src/api/router/userRouter');
const loginRouter = require('./src/api/router/loginRouter');
const categoriesRouter = require('./src/api/router/categoriesRouter');
const postRouter = require('./src/api/router/postRouter');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening PORT ${PORT}`));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

module.exports = app;
