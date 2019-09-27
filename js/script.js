const lookupUrl = "https://api.github.com/users/";

function formatParams(p){
	const params = Object.keys(p).map(key => `${p[key]}`)
	return params.join("&");
};

function searchMembers(handle){
	$('#github-search-results').empty();
	const params = {
		name: handle
	}
	const options = {};
	const queryString = formatParams(params);
	const endPoint = `${lookupUrl}${queryString}/repos`;

	fetch(endPoint)
		.then(errorHandler)
		.then(res => res.json())
		.then(handle => {
			renderRepos(handle);
		})
		.catch(err => {
			console.log(err.message);
		})
};

function renderRepos(repos){
	let $table = $('<table>');
	const $tableHeaders = `
		<thead>
			<tr>
				<th>Repo Name</th>
				<th>Repo Link</th>
				<th>Description</th>
			</tr>
		</thead>
	`;

	let $tableEntries = $('<tbody>');

	repos.forEach(repo => {
		console.log(repo);
		$tableEntries.append(`
			<tr>
				<td>${repo.name}</td>
				<td><a href="${repo.html_url}" target="_blank">Repo Link</a></td>
				<td>${repo.description}</td>
			</tr>
		`);
	});
	$table.append($tableHeaders);
	$table.append($tableEntries);
	$('#github-search-results').append($table);
	console.log($table);
}

function eventListeners(){
	$('#news-search').submit(e => {
		e.preventDefault();
		const searchHandle = $('.search-term').val();
		searchMembers(searchHandle);
	});
};

function errorHandler(res){
	if(!res.ok){ throw new Error(res.statusText); }
	return res;
};

$(function(){
	eventListeners();
});