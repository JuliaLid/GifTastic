//Declare variables
//=========================================

var topics = ["Harry Potter", "Hermoine Granger", "Ron Weasley", "Hagrid ", "Draco Malfoy", "Dobby"];

//Main GIF display function
//==========================================================

function displayGifs() {
 	$("#instructions").hide();
    $("#gif-display").empty().addClass("gifs");
   

    var gifInfo = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+gifInfo +"&api_key=o6xLovKNu1K122xTxtBuODnzjDbFRKQD&limit=10"
     
	$.ajax({
   		url: queryURL,
      	method: "GET"
    	}).done(function(response) {
    		console.log(response);

          	var gifDiv = $("#gif-display");
         
         	var returnObject = response.data;
            			
   			$.each(returnObject,function(index,value){
   		
   				var stillImage = this.images.original_still.url;

   				var animatedImage =  this.images.original.url;

   				var rating = this.rating;

   		  	 	var gifImage = $("<img>").attr({
   		  	 		src: stillImage,
   		  	 		"data-state":"still",
   		  	 		"data-animate": animatedImage,
   		  	 		"data-still": stillImage,
   		  	 		"class":"character"
   		  	 	});
   		  	        
         		                
    	   		 var pOne = $("<p>").text("Rating: " + rating);
         		
                 var combinedGif = $("<div class=combined>")
                 combinedGif.append(gifImage).append(pOne);
                 gifDiv.append(combinedGif)
       
        	    $("#gif-display").prepend(gifDiv);
                $("#gifLogo").show();  
		    });


	    $(".character").on("click", function() {
	   
	      	var state = $(this).attr("data-state");
	      
	   		if (state === "still") {
	        	$(this).attr("src", $(this).attr("data-animate"));
	        	$(this).attr("data-state", "animate");
	      	} else {
	        	$(this).attr("src", $(this).attr("data-still"));
	        	$(this).attr("data-state", "still");
	      	}
	    });
	});
}

//User Input Functions
//=======================================================

function renderButtons() {

	$("#buttons").empty();   
  
    $("#add-character").val(""); //Resetting the input
	
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("char");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#buttons").append(a);
	}
};

$("#add").on("click", function(event) {
	event.preventDefault();
	var character = $("#add-character").val().trim();

    if(character.length >=1){
        topics.push(character);
        renderButtons();
    } else{
        alert ("Please enter a new character");
    }
});


//Calling functions
//=================================

$(document).on("click", ".char", displayGifs);

$( document ).ready(function() {
    renderButtons();
});
