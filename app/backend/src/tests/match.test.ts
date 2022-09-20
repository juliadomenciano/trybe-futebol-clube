import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/match';
import IMatchMock from '../interfaces/IMatch'
import ITeam from '../interfaces/ITeam';
import Team from '../database/models/team';
import JwtService from '../services/JwtService';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatchMock = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "São Paulo"
  },
  teamAway: {
    teamName: "Grêmio"
  }
}
const match = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
}
const homeTeam = {
  id: 1,
  teamName: 'home-teamName',
}
const awayTeam = {
  id: 2,
  teamName: 'away-teamName',
}
const matchBody = {
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
}
const matchId = '1';

describe('Match', () => {
  describe('findAll', () => {
    beforeEach(() =>{
      sinon.stub(Match, "findAll").resolves([matchMock] as unknown as Match[])
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return status 200', async () => {
      const response = await chai.request(app)
      .get('/matches')

      expect(response.status).to.equal(200)

    })

    it('should return array with matches', async () => {
     
      const response = await chai.request(app)
      .get('/matches')

      expect(response.body).to.deep.equal([matchMock])
    })
  })

  describe('update', () => {
    beforeEach(() =>{
      sinon.stub(Match, "update").resolves()
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return  status 200', async () => {
      const response = await chai.request(app)
      .patch('/matches/:id/finish').send(matchId as string)

      expect(response.status).to.equal(200)

    })

    it('should update the match with inProgress false and return "Finished"', async () => {
     
      const response = await chai.request(app)
      .patch('/matches/:id/finish').send(matchId as string)

      expect(response.body).to.deep.equal({ message: 'Finished' })
    })
  })

  describe('updateGoals', () => {
    beforeEach(() =>{
      sinon.stub(Match, "update").resolves()
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return  status 200', async () => {
      const response = await chai.request(app)
      .patch('/matches/:id')

      expect(response.status).to.equal(200)

    })

    it('should update the match and return "Match updated"', async () => {
     
      const response = await chai.request(app)
      .patch('/matches/:id')

      expect(response.body).to.deep.equal({ message: 'Match updated' })
    })
  })

  describe('create', () => {
    beforeEach(() =>{
      sinon.stub(JwtService, "validateToken").resolves()
      sinon.stub(Team, "findByPk").resolves(homeTeam as ITeam as Team)
      sinon.stub(Team, "findByPk").resolves(awayTeam  as ITeam as Team)
      sinon.stub(Match, "create").resolves(match as Match)
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return  status 201', async () => {
      const response = await chai.request(app)
      .post('/matches').send(matchBody)

      expect(response.status).to.equal(201)

    })

    it('should return the match created', async () => {
     
      const response = await chai.request(app)
      .post('/matches').send(matchBody)

      expect(response.body).to.deep.equal(match)
    })
  })
 });
