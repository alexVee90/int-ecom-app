const { expect } = require('chai');
const breadcrumbHandler = require('../util/breadcrumbHandler');

describe('BreadCrumb Handler', function() { 
  describe('Checks the behaviour of res.locals.breadcrumbs if originalUrl is /favicon.ico', function() {
    const req = { 
      originalUrl: '/favicon.ico'
    };
    const res = {
      locals: {}
    };
    breadcrumbHandler(req, res, () => {});
    it('should be an array', () => expect(res.locals.breadcrumbs).to.be.an('array') );
    it('should be empty', () => expect(res.locals.breadcrumbs.length).to.equal(0) );
  });

  describe('Checks the behaviour of res.locals.breadcrumbs if originalUrl is /blablabla', function() {
    const req = { 
      originalUrl: '/blablabla'
    }
    const res = {
      locals: {}
    };
    breadcrumbHandler(req, res, () => {});
    it('should be an array', () => expect(res.locals.breadcrumbs).to.be.an('array') );
    it('should have length of 1', () => expect(res.locals.breadcrumbs.length).to.equal(1));
    it('first index should be an object', () => expect(res.locals.breadcrumbs[0]).to.be.an('object'));
    it('first index should have property name', () => expect(res.locals.breadcrumbs[0]).to.haveOwnProperty('name'));
    it('first index should have property route', () => expect(res.locals.breadcrumbs[0]).to.haveOwnProperty('route'));
    it('first index should NOT have property test', () => expect(res.locals.breadcrumbs[0]).not.to.haveOwnProperty('test'));
  });

})