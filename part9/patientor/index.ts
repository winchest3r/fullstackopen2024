import express from 'express';
const app = express();

app.use(express.json());
app.use(express.static('dist'));

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
