//Creates a new item from each result from the api response, 
//The resultItem passed through is each 'result' which has been split up in the getJson function
function createItem(resultItem){
	//breaks each result down into elements array
	var elements = resultItem.elements;
	var thumbnail = "http://fallback.png ";
	var trail = resultItem.fields.trailText;
	console.log(trail);
	
	resultItem.elements.forEach(function(element) {
		// debugger
		element.assets.forEach(function(asset) {
			// var correctImage = $('asset.typeData').find('460');
			// console.log(correctImage);
			// debugger
			// console.log(asset);
			// assets.asset

			if(asset.typeData.width === "620") {
				thumbnail = asset.file;
			}
		});
	});
	//Appends the html to the end of the body. Need to add classes for styling
	$('#results').append("<article><h2>" + resultItem.webTitle + "</h2>"+"<img src="+thumbnail+"><p>"+trail+"</p></article>");

	// $('article img').attr('src', image);
	// $('article h1').text(resultHeadline);
	// $('article p').text(resultStandfirst)
	// $('button a').attr('href', link);
	//Mustache JS?
};


//Gets the id value from the clicked on image - Will be used to populate the api query 
//- will need to output and add as an argument to the getjson function
$('li img').click(function(event) {
	/* Act on the event */
	$('#results').empty();
	var teamName = this.id;
	getTeam(teamName);
});

//wrap below in a function that accepts argument of teamName

function getTeam(teamName){
	$.getJSON('http://content.guardianapis.com/search?tag=football%2f'+teamName+'%2Ctone%2Fmatchreports&show-fields=trailText&show-elements=image&page=1&api-key=' + API_KEY, function(json) {
		/*optional stuff to do after success */
		// var parsed = JSON.parse(json);
		// debugger
		var results = json.response.results;
		
		// var image = json.response.results[0].elements[0].assets[0].file;
		// console.log(json);
		// var link = json.response.results[2].webUrl;
		// console.log(link);
		// results.forEach(createItem(json, link, image));

		// This is a function which takes each result from the api and response and outputs it as a 'resultItem'
		results.forEach(function(resultItem) {
			console.log('resultItem', resultItem);
			createItem(resultItem);
			// debugger
		});

		// createItem(json, link, image);
});
};

$('h1').click(getTeam);


//gets the json from the api endpoint and the (json) part is the output from the response


//Create New article item per result

// New article each time

//input the attribute 
// var resultImage = result-imageUrl
// var resultHeadline = result-headline
//var resultStandfirst = result-standfirst
//var resultURL = result-link
// $('img').attr('src', resultImage);
// $('h1').text(resultHeadline);
// $('p').text(resultStandfirst)
// $('button a').attr('href', resultURL);





// Work out how to separate each result
// Push each result into an array
// Work out how to create a new item
//Foreach result, grab the required fields/?
//How to load on scroll?
//http://api.jquery.com/jquery.getjson/
//Ajax or getJson?
//http://www.smashingmagazine.com/2012/02/09/beginners-guide-jquery-based-json-api-clients/





// console.log(json);

// results.Foreach create article and append to body

// $.getJson({
//     url: "http://content.guardianapis.com/search?tag=football%2Fcardiffcity%2Ctone%2Fmatchreports&show-elements=image&page=1&api-key=hr4p7czf93zngjgukmdeud7m",
//     dataType: 'json',
//     success: function(results){
//         console.log(results);
//         var parsed = JSON.parse(results);
//         console.log(parsed.webTitle);

//     }
// });