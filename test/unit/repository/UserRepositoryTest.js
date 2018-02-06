var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

    it("should return existing user", function() {
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id: '28469',
            firstname: 'Jon',
            lastname: 'Snow',
            birthday: '15-06-1023'
        });

        var repository = new UserRepository(mockDb);
        var user = repository.findOneById('28469');
        expect(user.id).toEqual('28469');
        expect(user.firstname).toEqual('Jon');
        expect(user.lastname).toEqual('Snow');
        expect(user.birthday).toEqual('15-06-1023');
    });

    it("should throw exception id undefined", function() {
        var repository = new UserRepository({});
        var f = function()
        {
            repository.findOneById();
        };
        expect(f).toThrow('User id is undefined');
    });
});