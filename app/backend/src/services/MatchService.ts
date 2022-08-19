import Team from '../database/models/team';
import Match from '../database/models/match';

// interface Iteam {
//   id: number,
//   teamName: string,
// }

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

  // findById = async (id: number): Promise<object> => {
  //   const getMatch = await Match.findByPk(id);
  //   return getMatch as object;
  // };
}

export default MatchService;
