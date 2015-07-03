var TeamLoader = function () {

	page = 1;
	var teamName = "arsenal";
	var mainColour = "red";
	var secondaryColour = "white";
	var template = $('#result-item').html();

	function getTeam(newTeamName){

		if (newTeamName) {
			teamName = newTeamName;
		}

		return $.getJSON('http://content.guardianapis.com/search?tag=football%2f'+teamName+'%2Ctone%2Fmatchreports&show-fields=trailText&show-elements=image&page='+page+'&api-key=' + API_KEY, function(json) {
			
			//creates an object from the API query (json is overall response, response is the blob of json, results are all of the array of results from the response)
			var results = json.response.results;	

			// This splits each result from the results object above and outputs it as a 'resultItem'
			results.forEach(function(resultItem) {
				//from each result item, the function calls createArticle with each individual resultItem
				createArticle(resultItem);

			});	

		}).done( function(){
			//on the completion of the json response, change the styles for each article header based on the team colours
			$('#results h2').css({
				color: secondaryColour,
				backgroundColor: mainColour
			});
		});
	};

	function findImagesInResults(resultItem) {
		resultItem.elements.forEach(function(element) {
		
			var biggestImageIndex;
			var biggestImageWidth = 0;

			//looks for the biggest image possible by comparing the value for each item
			element.assets.forEach(function(asset, index) {
				if(asset.typeData.width > biggestImageWidth) {
					biggestImageWidth = asset.typeData.width;
					biggestImageIndex = index;
				} 
			});

			//grabs the array position and inserts it to set the image 
			resultItem.thumbnail = element.assets[biggestImageIndex].file;
		});

		return resultItem;
	}

	//The resultItem passed through is each 'result' which has been split up in the getJson function
	function createArticle(resultItem, main){
		//breaks each result down into elements array
		var resultItem = findImagesInResults(resultItem);

		$('#results').append(Mustache.to_html(template, resultItem));
	};

	//On scroll, this gets called in order to load the extra results
	function loadMore(){
		page++;
		return getTeam();

	}

	//sets the colours from the click function below
	function setColours (main, secondary) {
		mainColour = main;
		secondaryColour = secondary;
	}

	//resets the page counter when a new team is cliscked on so that it doesn't load the page value from the number of scrolls
	function resetPage (page) {
		page = page;
	}

	return {
		getTeam: getTeam,
		setColours: setColours,
		loadMore: loadMore,
		resetPage: resetPage
	};

};


$(document).ready(function() {

	// creates a new intance of the teamloader function 
	var teamLoader = new TeamLoader();

	//sets a waypoint which is just below the results div
	var waypoint = new Waypoint({
		element: $('#bottom'),
		handler: function(direction) {
	  		if (direction === 'down') {
	  			teamLoader.loadMore().done(function () {
	  				//this resets the waypoint so that it takes into account the new height of the results div when items are loaded
	  				Waypoint.refreshAll();
	  			});
	  		};	

		},
		offset: 'bottom-in-view'
	});

	//Function to get the  
	$('li img').click(function(event) {
		//empty the results div before each team is clicked on
		$('#results').empty();

		//rests page variable when team is clicked on
		teamLoader.resetPage(
			page = 1
		);


		//make the teams active/inactive when clicked on
		$('li img').addClass('inactive');
		$('li img').removeClass('active');
		$(this).addClass('active');

		//gets the colour attributes from the clicked on image for setting result colours
		teamLoader.setColours(
			$(this).data('main'), 
			$(this).data('secondary')
		);

		//gets the id from the clicked on image and passes through to API query
		//calls the getTeam function below with the arguments from the clicked team
		teamLoader.getTeam(this.id).done(function () {
			Waypoint.refreshAll();
		});
	});

});

