import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

router.post('/', (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;

    WeatherService.getWeatherForCity(cityName).then((data) => {
      HistoryService.addCity(cityName);

      res.json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;