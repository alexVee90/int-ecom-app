const { expect } = require('chai');
const navtagsHandler = require('../util/navtagsHandler');

describe('Navtags Handler', function() { 
  describe('Checks the behaviour if originalUrl contains mens', function() { 
    const req = { 
      originalUrl: '/mens'
    }
    const res = { 
      locals: {}
    }
    navtagsHandler(req, res, () => {});
    it('should set res.locals.womens to undefined', () => expect(res.locals).to.have.property('womens', undefined));
    it('should set res.locals.mens to true ', () => expect(res.locals).to.have.property('mens', true));
  });

  describe('Checks the behaviour if originalUrl contains womens', function() { 
    const req = { 
      originalUrl: '/womens'
    }
    const res = { 
      locals: {}
    }
    navtagsHandler(req, res, () => {});
    it('should set res.locals.womens to true', () => expect(res.locals).to.have.property('womens', true));
    it('should set res.locals.mens to undefined ', () => expect(res.locals).to.have.property('mens', undefined));
  });

  describe('Checks the behaviour if originalUrl is womens/kjhkhasda', function() { 
    const req = { 
      originalUrl: '/womens/kjhkhasda'
    }
    const res = { 
      locals: {}
    }
    navtagsHandler(req, res, () => {});
    it('should set res.locals.womens to true', () => expect(res.locals).to.have.property('womens', true));
    it('should set res.locals.mens to undefined ', () => expect(res.locals).to.have.property('mens', undefined));
  });

  describe('Checks the behaviour if originalUrl is /favicon.ico', function() { 
    const req = { 
      originalUrl: '/favicon.ico'
    }
    const res = { 
      locals: {}
    }
    navtagsHandler(req, res, () => {});
    it('should set res.locals.womens to undefined', () => expect(res.locals).to.have.property('womens', undefined));
    it('should set res.locals.mens to undefined ', () => expect(res.locals).to.have.property('mens', undefined));
  });

});