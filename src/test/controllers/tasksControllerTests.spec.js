const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = require('../../app/app');

let taskId, userId, userToken, dateToken;

describe('Should test tasks controller component', () => {
    it ('should create user for test tasks', (done) => {
        const user = {
            name: "User 1",
            email: "username1@test.com",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                userId = res.body._id;
                expect(res).to.have.status(201);
                done();
            });
    });

    it ('should log an test user with a 200 response', (done) => {
        const body = {
            email: "username1@test.com",
            password: "PasswordTest"
        };
        chai.request(url)
            .post('/api/v1/login')
            .send(body)
            .end((err, res) => {
                userToken = res.body.token;
                dateToken = res.body.date;
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should create task with an answer of 201', (done) => {
        const task = {
            name: "Task 1",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .post(`/api/v1/tasks/create/${userId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                taskId = res.body._id;
                expect(res).to.have.status(201);
                done();
            });
    });

    it ('should not create task with an answer of 400', (done) => {
        const task = {
            name: "Task 1",
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .post(`/api/v1/tasks/create/${userId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not create task with an answer of 401 because of auth header', (done) => {
        const task = {
            name: "Task 1",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .post(`/api/v1/tasks/create/${userId}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it ('should not create task with an answer of 400 because of missing date', (done) => {
        const task = {
            name: "Task 1",
            priority: 5,
            dateTask: new Date(),
            userId: userId
        };

        chai.request(url)
            .post(`/api/v1/tasks/create/${userId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not create task with an answer of 401 because of not valid token', (done) => {
        const task = {
            name: "Task 1",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .post(`/api/v1/tasks/create/${userId}`)
            .set('authorization', `Bearer token`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it ('should get all tasks from a user', (done) => {
        const body = {
            date: dateToken
        };
        chai.request(url)
            .post(`/api/v1/tasks/${userId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should get an specific task from a user', (done) => {
        const body = {
            date: dateToken
        };
        chai.request(url)
            .post(`/api/v1/tasks/get/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it ('should not get an specific task from a user with an answer of 500', (done) => {
        const body = {
            date: dateToken
        };
        chai.request(url)
            .post(`/api/v1/tasks/get/${userId}/abc`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should update an specific task', (done) => {
        const task = {
            name: "Task new name",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .put(`/api/v1/tasks/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });

    it ('should not update an specific user with an answer of 400', (done) => {
        const task = {
            name: "Task new name",
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .put(`/api/v1/tasks/${userId}/abc`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it ('should not update an specific user with an answer of 500', (done) => {
        const task = {
            name: "Task new name",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .put(`/api/v1/tasks/${userId}/abc`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should delete an specific user', (done) => {
        const body = {
            date: dateToken
        };

        chai.request(url)
            .delete(`/api/v1/tasks/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });

    it ('should not delete an specific user with an answer of 500', (done) => {
        const body = {
            date: dateToken
        };

        chai.request(url)
            .delete(`/api/v1/tasks/${userId}/abc`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it ('should delete all users from an specific user', (done) => {
        const body = {
            date: dateToken
        };

        chai.request(url)
            .delete(`/api/v1/tasks/${userId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });

    it ('should not get an specific task from a user with an answer of 404', (done) => {
        const body = {
            date: dateToken
        };
        chai.request(url)
            .post(`/api/v1/tasks/get/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should not update an specific user with an answer of 404', (done) => {
        const task = {
            name: "Task new name",
            priority: 5,
            dateTask: new Date(),
            userId: userId,
            date: dateToken
        };

        chai.request(url)
            .put(`/api/v1/tasks/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should not delete an specific user with an answer of 404', (done) => {
        const body = {
            date: dateToken
        };

        chai.request(url)
            .delete(`/api/v1/tasks/${userId}/${taskId}`)
            .set('authorization', `Bearer ${userToken}`)
            .send(body)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should delete test user with an answer of 202', (done) => {
        chai.request(url)
            .delete(`/api/v1/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(202);
                done();
            });
    });
});
