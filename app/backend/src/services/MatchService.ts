import Team from '../database/models/team';
import Match from '../database/models/match';

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number
}

class MatchService {
  findAll = async (): Promise<Match[]> => {
    const getMatch = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'] },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'] },
      ],

    });

    return getMatch;
  };

  create = async (data: IMatch): Promise<Match> => {
    const { homeTeam, awayTeam } = data;
    const homeId = await Team.findByPk(homeTeam);
    const awayId = await Team.findByPk(awayTeam);
    console.log(homeId);
    if (!homeId || !awayId) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError';
      console.log(e);
      throw e;
    }
    const match = { ...data, inProgress: true };
    const getMatch = await Match.create(match);
    console.log(getMatch.id);
    return getMatch;
  };

  update = async (id: number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  updateGoals = async (id: number, data: object): Promise<void> => {
    await Match.update(data, { where: { id } });
  };
}

export default MatchService;
