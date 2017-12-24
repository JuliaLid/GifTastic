//Declare variables

var topics = ["Harry Potter", "Hermoine Granger", "Ron Weasley", "Hagrid ", "Draco Malfoy", "Dobby"];

 
 function displayGifs() {
 	$("#gif-display").empty();
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


   				console.log(stillImage)
   				console.log(animatedImage)

   				var rating = this.rating;

   		  	 	// var image1 = $("<img>").attr("src", stillImage);
   		  	 	var image1 = $("<img>").attr({
   		  	 		src: stillImage,
   		  	 		"data-state":"still",
   		  	 		"data-animate": animatedImage,
   		  	 		"data-still": stillImage,
   		  	 		"class":"character"

   		  	 	});
   		  	 	console.log(image1);
       
         		 gifDiv.append(image1);

         		 var image2 = $("<img>").attr("src", animatedImage);
       
    	   		 var pOne = $("<p>").text("Rating: " + rating);

         		 gifDiv.append(pOne);
       
        	  $("#gif-display").prepend(gifDiv);


		    });


       $(".character").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      	var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
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


function renderButtons() {

	$("#buttons").empty();
	
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

    topics.push(character);

    renderButtons();
});


$(document).on("click", ".char", displayGifs);

renderButtons()