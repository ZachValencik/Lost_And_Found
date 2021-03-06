'use strict'
function checkBox(){
  let checkBox = document.getElementById("outside");
  // Get the output text
  let room = document.getElementById("item_room");
  if (checkBox.checked == true){
    room.style.display = "none";
  } else {
    room.style.display = "block";
  }
}


function revealInsert(){
  let checkBox = document.getElementById("reveal");
  // Get the output text
  let form = document.getElementById("insertItem");

  if (checkBox.checked == true){
    form.style.display = "block";
    
  } else {
    form.style.display = "none";
    
  }
}



function deleteIt(id){
  console.log(`Trying Deleting ${id}`)
  let URL = `http://localhost:5000/items/${id}`;
    $.ajax({
      url: URL,
      contentType: 'application/json',
      async: true,
      type: 'DELETE',
      success: function(data){
        
        console.log(`Sucess! The ID:${id} has been deleted`)
        console.log(data)
        window.location.reload();
        
      },
      error : function( xhr, status, error ) {
        alert("Error");
        
        
      }
    })
}

function insertNew() {
  alert("Trying to Insert a Lost Item in DB!");
  // the code that will ajac call to insert stuff
  console.log($("#item_name").val())
  console.log($("#item_category").val())
  console.log($("#item_value").val())
  console.log($("#item_desc").val())
  console.log($("#item_location").val())
  console.log($("#item_room").val())
  console.log($("#found_by").val())
  console.log($("#found_by_desc").val())
  console.log($("#date_found").val())
  let itemObj = {}
  if(document.getElementById("outside")){
  itemObj = {
    item_name: $("#item_name").val(),
    item_category: $("#item_category").val(),
    item_value: $("#item_value").val(),
    item_desc: $("#item_desc").val(),
    item_location: $("#item_location").val(),
    item_outside: 1,
    item_room: $("#item_room").val(),
    found_by: $("#found_by").val(),
    found_by_desc: $("#found_by_desc").val(),
    date_found: $("#date_found").val(),
  }
}else{
  itemObj = {
    item_name: $("#item_name").val(),
    item_category: $("#item_category").val(),
    item_value: $("#item_value").val(),
    item_desc: $("#item_desc").val(),
    item_location: $("#item_location").val(),
    item_outside: 0,
    found_by: $("#found_by").val(),
    found_by_desc: $("#found_by_desc").val(),
    date_found: $("#date_found").val(),
  }
}
  console.log(itemObj)

//let task = $("#task").val();
//let status = $("#status").val();
let URL = "http://localhost:5000/items"

$.ajax({
  url: URL,
  contentType: 'application/json',
  type: 'POST',
  data : JSON.stringify(itemObj),
  success: function (data){
    
    console.log(data)
  },
  error : function( xhr, status, error ) {
    alert( "Error");
    console.log(`AJAX ERROR`)
    console.log( error );
  }


})



}

function clearClaimed() {
  $("#test").html("");
}
// The Monthy report- Sort the Items found to one table and not clamied to another
/*
6.	Items Report Per Month - DONE
Provide a way for a privileged user to list out all recovered and non-recovered items found in a given month. 
For example, AU police should be able to list out all items found in January that were recovered by a user, 
when they were found, when they were claimed and who claimed them.

*/

