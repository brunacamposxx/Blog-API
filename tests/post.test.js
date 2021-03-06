const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
// const { stub } = require('sinon');
const server = require('../index');
// const { User } = require('../src/models');

chai.use(chaiHttp);

const EXAMPLE_ID = '1';

describe('GET /post/:id', async () => {

    describe('quando não é passado um JWT para autenticação', () => {
        let response = {};

        before(async () => {
          response = await chai.request(server).get(`/post/${EXAMPLE_ID}`);
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
            .get(`/post/${EXAMPLE_ID}`)
            .set('Authorization', token);
      });

      it('retorna código de status "200"', async () => {          
        expect(response).to.have.status(200);
      });

      it('retorna um objeto no body', async () => {
          expect(response.body).to.be.an('object');
      });
    });
});

describe('POST /post', async () => {

  describe('quando não é passado "title"', () => {
      let response = {};

      before(async () => {
        const token = await chai.request(server).post('/login')
          .send({
            email: "brett@email.com",
            password: "123456"
          })
          .then((res) => res.body.token);
  
          response = await chai.request(server)
            .post(`/post`)
            .set('Authorization', token)
            .send({
              content: "content",
              categoryIds: [1, 2]
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

      it('a propriedade "message" possui o texto "\"title\" is required"', async () => {
              expect(response.body.message).to.be.equal('\"title\" is required');
          }
      );
  });
  describe('quando não é passado "content"', () => {
    let response = {};

    before(async () => {
      const token = await chai.request(server).post('/login')
        .send({
          email: "brett@email.com",
          password: "123456"
        })
        .then((res) => res.body.token);

        response = await chai.request(server)
          .post(`/post`)
          .set('Authorization', token)
          .send({
            title: "title",
            categoryIds: [1, 2]
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

    it('a propriedade "message" possui o texto "\"content\" is required"', async () => {
            expect(response.body.message).to.be.equal('\"content\" is required');
        }
    );
  });
  describe('quando não é passado "categoryIds"', () => {
    let response = {};

    before(async () => {
      const token = await chai.request(server).post('/login')
        .send({
          email: "brett@email.com",
          password: "123456"
        })
        .then((res) => res.body.token);

        response = await chai.request(server)
          .post(`/post`)
          .set('Authorization', token)
          .send({
            title: "title",
            content: "content"
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

    it('a propriedade "message" possui o texto "\"categoryIds\" is required"', async () => {
            expect(response.body.message).to.be.equal('\"categoryIds\" is required');
        }
    );
  });
  describe('quando é feito um post com sucesso ', () => {
    let response = {};

    before(async () => {
      const token = await chai.request(server).post('/login')
        .send({
          email: "brett@email.com",
          password: "123456"
        })
        .then((res) => res.body.token);

        response = await chai.request(server)
          .post(`/post`)
          .set('Authorization', token)
          .send({
            title: "title",
            content: "content",
            categoryIds: [1, 2]
          });
    });

    it('retorna código de status "201"', async () => {          
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', async () => {
        expect(response.body).to.be.an('object');
    });

    it('retorna um userId no objeto', async () => {
      expect(response.body).to.have.property('userId');
  });
  });
});
