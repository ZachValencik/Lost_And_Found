'use strict'
//import chai from 'chai'

let chai = require('chai')
//import chaiHttp from 'chai-http'
let chaiHttp = require('chai-http')
const expect = chai.expect;
chai.should()
chai.use(chaiHttp)
//https://www.chaijs.com/plugins/chai-jquery/
//This will use the terminal for testing as browser being picky
describe('#5  Clear statement of at least 8 route variants. Demonstrate full coverage of tests.', function() {

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

    it( "Should return All Items in a certain Category of items propertys ", function(done){
      let category = "Bag"
      chai.request(`http://localhost:5000`).get(`/items/${category}`)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eq(0);
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


    it( "Should Post An Item", function(done){
      let item = {
        item_id: 9000,
        item_name: "Test Item",
        item_category: "Test",
        item_value: 100000,
        item_desc: "A Test that will be deleted after creation!",
        item_location: "BookStore",
        item_outside: 0,
        item_room: 105,
        found_by: 5,
        found_by_desc: "['Alex Trance',324542,555-211-1212]",
        date_found: "2021-02-26"
      }
      chai.request(`http://localhost:5000`).post(`/items`)
        .send(item)
        .end((err,res)=>{
          res.should.have.status(200);
          done()
        });

    });

    it( "Should PUT An Item", function(done){
      let item_id = 9000
      let item = {
        item_id: 8999,
        item_name: "Test Item!!",
        item_category: "Test!!",
        item_value: 10000,
        item_desc: "A Test that will be deleted after creation!!!",
        item_location: "BookStore!!",
        item_outside: 0,
        item_room: 1050,
        found_by: 5,
        found_by_desc: "['Alex Trance',324542,555-211-1212]",
        date_found: "2021-02-26"
      }
      chai.request(`http://localhost:5000`).put(`/items/${item_id}`)
        .send(item)
        .end((err,res)=>{
          res.should.have.status(200);
          done()
        });

    });

    it( "Should Delete An Item", function(done){
      let item_id =8999;

      chai.request('http://localhost:5000').delete(`/items/${item_id}`)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('message').eql(` deleted ${item_id}`); //Positive Message
          done();
        });

    });



    it( "Should get all locations", function(done){

      chai.request('http://localhost:5000').get("/locations")
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eq(0);
        done();
        });

    });

    it( "Should return one location Propertys ", function(done){
      let location_name = "BookStore"
      chai.request(`http://localhost:5000`).get(`/locations/${location_name}`)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('location_name');
          res.body[0].should.have.property('floor_num');
          res.body[0].should.have.property('room_num');
          res.body[0].should.have.property('hasBasement');
        done();
        });

    });

    it( "Should Post A Location", function(done){
      let location = {
        location_name: "Test Location",
        floor_num: 1000,
        room_num: "[100,200,500]",
        hasBasement:0,
      }
      chai.request(`http://localhost:5000`).post(`/locations`)
        .send(location)
        .end((err,res)=>{
          res.should.have.status(200);
          done()
        });

    });

    it( "Should Delete A location", function(done){
      let location_name = "Test Location"

      chai.request('http://localhost:5000').delete(`/locations/${location_name}`)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('message').eql(`Deleted ${location_name}`); //Positive Message
          done();
        });

    });

    

  });


  context( "Negative Routes", function() {
    it( "Should NOT Log In a normal user. Wrong Password ", function(done){
      let login = {
        email:'zvalencik01@aurora.edu',
        password:'passwoawfawfrd'
      }
      chai.request(`http://localhost:5000`).post(`/login`)
        .send(login)
        .end((err,res)=>{
          res.should.have.status(400);
          expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
          expect(res.text).to.contain('Wrong Email or Password!'); // This is an error message displayed in the html

          done()
        });

    });

    it( "Should NOT Log In a normal user. Wrong Email ", function(done){
      let login = {
        email:'zvalencik0@aurora.edu',
        password:'password'
      }
      chai.request(`http://localhost:5000`).post(`/login`)
        .send(login)
        .end((err,res)=>{
          res.should.have.status(400);
          expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
          expect(res.text).to.contain('Wrong Email or Password!'); // This is an error message displayed in the html
          done()
        });

    });

    it( "Should NOT be able to Post An Empty Item ", function(done){
      let item = {
      }
      chai.request(`http://localhost:5000`).post(`/items`)
        .send(item)
        .end((err,res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('sqlMessage'); //This will be the error message

        done()
        });

    });

    it( "Should Not Put a non existant Item", function(done){
      let item_id = 9000
      let item = {
        item_id: 8999,
        item_name: "Test Item!!",
        item_category: "Test!!",
        item_value: 10000,
        item_desc: "A Test that will be deleted after creation!!!",
        item_location: "BookStore!!",
        item_outside: 0,
        item_room: 1050,
        found_by: 5,
        found_by_desc: "['Alex Trance',324542,555-211-1212]",
        date_found: "2021-02-26"
      }
      chai.request(`http://localhost:5000`).put(`/items/${item_id}`)
        .send(item)
        .end((err,res)=>{
          res.should.have.status(400);
          res.body.should.have.property('message').eql(`Cannot update ${item_id} since it doesnt exist in database`);
          done()
        });

    });

    
    it( "Should Not Delete An Non-exist Item", function(done){
      let item_id =9001;

      chai.request('http://localhost:5000').delete(`/items/${item_id}`)
        .end((err,res)=>{
          res.should.have.status(400);
          res.body.should.have.property('message').eql(`Cannot delete ${item_id} since it doesnt exist in database`);
          done();
        });

    });

    it( "Should Not Delete An non-existant Location", function(done){
      let location_name = "Test Location!!"
  
      chai.request('http://localhost:5000').delete(`/locations/${location_name}`)
        .end((err,res)=>{
          res.should.have.status(400);
          res.body.should.have.property('message').eql(`Cannot delete ${location_name} since it doesnt exist in database`);
          done();
        });
  
    });
  

  });


 



});
