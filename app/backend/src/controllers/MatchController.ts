import { Request, Response } from 'express';
import MatchService, { IMatch } from '../services/MatchService';
import JwtService from '../services/JwtService';

class MatchController {
  public service: MatchService;

  constructor(service: MatchService = new MatchService()) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const team = await this.service.findAll();
    return res.status(200).json(team);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'Authorization';
      throw e;
    }
    if (!authorization) {
      const e = new Error('Token not found!');
      e.name = 'Authorization';
      throw e;
    }
    await JwtService.validateToken(authorization);
    const team = await this.service.create(req.body as IMatch);
    return res.status(201).json(team);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.service.update(Number(id) as number);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoals(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.service.updateGoals(Number(id) as number, req.body);
    return res.status(200).json({ message: 'Match updated' });
  }
}

export = MatchController;
