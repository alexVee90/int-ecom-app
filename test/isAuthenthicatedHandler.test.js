const { expect } = require('chai');
const isAuthenthicatedHandler = require('../util/isAuthenthicatedHandler');

describe('IsAuthenthicatedHandler', function() { 
  it('should set res.locals.isAuthenthicated to true', () => { 
    const req = {
      cookies: {
        accountInfo: 'somethingHere'
      }
    };
    const res = {
      locals: {}
    };
    isAuthenthicatedHandler(req, res, () => {});
    expect(res.locals.isAuthenthicated).to.be.true;
  });
  it('should set res.locals.isAuthenthicated to false', () => { 
    const req = {
      cookies: {
        accountInfo: ''
      }
    };
    const res = {
      locals: {}
    };
    isAuthenthicatedHandler(req, res, () => {});
    expect(res.locals.isAuthenthicated).to.be.false;
  });
})