function displayItForEdit(id){
  alert(`Revealing the Editing HTML for ${id} `)
  let URL = `http://localhost:5000/item/${id}`;
  $.ajax({
    url: URL,
    headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
    contentType: 'application/json',
    async: true,
    crossDomain : true,
    success: function(data){
      console.log(data);
      let str = `<h2> Update of id:${id} </h2>`;
      str += `<input type='text' name='item_name_put' id='item_name_put' value='${data[0].item_name}'>`;
      str += `<input type='text' name='item_category_put' id='item_category_put' value='${data[0].item_category}'>`;
      str += `<input type='text' name='item_value_put' id='item_value_put' value='${data[0].item_value}'>`;
      str += `<input type='text' name='item_desc_put' id='item_desc_put' value='${data[0].item_desc}'>`;
      str += `<input type='text' name='item_location_put' id='item_location_put' value='${data[0].item_location}'>`;
      str += `<input type='text' name='item_outside_put' id='item_outside_put' value='${data[0].item_outside}'>`;
      str += `<input type='text' name='item_room_put' id='item_room_put' value='${data[0].item_room}'>`;
      str += `<input type='text' name='found_by_put' id='found_by_put' value='${data[0].found_by}'>`;
      str += `<input type='text' name='found_by_desc_put' id='found_by_desc_put' value="${data[0].found_by_desc}">`;
      str += `<input type='date' name='date_found_put' id='date_found_put' value='${data[0].date_found}'>`;
      //str += `<label for="claimed_by_put">Claimed By</label><br>`
      str += `<input type='text' name='claimed_by_put' id='claimed_by_put' value="${data[0].claimed_by}"><br>`
      //str += `<label for="claimed_desc_put">Claimed By Information</label><br>`
      str += `<input type='text' name='claimed_desc_put' id='claimed_desc_put' value="${data[0].claimed_desc}"><br>`;
      str += `<button type="button" class="btn btn-primary" onClick="sendTheUpdate(${id})">Update ${id} </button> `;
     

    $("#editItem").html(str);

    
    },
    error : function( xhr, status, error ) {
      alert("Error");
      
      
    }
  })

}
//PUT AN ITEM
function sendTheUpdate(id){
alert(`updating ID:${id}`)
let URL = `http://localhost:5000/items/${id}`
let itemObj = {
  item_id: id,
  item_name: $("#item_name_put").val(),
  item_category: $("#item_category_put").val(),
  item_value: $("#item_value_put").val(),
  item_desc: $("#item_desc_put").val(),
  item_location: $("#item_location_put").val(),
  item_outside: $("#item_outside_put").val(),
  item_room: $("#item_room_put").val(),
  found_by: $("#found_by_put").val(),
  found_by_desc: $("#found_by_desc_put").val(),
  date_found: $("#date_found_put").val(),
  claimed_by: $("#claimed_by_put").val(),
  claimed_desc: $("#claimed_desc_put").val()
}
$.ajax({
  url: URL,
  contentType: 'application/json',
  type: 'PUT',
  data : JSON.stringify(itemObj),
  success: function (data){
    
    console.log(data)
    window.location.reload();
  },
  error : function( xhr, status, error ) {
    alert( "Error");
    console.log(`AJAX ERROR`)
    console.log( error );
  }


})

}

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
         // console.log("hello "+ month);
            
            let oStr = `<h2>Items Claimed</h2>`;
            let oStr2 = `<h2>Items Not Claimed</h2>`;
          
            oStr += '<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
            oStr2+='<table class="table align-middle table-bordered table-striped table-dark table-hover" align="center">';
            oStr += `<tr><th>ID</th><th>Item</th><th>Category</th><th>Item Approx Value</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
            `<thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Category</th>
                <th>Item Approx Value</th>
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
            oStr2+=`<tr><th>ID</th><th>Item</th><th>Category</th><th>Item Approx Value</th><th>Description</th><th>Lost Location</th><th>Room #</th><th>Found By</th><th>Found By Description</th><th>Date Found</th>
            <th>Claimed By</th><th>Claimed Description</th></tr>`;
            `<thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Category</th>
                <th>Item Approx Value</th>
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
                let id = data[i].item_id;
                let cat = data[i].item_category
                let name = data[i].item_name;
                let value = data[i].item_value;
                let desc = data[i].item_desc;
                let location = data[i].item_location;
                let outside = data[i].item_outside;
                let room = data[i].item_room;
                let foundBy = data[i].found_by;
                let foundByDesc = data[i].found_by_desc;
                let dateFound = data[i].date_found.substring(0,10);
                let dateSplit = dateFound.split("-");
                let claimedBy = data[i].claimed_by;
                let claimedDesc = data[i].claimed_desc;
                if(dateSplit[1]==month){
                  if(claimedBy!=null){
                    if(outside==1)
                        oStr += `<tr><td>${id}</td><td>${name}</td><td>${cat}</td><td>${value}</td><td>${desc}</td><td>${location}</td><td>Found Outside</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                    else  oStr +=`<tr><td>${id}</td><td>${name}</td><td>${cat}</td><td>${value}</td><td>${desc}</td><td>${location}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="displayItForEdit(${id})">Edit It ${id} </button> </td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${id})">Delete ${id} </button> </td>`;
                oStr += `</tr>`;
                  }else {
                if(outside==1)
                  oStr2 += `<tr><td>${id}</td><td>${name}</td><td>${cat}</td><td>${value}</td><td>${desc}</td><td>${location}</td><td>Found Outside</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                  else oStr2+=`<tr><td>${id}</td><td>${name}</td><td>${cat}</td><td>${value}</td><td>${desc}</td><td>${location}</td><td>${room}</td><td>${foundBy}</td><td>${foundByDesc}</td><td>${dateFound}</td><td>${claimedBy}</td><td>${claimedDesc}</td>`;
                oStr2 += `<td> <button type="button" class="btn btn-primary" onClick="displayItForEdit(${id})">Edit</button> </td>`;
                oStr2 += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${id})">Delete</button> </td>`;
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
  
  
  
  
  
 