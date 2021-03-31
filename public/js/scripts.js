
$(document).ready(function(){

    $("#displayAllItems").click(function(){
      let URL = "http://127.0.0.1:5000/items"
       // $("#test").html("Display DB Info Below..");
       $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Lost Items</h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr><th>ID</th><th>Item</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
            //alert("success");
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
                let claimedBy = data[i].claimed_by;
                let claimedDesc = data[i].claimed_desc;
                oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr += `</tr>`;

            }
            oStr += `</table>`;
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


  $(document).ready(function(){

    $("#displayFoundItems").click(function(){
      let URL = "http://127.0.0.1:5000/items"
       // $("#test").html("Display DB Info Below..");
       $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Lost Items</h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr><th>ID</th><th>Item</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
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
                let claimedBy = data[i].claimed_by;
                let claimedDesc = data[i].claimed_desc;
                if(claimedBy!=null){
                oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr += `</tr>`;
                }

            }
            oStr += `</table>`;
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
