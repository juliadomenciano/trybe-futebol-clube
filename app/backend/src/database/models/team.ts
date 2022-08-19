import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'match' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;