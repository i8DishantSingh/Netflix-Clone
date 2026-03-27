import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(5000, () => {
    console.log('Server is running of port 3000');
})