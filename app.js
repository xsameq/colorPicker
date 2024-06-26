const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
	event.preventDefault();

	if (event.code.toLowerCase() === 'space') {
		setRandomColors();
	}
});
// function colorCreate() {
//   // RGB

//   const hexCodes = '0123456789ABCDEF';
//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return '#' + color;
// }

document.addEventListener('click', (event) => {
	const type = event.target.dataset.type;

	if (type === 'lock') {
		const node =
			event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0];

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	} else if (type === 'copy') {
		copyToClipboard(event.target.textContent);
	}
});

function copyToClipboard(text) {
	return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitialed) {
	const colors = isInitialed ? colorsFromHash() : [];

	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock');
		const text = col.querySelector('h2');
		const colT = col.querySelector('h1');
		const button = col.querySelector('button');

		if (isLocked) {
			colors.push(text.textContent);
			return;
		}

		const color = isInitialed
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random();

		if (!isInitialed) {
			colors.push(color);
		}
		text.textContent = color;
		col.style.background = color;

		setTextColor(text, color);
		if (index === 2) {
			setTextColor(colT, color);
		}
		setTextColor(button, color);
	});

	updateHash(colors);
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();

	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateHash(colors = []) {
	document.location.hash = colors
		.map((col) => col.toString().substring(1))
		.join('-');
}

function colorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map((color) => '#' + color);
	}
	return [];
}

setRandomColors(true);
