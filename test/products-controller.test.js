const { expect } = require('chai');
const { getProduct, getProducts } = require('../controllers/products');

describe('Products Controller', function() { 
  describe('Get Product Handler', function() {
    it('should throw an error if id is invalid', function(done) { 
      const req = { 
        params: {
          id: 1,
          categoryId: 'mens'
        }
        
      };
      getProduct(req, {}, () => {}).then(result => {
        expect(result).to.be.an('error');
        done();
      })
    })
  
    it('should throw an error if categoryId is invalid', function(done) { 
      const req = { 
        params: {
          id: 1,
          categoryId: 'masdasdaens'
        }
        
      };
      getProduct(req, {}, () => {}).then(result => {
        expect(result).to.be.an('error');
        done();
      })
   })
  })

  describe('Get Products Handler', function() {
    it('should throw an error if categoryId is invalid', function(done) { 
      const req = { 
        params: {
          categoryId: 'masdasdsdfaens'
        }
        
      };
      getProducts(req, {}, () => {}).then(result => {
        expect(result).to.be.an('error');
        done();
      })
   })
  })

})