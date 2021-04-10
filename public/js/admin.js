

// The Monthy report- Sort the Items found to one table and not clamied to another
/*
6.	Items Report Per Month - DONE
Provide a way for a privileged user to list out all recovered and non-recovered items found in a given month. 
For example, AU police should be able to list out all items found in January that were recovered by a user, 
when they were found, when they were claimed and who claimed them.
*/
$(document).ready(function(){

    $("#displayByMonth").click(function(){
      let URL = "http://localhost:5000/items"
       // $("#test").html("Display DB Info Below..");
       $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
          let month = document.getElementById("selectMonth").value;
          console.log("hello "+ month);
            
            let oStr = `<h2>Items Claimed</h2>`;
            let oStr2 = `<h2>Items Not Claimed</h2>`;
          
            oStr += '<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
            oStr2+='<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
            oStr += `<tr><th>ID</th><th>Item</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
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
            oStr2+=`<tr><th>ID</th><th>Item</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
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
                let ti = data[i].item_id;
                let t = data[i].item_name;
                let s = data[i].item_desc;
                let c = data[i].item_location;
                let room = data[i].item_room;
                let foundBy = data[i].found_by;
                let foundByDesc = data[i].found_by_desc;
                let dateFound = data[i].date_found;
                let dateSplit = dateFound.split("-");
                let claimedBy = data[i].claimed_by;
                let claimedDesc = data[i].claimed_desc;
                if(dateSplit[1]==month){
                  if(claimedBy!=null){
                oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
               // oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr += `</tr>`;
                  }else {
                oStr2 += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
               // oStr2 += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr2 += `</tr>`;
                  }
                }
  
  
            }
  
            oStr += `</tbody></table>`;
            oStr += `<br>`;
            oStr2+=`</tbody></table>`;
            //id.innerHTML = oStr;
            $("#test").html(oStr+oStr2);
        },
        error : function( xhr, status, error ) {
            alert("Error");
        }
  
    })
  
      }
  
  
      
    );
  })
  
  
  
  
  
  