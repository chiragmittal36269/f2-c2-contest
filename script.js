// fetch function is used to make an http get request to an api and retrieve information about certain use case from the DB.

// 429 => sending alot of request to the api. Receiving too many request from the same IP address.

// 404 => not found anything.

// 500 => internal error

let data = [];

fetch(
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
	.then((response) => response.json()) // it converts the received body into the json object.
	.then((dataResponse) => {
		data = dataResponse;
		// console.log(data);
		renderTable(data);
	})
	.catch((error) => {
		console.error("Error", error);
	});

//display Function
function renderTable(data) {
	console.log(data, "display function called");

	let tableBody = document.getElementById("tableBody");
	tableBody.innerHTML = "";

	data.forEach((item) => {
		const row = document.createElement("tr");
		const percentChange = item.price_change_percentage_24h;
		const percentChangeClass =
			percentChange >= 0 ? "positive-change" : "negative-change";

		row.innerHTML = `
        <td id="data1"><img src="${item.image}" alt="${item.name}" width="20"/>
        <span>${item.name}</span></td>
		<td>${item.symbol}</td>
		<td>${item.id}</td>
		<td>${"$" + item.current_price}</td>
		<td class="${percentChangeClass}">${item.price_change_percentage_24h}</td>
        <td>${"Mkt Cap : $" + item.total_volume}</td>`;

		tableBody.appendChild(row);
	});
}

//search Function
let inputTag = document.getElementById("searchInput");
inputTag.addEventListener("keyup", (event) => {
	const searchTerm = inputTag.value.trim().toLowerCase();
	if (searchTerm == "") {
		renderTable(data);
		return;
	}

	const filteredData = data.filter((item) => {
		const itemName = item.name.toLowerCase();
		const itemSymbol = item.symbol.toLowerCase();

		return itemName.includes(searchTerm) || itemSymbol.includes(searchTerm);
	});

	renderTable(filteredData);

	// console.log(searchTerm);
	// console.log(event);
	// console.log(event.target.value);
});

//sort Function 1
let button1 = document.getElementById("sortMktCapButton");
button1.addEventListener("click", (event) => {
	data.sort((a, b) => b.total_volume - a.total_volume);
	renderTable(data);
});

//sort Function 2
let button2 = document.getElementById("sortPercentageChangeButton");
button2.addEventListener("click", (event) => {
	data.sort(
		(a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
	);
	renderTable(data);
});
