const express = require('express');
const userRouter = require('./src/api/router/userRouter');
const loginRouter = require('./src/api/router/loginRouter');
const categoriesRouter = require('./src/api/router/categoriesRouter');
const postRouter = require('./src/api/router/postRouter');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
