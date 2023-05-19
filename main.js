"use strict"

let coffees = [
	{ id: 1, name: 'Light City', roast: 'light', desc: 'lighter than typical Medium City roasts' },
	{ id: 2, name: 'Half City', roast: 'light', desc: 'lighter than typical Medium City roasts' },
	{ id: 3, name: 'Cinnamon', roast: 'light', desc: 'cinnamon brown coffee beans'},
	{ id: 4, name: 'City', roast: 'medium', desc: 'the rare steak of coffee beans' },
	{ id: 5, name: 'American', roast: 'medium', desc: 'traditionally associated with the USA' },
	{ id: 6, name: 'Breakfast', roast: 'medium', desc: 'the dark medium roast often seen in diners' },
	{ id: 7, name: 'High', roast: 'dark', desc: 'a few degrees further along than our Continental' },
	{ id: 8, name: 'Continental', roast: 'dark', desc: 'the first in line of medium roasts'},
	{ id: 9, name: 'New Orleans', roast: 'dark', desc: 'this city is known for its dark roasts'},
	{ id: 10, name: 'European', roast: 'dark', desc: 'known for its intense flavor and aroma'},
	{ id: 11, name: 'Espresso', roast: 'dark', desc: 'a full-flavored, concentrated form of coffee'},
	{ id: 12, name: 'Viennese', roast: 'dark', desc: 'medium-dark that is roasted to mid-second crack'},
	{ id: 13, name: 'Italian', roast: 'dark', desc: 'this roast is darker than a French roast' },
	{ id: 14, name: 'French', roast: 'dark', desc: 'a roast progressed well beyond second crack' },
];
// line 20 selects the tbody element with class of coffees and is used to display the data
let tbody = document.querySelector('#coffees');
// Line 22 selects the dropdown menu
let roastSelection = document.querySelector('#roast-selection');
// Line 24 selects the element with ID of searchbox and assigns it to the searchbox variable
let searchBox = document.querySelector('#searchBox');
let addCoffeeButton = document.querySelector('#add-coffee-button');

// conditional statements checks if the variables are true. If so it adds the event listeners and renders initial coffee data
if (tbody && roastSelection && searchBox && addCoffeeButton) {
	roastSelection.addEventListener('change', updateCoffees);
	searchBox.addEventListener('keyup', updateCoffees);
	addCoffeeButton.addEventListener('click', addCoffee);

	tbody.innerHTML = renderCoffees(coffees);
}
//generates an HTML string representing a table row with the coffee details
function renderCoffee(coffee) {
	let html = '<div class="card col-md-4 col-5 my-card" id="indv-card">';
	html += '<div class="card-body">';
	html += '<h5 class="card-title" style="color: var(--card-desc)">' + coffee.name + '</h5>';
	html += '<h5 class="card-subtitle mb-2" style="color: var(--main-text-color)">' + coffee.roast + " roast " + '</h5>';
	html += '<h6 class="card-subtitle mb-2" style="color: var(--bs-darkbrown)">' + coffee.desc + '</h6>';
	html += '</div>';
	html += '</div>';

	return html;
}


// iterates over the array and calls renderCoffee for each coffee object and concatenates the resulting HTML strings
function renderCoffees(coffees) {
	let html = '';
	for (let i = 0; i < coffees.length; i++) {
		html += renderCoffee(coffees[i]);
	}
	return html;
}
// This is called when the roast selection or search box changes. It filters the coffees array based on the selected roast and search query and then updates the HTML of tbody element with the filtered coffees
function updateCoffees() {
	let selectedRoast = roastSelection.value;
	let searchedCoffee = searchBox.value.toLowerCase();
	let filteredCoffees = coffees.filter(function (coffee) {
		if (selectedRoast === 'all') {
			return coffee.name.toLowerCase().includes(searchedCoffee);
		} else {
			return coffee.roast === selectedRoast && coffee.name.toLowerCase().includes(searchedCoffee);
		}
	});
	tbody.innerHTML = renderCoffees(filteredCoffees);
}
// addCoffee function is called when the add coffee button is clicked. it prevents the default form submission behavior. It retrieves the input values for the new coffee name and selected roast and creates a new coffee object which is then added to the coffees array and updates the tbody.
function addCoffee(event) {
	event.preventDefault();

	let coffeeNameInput = document.getElementById('add-coffee');
	let selectedRoast = document.getElementById('roast-selection-add').value;
	let newCoffeeName = coffeeNameInput.value.trim();

	if (newCoffeeName !== '') {
		let newCoffee = {
			id: coffees.length + 1,
			name: newCoffeeName,
			roast: selectedRoast
		};

		coffees.push(newCoffee);
		tbody.innerHTML = renderCoffees(coffees);

		coffeeNameInput.value = '';
		document.getElementById('roast-selection-add').value = 'all';
	}
}
