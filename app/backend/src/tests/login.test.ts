import * as chai from 'chai';
import * as sinon from 'sinon';
import {compare} from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user';
import JwtService from '../services/JwtService';
import IUser from '../interfaces/IUser'
import AuthService from '../services/AuthService';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'any-name',
  role: 'any-role',
  email: 'any-email',
  password: 'any-hash',
}
const userLogin = {
  email: 'any-email',
  password: 'any-password', 
}


describe('AuthService', () => {
  describe('login', () => {
    beforeEach(() =>{
      sinon.stub(User, "findOne").resolves(userMock as User)
      sinon.stub(JwtService, "createToken").resolves('validToken')
      // sinon.stub(, 'compare').resolves('any-password');
    })

    afterEach(()=> {
      sinon.restore();
    })
    it('should return status 200', async () => {
      const response = await chai.request(app)
      .post('/login').send(userLogin)


      expect(response.status).to.equal(200)

    })

    it('should return token', async () => {
     
      const response = await chai.request(app)
      .post('/login').send(userLogin)

      expect(response.body).to.be.equal({token: 'validToken'})
    })
  })
 });
