'use strict'
//Display all by category

/* 
2.	Item Categories - Work In Progress
Have a valid way to list general categories of items and count of how many. 
For example, a non-privileged user might be able to see: Keys: 2 sets, gloves: 3 sets, hats: 1, etc. 
For each set of items, students need to be able to see when found and the general area 
(for example ‘Dunham’ or near Dunham).
*/
$(document).ready(function(){

    $("#displayByCategory").click(function(){
      console.log("Cick")
      let URL = "http://localhost:5000/items"
       // $("#test").html("Display DB Info Below..");
       $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
           let oStr =``;
           let oStr2 = ``;
            const categoryArray = new Set(); // get the category of the items so we can use it to make a table for each category.
            for(let i =0; i<data.length;i++){
              if(data[i].claimed_by===null)
                categoryArray.add(data[i].item_category);
            }

            let count =0;
            for (const v of categoryArray) {
             

              for (let i=0; i<data.length; i++){
                
                if(v===data[i].item_category && data[i].claimed_by===null){
                count++;
                let cat = data[i].item_category;
                let loc = data[i].item_location;
                let room = data[i].item_room;
                let outside = data[i].item_outside;
                let dateFound = data[i].date_found.substring(0,10);
                
                if(outside==1){
                  oStr2 += `<td>${cat}</td><td>${loc}</td><td>Found Outside</td><td>${dateFound}</td>`;
                }else {
                  oStr2 += `<td>${cat}</td><td>${loc}</td><td>${room}</td><td>${dateFound}</td>`;
                }
                
                //oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr2 += `</tr>`;
                
            }
           
          }
          oStr += `<h2>${v}-Number of items-${count}</h2>`;
          oStr += '<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
          
          //oStr += `<tr><th>ID</th><th>Category</th><th>Where Found</th><th>Room #</th><th>Date Found</th></tr>`;
          oStr += `<thead class="thead-dark">
          <tr>
              <th>Category</th>
              <th>Where Found</th>
              <th>Room #</th>
              <th>Date Found</th>
          </tr>
      </thead>`;
          oStr+='<tbody>'
          oStr+=oStr2+"</tbody>";
          oStr2=``;
          count=0;
          oStr += `</table>`;
          oStr+= `<br>`;
            }

            
            
            
            $("#test").html(oStr);
        },
        error : function( xhr, status, error ) {
            alert("Error");
        }

    })

      }


      
    );
  })
