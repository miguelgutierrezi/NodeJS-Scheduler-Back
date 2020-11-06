const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoMock = require('../databaseMock/mock-handler');

chai.use(chaiHttp);
const url = require('../../app/app');

describe('Should test users controller component', (done) => {
    after(() => {process.exit(0);});

    it ('should create user', () => {
        const user = {
            name: "User 1",
            username: "Username1",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });

    it ('should not create user, return 400', () => {
        const user = {
            name: "User 1",
            username: "Username1"
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not create user answer 500', () => {
        const user = {
            name: "User 1",
            username: "Username1",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });
});
