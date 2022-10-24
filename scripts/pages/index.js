import { photographerFactory } from "../factories/photographer.js";

// Récuperer les données de fichier json
async function getPhotographers() {
	let datas =  await fetch("./data/photographers.json").then(datas=>datas.json());
	return datas;  
}

/**
 * @param {Array} photographers Afficher la carte photographer
 */
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.append(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const  photographers = (await getPhotographers()).photographers;
	displayData(photographers);
}

init();



