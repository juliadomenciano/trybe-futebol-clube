import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam'

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamName: 'any-name',
}

describe('Team', () => {
  describe('findAll', () => {
    beforeEach(() =>{
      sinon.stub(Team, "findAll").resolves([teamMock] as Team[])
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return status 200', async () => {
      const response = await chai.request(app)
      .get('/teams')

      expect(response.status).to.equal(200)

    })

    it('should return array with teams', async () => {
     
      const response = await chai.request(app)
      .get('/teams')

      expect(response.body).to.deep.equal([teamMock])
    })
  })

  describe('findById', () => {
    beforeEach(() =>{
      sinon.stub(Team, "findByPk").resolves(teamMock as Team)
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return status 200', async () => {
      const response = await chai.request(app)
      .get('/teams/:id')

      expect(response.status).to.equal(200)

    })

    it('should return array with teams', async () => {
     
      const response = await chai.request(app)
      .get('/teams/:id')

      expect(response.body).to.deep.equal(teamMock)
    })
  })
 });
