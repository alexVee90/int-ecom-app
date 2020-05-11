const { expect } = require('chai');
const { getProduct } = require('../controllers/products');

describe('Products Controller', function() { 
  it('should throw an error if productId is invalid', function(done) { 
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
})