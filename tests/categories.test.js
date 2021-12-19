const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
// const { stub } = require('sinon');
const server = require('../index');

chai.use(chaiHttp);

describe('GET /categories', async () => {

    describe('quando não é passado um JWT para autenticação', () => {
        let response = {};

        before(async () => {
          response = await chai.request(server).get('/categories');
        });

        it('retorna código de status "401"', async () => {          
          expect(response).to.have.status(401);
        });

        it('retorna um objeto no body', async () => {
            expect(response.body).to.be.an('object');
        });

        it('o objeto possui a propriedade "message"', async () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "Token not found"', async () => {
                expect(response.body.message).to.be.equal('Token not found');
            }
        );
    });
    describe('quando é passado um JWT válido', () => {
      let response = {};

      before(async () => {
        const token = await chai.request(server).post('/login')
          .send({
            email: "brett@email.com",
            password: "123456"
          })
          .then((res) => res.body.token);

          response = await chai.request(server)
            .get(`/categories`)
            .set('Authorization', token);
      });

      it('retorna código de status "200"', async () => {          
        expect(response).to.have.status(200);
      });

      it('retorna um array no body', async () => {
          expect(response.body).to.be.an('array');
      });
    });
});