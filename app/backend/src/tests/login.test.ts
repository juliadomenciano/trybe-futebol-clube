import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/user';
import JwtService from '../services/JwtService';

chai.use(chaiHttp);

const { expect } = chai;

describe('AuthService', () => {
  describe('login', () => {
    beforeEach(() =>{
      sinon.stub(User, "findOne").resolves()
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return status 200', async () => {
      const response = await chai.request(app)
      .post('/login')

      expect(response.status).to.equal(200)

    })

    it('should return token', async () => {
      sinon.stub(JwtService, "createToken").resolves('validToken')
      const response = await chai.request(app)
      .post('/login')

      expect(response.body).to.be.equal('validToken')
    })
  })
 });
