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
      it( "Should get all Items", function(done){
     
        chai.request('http://localhost:5000').get("/items")
        .end((err,res)=>{
          res.should.have.status(200);
        done()
        });
        
    });
    
    });
  
  
  
  
  });