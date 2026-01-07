import express from 'express';
import { getAutoCompleteSuggestionsHandler } from '../../controllers/map.controller.js';
import { getFareHandler } from '../../controllers/booking.controller.js';


const mapRouter = express.Router();


mapRouter.get('/suggestions',getAutoCompleteSuggestionsHandler);
mapRouter.get('/get-fare',getFareHandler);

export default mapRouter;
