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
$('header h1').click(createItem);

function createItem(){
	var resultImage = "img/bg.png";
	var resultHeadline = "result-headline";
	var resultStandfirst = "result-standfirst";
	var resultURL = "result-link";

	$('article img').attr('src', resultImage);
	$('article h1').text(resultHeadline);
	$('article p').text(resultStandfirst)
	$('button a').attr('href', resultURL);
}