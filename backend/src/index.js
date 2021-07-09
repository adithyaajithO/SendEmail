require('./models/User');
require('./models/Admin');

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mailRoutes = require('./routes/mailRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../uploads')));

app.use(authRoutes);
app.use(userRoutes);
app.use(mailRoutes);

const mongoUri = 'mongodb+srv://admin:pass123@cluster0.4o9hf.gcp.mongodb.net/usersEmail?retryWrites=true&w=majority';
// const mongoUri = 'mongodb+srv://admin:P@ssw0rd@cluster0.q8pju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (e) => {
    console.error('Error in connecting to mongo instance', e);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Your userName is ${req.user.userName}`);
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});