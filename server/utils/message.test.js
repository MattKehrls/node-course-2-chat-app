var expect = require('expect');

var {generateMessage} = require('./message');

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