var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('genterateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin"
        var text = "This is a test!"
        var res = generateMessage(from, text);

        expect(res.from).toBe(from);

        expect(res.text).toBe(text);

        expect(typeof res.createdAt).toBe('number');

        expect(res).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = "Admin"
        var lat = 43.471487499999995;
        var long = -80.54940069999999;
        var res = generateLocationMessage(from, lat, long);

        // console.log("THIS!!" ,res.url);
        expect(res.url).toBe(`https://www.google.ca/maps?q=${lat},${long}`);
        expect(res.from).toBe('Admin');
        expect(typeof res.createdAt).toBe('number');
    });
});