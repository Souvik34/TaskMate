import express from 'express';
const app = express();
import dotenv from 'dotenv';

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, () => {
    console.log(`Server running at:`, PORT)
})