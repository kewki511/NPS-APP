'use strict';

const apiKey = 'zZsMxXo6qsjfBLor6HPuqrQNxHzZzOf4EzVbQzNd'; 

const url = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson){
  console.log(responseJson);
	$('#results-list').empty();
	
	for(let i = 0; i < responseJson.data.length; i++){
		$('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
			<a href = "${responseJson.data[i].url}">${responseJson.data[i].url}</a>
			</li>`
    )
	};

	$('#results').removeClass('hidden');
}

function getParks(query,limit=10){
	const params = {
		q : query,
		limit : limit-1,
		api_key : apiKey,
	};

	const goodString = formatQueryParams(params);
	const finalUrl = url + '?' + goodString;

	console.log(finalUrl);

	fetch(finalUrl)
	.then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
		const limit = $('#js-max-results').val();
	
    getParks(searchTerm,limit);
  });
}

$(watchForm);