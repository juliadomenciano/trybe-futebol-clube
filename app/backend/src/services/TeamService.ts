import Team from '../database/models/team';

class TeamService {
  findAll = async (): Promise<object> => {
    const getTeam = await Team.findAll();
    return getTeam;
  };

  findById = async (id: number): Promise<object> => {
    const getTeam = await Team.findByPk(id);
    return getTeam as object;
  };
}

export default TeamService;
