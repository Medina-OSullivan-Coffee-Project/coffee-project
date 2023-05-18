"use strict";

function renderCoffee(coffee) {
	let html = '<tr class="coffee">';
	html += '<td>' + coffee.id + '</td>';
	html += '<td>' + coffee.name + '</td>';
	html += '<td>' + coffee.roast + '</td>';
	html += '</tr>';

	return html;
}

function renderCoffees(coffees) {
	let html = '';
	for (let i = 0; i < coffees.length; i++) {
		html += renderCoffee(coffees[i]);
	}
	return html;
}

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

let coffees = [
	{ id: 1, name: 'Light City', roast: 'light' },
	{ id: 2, name: 'Half City', roast: 'light' },
	{ id: 3, name: 'Cinnamon', roast: 'light' },
	{ id: 4, name: 'City', roast: 'medium' },
	{ id: 5, name: 'American', roast: 'medium' },
	{ id: 6, name: 'Breakfast', roast: 'medium' },
	{ id: 7, name: 'High', roast: 'dark' },
	{ id: 8, name: 'Continental', roast: 'dark' },
	{ id: 9, name: 'New Orleans', roast: 'dark' },
	{ id: 10, name: 'European', roast: 'dark' },
	{ id: 11, name: 'Espresso', roast: 'dark' },
	{ id: 12, name: 'Viennese', roast: 'dark' },
	{ id: 13, name: 'Italian', roast: 'dark' },
	{ id: 14, name: 'French', roast: 'dark' },
];

let tbody = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');
let searchBox = document.querySelector('#coffee-name-add');

roastSelection.addEventListener('change', updateCoffees);
searchBox.addEventListener('keyup', updateCoffees);

updateCoffees();
