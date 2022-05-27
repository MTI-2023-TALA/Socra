import { connectToDatabase } from './mongo';
import express from 'express';

export const app = express();
const port = 3000;

app.use(express.json());
connectToDatabase();

app.listen(port, () => {
  console.log(`Socra app listening on port ${port}!`);
});
