import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


import login from './routes/login';
import getAcronyms from './routes/getAcronyms';
import getAcronym from './routes/getAcronym';
import getRandomAcronyms from './routes/getRandomAcronyms';
import createAcronym from './routes/createAcronym';
import updateAcronym from './routes/updateAcronym';
import deleteAcronym from './routes/deleteAcronym';

dotenv.config();
const app = express();
app.use(bodyParser.json())

app.get('/', function (_req, res) {
  res.send('hello world');
});

app.post('/login', login);
app.get('/acronym', getAcronyms);
app.get('/acronym/:key', getAcronym);
app.get('/random/:count', getRandomAcronyms);
app.post('/acronym', createAcronym);
app.put('/acronym/:key', updateAcronym);
app.delete('/acronym/:key', deleteAcronym);


app.listen(3000);
console.log('app started at port 3000');