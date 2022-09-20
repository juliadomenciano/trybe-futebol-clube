import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  public service: LeaderboardService;

  constructor(service: LeaderboardService = new LeaderboardService()) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.service.findAll();
    return res.status(200).json(leaderboard);
  }
}

export = LeaderboardController;
