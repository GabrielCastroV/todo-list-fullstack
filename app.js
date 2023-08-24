require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectó a mongodb');
    } catch (error) {
        console.error(error);
        console.log('No contectado con mongodb');
    }
})();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Rutas Front-End
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/todos', express.static(path.resolve(__dirname, 'views', 'todos')));
app.use('/verify/:id/:token', express.static(path.resolve(__dirname, 'views', 'verify')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/images', express.static(path.resolve(__dirname, 'img')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));

app.use(morgan('tiny'));

// Rutas Back-End

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', userExtractor, todosRouter);

module.exports = app;