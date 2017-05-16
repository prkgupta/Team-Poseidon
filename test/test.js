import {describe, it} from 'mocha';
import {expect} from 'chai';
import config from '../server/config/config';

describe("config test", function () {
	it("should work", function () {
		expect(true).to.equal(true);
	});

	it('should have correct config', function () {
	    expect(config).to.deep.equal({
            mongoDBURI: process.env.MONGOLAB_URI || 'mongodb://admin:admin@ds061335.mongolab.com:61335/heroku_w9bxpzpc',
            port: process.env.PORT || 4941,
            secret: process.env.SECRET || 'mysecret'
        });
    });
});
