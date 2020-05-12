const { expect } = require('chai');
const {
  getAllCategories,
  getChildCategories,
  getSingleCategory,
  getAllProducts,
  getSingleProduct,
  getProductsFromSubcategory,
} = require('../models/dbApi');

describe('DB API', function() {

  describe('Get All Categories Function', function() {
    it('should return an array', done => {
      getAllCategories().then(res => {
        expect(res).to.be.an('array');
        done();
      })
    })
  });

  describe('Get Child Categories Function', function() {
    it('should return an empty array if the parameter is type number', done => {
      const parent = 2;
      getChildCategories(parent).then(res => {
        expect(res.length).to.equal(0);
        done();
      })
    });
    it('should throw an error if parameter is an empty string', done => {
      const parent = '';
      getChildCategories(parent).catch(err =>  {
        expect(err).to.be.an.instanceOf(Error);
        done();
      })
    });
  });

  describe('Get Single Category Function', function() {
    it('should throw an error if the category is not in the DB', done => {
      const category = 123;
      getSingleCategory(category).catch(err => {
        expect(err).to.be.an.instanceOf(Error);
        done();
      })
    });
    it('should be an object if the category is valid', done => {
      const category = 'mens';
      getSingleCategory(category).then(res => {
        expect(res).to.be.an('object');
        done();
      }).catch(err => {
        expect(err).to.be.an.instanceOf(Error);
        done();
      })
    })
  });

  describe('Get All Products Function', function() {
    it('should return an array', done => {
      getAllProducts().then(res => {
        expect(res).to.be.an('array');
        done();
      })
    })
  });

  describe('Get Single Product Function', function() {
    it('should throw an error if the Product is not in the DB', done => {
      const id = 1;
      getSingleProduct(id).catch(err => {
        expect(err).to.be.an.instanceOf(Error);
        done();
      })
    });
    it('should be an array if the category is valid', done => {
      const id = 86736845;
      getSingleProduct(id).then(res => {
        expect(res).to.be.an('array');
        done();
      })
    })
  });

  describe('Get Products of Subcategories Function', function() {
    it('should return an  array if the parameter is valid', done => {
      const parent = 'womens-clothing-tops';
      getProductsFromSubcategory(parent).then(res => {
        expect(res).to.be.an('array');
        done();
      })
    });
    it('should throw an error if parameter invalid', done => {
      const parent = '123';
      getProductsFromSubcategory(parent).catch(err =>  {
        expect(err).to.be.an.instanceOf(Error);
        done();
      })
    });
  });

})