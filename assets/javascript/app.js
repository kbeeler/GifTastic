
	//Initial array of moives 
	   var topics =  ["mercedes-benz", "bmw", "porsche", "audi", "range rover","ferrari"];
	   


	   //function to display the car information 
	   function displayCarInfo(car) {
        // var carName = $(this).attr("data-name");
        // queryURL for Giphy API
   		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ car +"&rating&limit=10&api_key=i2AN8cEHSVuTGeHThlh7k6jyEmmtPZnB";
   		console.log(queryURL)
   		//pulling information from the API 
	   $.ajax({
	     url: queryURL,
	     method: "GET"
	   })
	   //after data comes back from the API
	   .then(function(result) {
	   	console.log(result);

	   	//Creating a div to hold the car info
	   	var carDiv = $("<div class='car'>");
	   	// storing the rating
	   	for (var i = 0; i < result.data.length; i++) {
	   		var rated = result.data[i].rating;
		   	console.log(rated);
		   	
		   	// creating an element to have the rating displayed on the page
		   	var pOneElem = $("<span>").text("Rating: " + rated);
		   //appending to P tag
		   	
		   	console.log(carDiv);

		   	//pulling the gif from the URL or result
		   	var gifURL = result.data[i].images.fixed_height.url;
		 //added
		   	// var stillGifURL = result.data[i].images.fixed_height_still.url;

		   	//creating thr element to hold the image
		   	var imgElem = $("<img>")
		   	imgElem.attr("data-animated", gifURL);
		   	//making the image change from still to animated
		   	var stillGif = result.data[i].images.fixed_height_still.url;
		   	imgElem.attr("src", stillGif);
		   	imgElem.attr("data-still", stillGif);
		   	imgElem.attr("data-state", "still");

		   	carDiv.append(pOneElem);
		   	//appending the image 
		   	carDiv.append(imgElem);

		   	$("#cars-view").append(carDiv);
	   	}
	   
	   	//putting the entire image in the HTML 

	   });
      
     }
    
     renderButtons()

	   // function for displaying cars
	   function renderButtons() {
	   //empty the car button prior adding new vehicals
		  $("#button-view").empty();
		  // looping throught the array of cars
		  for (var i = 0; i < topics.length; i++) {

		  	//dynamically generating buttons for each car in the array.
			var addBtn = $("<button>");
			//add class to each button 
			addBtn.addClass("car-btn");
			//add a data- attribute with a vale of the car at index i
			addBtn.attr("data-name", topics[i]);
			//putting the text of the array into the buttons
			addBtn.text(topics[i]);
			//Adding the button to the HTML 
			$("#button-view").append(addBtn);

  		  }

       }
       	//this function handles events when the new car button is clicked 
       	$("#add-car").on("click", function(event) {
       		//preventing the form from trying to submit its self. 
       		event.preventDefault();
       		//this line will grab the text from the input box 
       		var car = $("#car-input").val().trim();
       		// The car from the textbox is added to the array
       		topics.push(car);
       		//renderButtons processes our array. shows the new buttons created 
       		renderButtons();

       	});

       		$(document).on("click", ".car-btn", function() {
      /////addede
       			$("#cars-view").empty();
       			displayCarInfo($(this).attr("data-name"))
       			 //erasing random gifs from appearing
       			 // $("#cars-view").clear(" ");
       			 //attemping to delete the previous gifs clicked	 
       		});
       		//this renderButttons function shows the display of the initaial list 

       		$(document).on("click", "img", function() {
       			if($(this).attr("data-state") === "still") {
       				$(this).attr("src", $(this).attr("data-animated"));
       				$(this).attr("data-state", "animated");
       			}
       			else if($(this).attr("data-state") === "animated") {
       				$(this).attr("src", $(this).attr("data-still"));
       				$(this).attr("data-state", "still");
       			}
       			

       		});



       			