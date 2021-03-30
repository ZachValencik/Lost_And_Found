
$(document).ready(function(){

    $("#testButton").click(function(){
      let URL = "http://127.0.0.1:5000/items"
       // $("#test").html("Display DB Info Below..");
       $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Available Tasks </h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr><th>Id</th><th>Task</th><th>Status</th><th>Created</th></tr>`;
            alert("success");
            console.log(`data:`);
            console.log( data );
            for (let i=0; i<data.length; i++){
                let ti = data[i].item_id;
                let t = data[i].item_name;
                let s = data[i].item_desc;
                let c = data[i].item_location;
                oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td>`;
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
