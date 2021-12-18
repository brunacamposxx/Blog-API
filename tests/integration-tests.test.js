const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
// const { stub } = require('sinon');
const server = require('../index');
// const { User } = require('../src/models');

chai.use(chaiHttp);

describe('POST /login', async () => {

    describe('quando não é passado email ou senha', () => {
        let response = {};

        before(async () => {
          response = await chai.request(server).post('/login')
            .send({});
        });

        it('retorna código de status "400"', async () => {          
          expect(response).to.have.status(400);
        });

        it('retorna um objeto no body', async () => {
            expect(response.body).to.be.an('object');
        });

        it('o objeto possui a propriedade "message"', async () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "\"email\" is required"', async () => {
                expect(response.body.message).to.be.equal('"\email\" is required');
            }
        );
    });
    describe('quando o e-mail não está cadastrado no bd ou a senha é inválida', () => {
      let response = {};

      before(async () => {
        response = await chai.request(server).post('/login')
          .send({
            email: "xablau@email.com",
            password: "secret"
          });
      });

      it('retorna código de status "400"', async () => {          
        expect(response).to.have.status(400);
      });

      it('retorna um objeto no body', async () => {
          expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', async () => {
          expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid fields"', async () => {
              expect(response.body.message).to.be.equal('Invalid fields');
          }
      );
    });
    describe('quando o login é feito com sucesso', () => {
      let response = {};

      before(async () => {
        response = await chai.request(server).post('/login')
          .send({
            email: "brett@email.com",
            password: "123456"
          });
      });

      it('retorna código de status "200"', async () => {          
        expect(response).to.have.status(200);
      });

      it('retorna um objeto no body', async () => {
          expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "token"', async () => {
          expect(response.body).to.have.property('token');
      });

      it('a propriedade "message" não deve estar vazia', async () => {
              expect(response.body.token).to.be.not.empty;
          }
      );
    });
});
