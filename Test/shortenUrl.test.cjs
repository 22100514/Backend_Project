const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server');

chai.use(chaiHttp);

describe('URL Shortener API', () => {
  it('should create a short URL', (done) => {
    chai.request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://www.example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('originalUrl', 'https://www.example.com');
        expect(res.body).to.have.property('shortUrl').that.is.a('string').with.lengthOf.above(0);
        done();
      });
  });

  it('should redirect to the original URL', (done) => {
    chai.request(app)
      .get('/abc123') 
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res.redirects).to.have.lengthOf(1);
        expect(res.redirects[0]).to.equal('https://www.example.com');
        done();
      });
  });
});
