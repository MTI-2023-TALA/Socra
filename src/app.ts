import { ParcoursController } from './parcours/parcours.controller';
import { ParcoursRepository } from './parcours/parcours.repository';
import { ParcoursRoute } from './parcours/parcours.route';
import { ParcoursService } from './parcours/parcours.service';
import express from 'express';

export const app = express();

app.use(express.json());

new ParcoursRoute(new ParcoursController(new ParcoursService(new ParcoursRepository())));
