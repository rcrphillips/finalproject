//Creates a new item from each result from the api response, 
//The resultItem passed through is each 'result' which has been split up in the getJson function
function createItem(resultItem){
	//breaks each result down into elements array
	var elements = resultItem.elements;
	var thumbnail = "http://fallback.png ";
	var trail = resultItem.fields.trailText;
	var link = resultItem.webUrl;
	console.log(link);
	
	resultItem.elements.forEach(function(element) {
		element.assets.forEach(function(asset) {
			if(asset.typeData.width === "620") {
				thumbnail = asset.file;
			}
		});
	});
	//Appends the html to the end of the body. Need to add classes for styling
	$('#results').append("<article><a href="+link+"><h2>" + resultItem.webTitle + "</h2>"+"<img src="+thumbnail+"><p>"+trail+"</p></a></article>");
	//Handlebars JS?
};


//Gets the id value from the clicked on image - Will be used to populate the api query 
$('li img').click(function(event) {
	$('#results').empty();
	var teamName = this.id;
	getTeam(teamName);
});

//wrap below in a function that accepts argument of teamName

function getTeam(teamName){
	$.getJSON('http://content.guardianapis.com/search?tag=football%2f'+teamName+'%2Ctone%2Fmatchreports&show-fields=trailText&show-elements=image&page=1&api-key=' + API_KEY, function(json) {
		/*optional stuff to do after success */
		var results = json.response.results;
				
		// This is a function which takes each result from the api and response and outputs it as a 'resultItem'
		results.forEach(function(resultItem) {
			// console.log('resultItem', resultItem);
			createItem(resultItem);
		});

	});
};

$('h1').click(getTeam);

