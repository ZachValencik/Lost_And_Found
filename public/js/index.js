'use strict'
/*
1.	Campus Data - Have a way to properly label each building on campus. 
It should know how many floors each building has. 
For example, it should know that Stephens has 2 floors and a basement.  
When you find something in Stephens, you must indicate 
where you found it (either the first or second or basement) and room number (if applicable). 
*/
$(document).ready(function(){

    $("#displayLocationInfo").click(function(){
      let locationSelect = document.getElementById("selectLocation").value;
      console.log(locationSelect)
      let URL = "http://localhost:5000/locations"
      // $("#test").html("Display DB Info Below..");
      $.ajax({
       url: URL,
       headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
       contentType: 'application/json',
       async: true,
       crossDomain : true,
       success : function( data ){
        
           let oStr = `<h2>Location Information</h2>`;
           
         
           oStr += '<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
           oStr += `<tr><th>Location Name</th><th>Number of Floors</th><th>Room Numbers</th><th>Has a basement?</th></tr>`;
           `<thead class="thead-dark">
           <tr>
               <th>ID</th>
               <th>Item</th>
               <th>Description</th>
               <th>Lost Location</th>
               <th>Room #</th>
               <th>Found by</th>
               <th>Found by Description</th>
               <th>Date Found</th>
               <th>Claimed By</th>
               <th>Claimed Description</th>
           </tr>
       </thead><tbody>`;
          // alert("success");
           console.log(`data:`);
           console.log( data );
           for (let i=0; i<data.length; i++){
               if(locationSelect==data[i].location_name){
               let building = data[i].location_name;
               let num_floors = data[i].floor_num;
               let rooms = data[i].room_num;
               let basement = '';
               if(data[i].hasBasement==1){
                    basement='Yes'
               }else{
                   basement='No'
               }
               oStr += `<tr><td>${building}</td><td>${num_floors}</td><td>${rooms}</td><td>${basement}</td>`;
              //oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
               oStr += `</tr>`;
               break;
               }
              
           }
 
           oStr += `</tbody></table>`;
           //id.innerHTML = oStr;
           $("#test").html(oStr);
       },
       error : function( xhr, status, error ) {
           alert("Error");
        }
  
    })
  
      }
  
  
      
    );
  })
  