"use strict"

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
let searchBox = document.querySelector('#searchBox');
let addCoffeeButton = document.querySelector('#add-coffee-button');

if (tbody && roastSelection && searchBox && addCoffeeButton) {
	roastSelection.addEventListener('change', updateCoffees);
	searchBox.addEventListener('keyup', updateCoffees);
	addCoffeeButton.addEventListener('click', addCoffee);

	tbody.innerHTML = renderCoffees(coffees);
}

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

function addCoffee(event) {
	event.preventDefault();

	const coffeeNameInput = document.getElementById('add-coffee');
	const selectedRoast = document.getElementById('roast-selection-add').value;
	const newCoffeeName = coffeeNameInput.value.trim();

	if (newCoffeeName !== '') {
		const newCoffee = {
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
