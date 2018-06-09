const expect = require('expect'); 

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Matt',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Rick',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Tracy',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Matt',
            room: 'Node js'
        };
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });
    

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Matt', 'Tracy'])
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Rick'])
    });

    it('should remove a user',() => {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });


    it('should not remove user', () => {
        var userId = '4';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user',() => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '4';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });


});

