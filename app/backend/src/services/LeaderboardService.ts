/* eslint-disable max-lines-per-function */
import Team from '../database/models/team';
import Match from '../database/models/match';

interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

class LeaderboardService {
  findAll = async ():Promise<ILeaderboard[]> => {
    const getAll = await Team.findAll();

    const leaderboard = await Promise.all(getAll.map(async (item) => {
      const matchesP1 = await Match.findAll({
        raw: true, where: { homeTeam: item.id, inProgress: false } });
      const matchesP2 = await Match.findAll({
        raw: true, where: { awayTeam: item.id, inProgress: false } });

      const teamGoalsP1 = matchesP1.reduce((a, b) => a + b.homeTeamGoals, 0);
      const teamGoalsP2 = matchesP2.reduce((a, b) => a + b.awayTeamGoals, 0);
      const awayGoalsP1 = matchesP1.reduce((a, b) => a + b.awayTeamGoals, 0);
      const awayGoalsP2 = matchesP2.reduce((a, b) => a + b.homeTeamGoals, 0);
      const goalsFavor = teamGoalsP1 + teamGoalsP2;
      const goalsOwn = awayGoalsP1 + awayGoalsP2;

      const homeVictories = matchesP1.filter((hVictories) =>
        hVictories.homeTeamGoals > hVictories.awayTeamGoals);
      const awayVictories = matchesP2.filter((aVictories) =>
        aVictories.awayTeamGoals > aVictories.homeTeamGoals);
      console.log(homeVictories, awayVictories);

      const homeLosses = matchesP1.filter((hLosses) =>
        hLosses.homeTeamGoals < hLosses.awayTeamGoals);
      const awayLosses = matchesP2.filter((aLosses) =>
        aLosses.awayTeamGoals < aLosses.homeTeamGoals);

      const homeDraws = matchesP1.filter((hDraws) => hDraws.homeTeamGoals === hDraws.awayTeamGoals);
      const awayDraws = matchesP2.filter((aDraws) => aDraws.awayTeamGoals === aDraws.homeTeamGoals);

      const totalGames = matchesP1.length + matchesP2.length;
      const totalVictories = homeVictories.length + awayVictories.length;
      const totalDraws = homeDraws.length + awayDraws.length;

      const totalPoints = (totalVictories * 3) + totalDraws;
      // const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
      // console.log(efficiency);

      return {
        name: item.teamName,
        totalPoints: (totalVictories * 3) + totalDraws,
        totalGames: matchesP1.length + matchesP2.length,
        totalVictories: homeVictories.length + awayVictories.length,
        totalDraws: homeDraws.length + awayDraws.length,
        totalLosses: homeLosses.length + awayLosses.length,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
      };
    }));
    const sort1 = leaderboard.sort((a, b) => b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsOwn - a.goalsOwn);

    return sort1;
  };
}

export default LeaderboardService;
