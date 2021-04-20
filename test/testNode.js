'use strict'
import chai from 'chai'
//let chai = require('chai')
import chaiHttp from 'chai-http'
//let chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)
//https://www.chaijs.com/plugins/chai-jquery/
//This will use the terminal for testing as browser being picky
describe('#5 Testing 8+ Routes', function() {

    context( "Positive Routes", function() {

      it( "Should Log In a normal user ", function(done){
        let login = {
          email:'zvalencik01@aurora.edu',
          password:'password'
        }
        chai.request(`http://localhost:5000`).post(`/login`)
          .send(login)
          .end((err,res)=>{
            res.should.have.status(200);

          done()
          });

      });

      it( "Should Log In an Admin ", function(done){
        let login = {
          email:'OfficerFrank@aurora.edu',
          password:'admin'
        }
        chai.request(`http://localhost:5000`).post(`/login`)
          .send(login)
          .end((err,res)=>{
            res.should.have.status(200);

          done()
          });

      });

      it( "Should get all Items Return 200", function(done){

        chai.request('http://localhost:5000').get("/items")
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eq(0);
        done();
        });

    });

      it( "Should return one items Propertys ", function(done){
        let id = 6
        chai.request(`http://localhost:5000`).get(`/item/${id}`)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('item_id');
            res.body[0].should.have.property('item_name');
            res.body[0].should.have.property('item_category');
            res.body[0].should.have.property('item_value');
            res.body[0].should.have.property('item_desc');
            res.body[0].should.have.property('item_location');
            res.body[0].should.have.property('item_outside');
            res.body[0].should.have.property('item_room');
            res.body[0].should.have.property('found_by');
            res.body[0].should.have.property('found_by_desc');
            res.body[0].should.have.property('date_found');
            res.body[0].should.have.property('claimed_by');
            res.body[0].should.have.property('claimed_desc');
          done();
          });

      });

    });

  context( "Negative Routes", function() {
    it( "Should NOT get all Items", function(done){

      chai.request('http://localhost:5000').get("/itemss")
        .end((err,res)=>{
          res.should.have.status(404);
          done();
        });

    });

  });



  });
