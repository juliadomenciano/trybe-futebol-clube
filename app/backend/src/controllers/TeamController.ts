import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  public service: TeamService;

  constructor(service: TeamService = new TeamService()) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const team = await this.service.findAll();
    return res.status(200).json(team);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const team = await this.service.findById(Number(id));
    return res.status(200).json(team);
  }

}

export = TeamController;
