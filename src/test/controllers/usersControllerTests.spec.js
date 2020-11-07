process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = require('../../app/app');

let objectId;

describe('Should test users controller component', () => {
    after(() => {process.exit(0);});

    it ('should create user', (done) => {
        const user = {
            name: "User 1",
            email: "username1@test.com",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                objectId = res.body._id;
                expect(res).to.have.status(201);
                done();
            });
    });

    it ('should not create user, return 400', (done) => {
        const user = {
            name: "User 1",
            email: "username1@test.com",
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not create user answer 500', (done) => {
        const user = {
            name: "User 1",
            email: "username1@test.com",
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

    it ('should log an user with a 200 response', (done) => {
        const body = {
            email: "username1@test.com",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/login')
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should answer login with a 400 response', (done) => {
        const body = {
            email: "username1@test.com",
        };
        chai.request(url)
            .post('/api/v1/login')
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not authorize user with a 401 response', (done) => {
        const body = {
            email: "username1@test.com",
            password: "Password"
        };
        chai.request(url)
            .post('/api/v1/login')
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it ('should not found an user with a 404 response', (done) => {
        const body = {
            email: "username1@test.com",
            password: "Password"
        };
        chai.request(url)
            .post('/api/v1/login')
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should get all users', (done) => {
        chai.request(url)
            .get('/api/v1/users/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should get an user with an answer of 200', (done) => {
        chai.request(url)
            .get(`/api/v1/users/${objectId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should not found an user with an answer of 500', (done) => {
        chai.request(url)
            .get('/api/v1/users/abc')
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should update an user with an answer of 202', (done) => {
        const newUser = {
            name: "Test User",
            email: "username1@test.com",
            password: "Password"
        };
        chai.request(url)
            .put(`/api/v1/users/${objectId}`)
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });

    it ('should not update an user with an answer of 400', (done) => {
        const newUser = {
            name: "Test User",
            email: "username1@test.com",
        };
        chai.request(url)
            .put(`/api/v1/users/${objectId}`)
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not update an user with an answer of 500', (done) => {
        const newUser = {
            name: "Test User",
            email: "username1@test.com",
            password: "Password"
        };
        chai.request(url)
            .put('/api/v1/users/abc')
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should not found an user with an answer of 500', (done) => {
        chai.request(url)
            .get('/api/v1/users/abc')
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should delete an user with an answer of 200', (done) => {
        chai.request(url)
            .delete(`/api/v1/users/${objectId}`)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });

    it ('should not delete an user with an answer of 500', (done) => {
        chai.request(url)
            .delete('/api/v1/users/abc')
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should not found an user with an answer of 404', (done) => {
        chai.request(url)
            .get(`/api/v1/users/${objectId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should not update an user with an answer of 404', (done) => {
        const newUser = {
            name: "Test User",
            email: "username1@test.com",
            password: "Password"
        };
        chai.request(url)
            .put(`/api/v1/users/${objectId}`)
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should not delete an user with an answer of 404', (done) => {
        chai.request(url)
            .delete(`/api/v1/users/${objectId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});
