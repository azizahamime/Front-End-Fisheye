/**
 * @param {object} data les données de photographer (nom,pays,slogan et tarif journalier)
 * @return {HTMLElement} 
 */
export function photographerFactory(data) {

	const { name, portrait, city, country, tagline, price, id } = data;
	const picture = `assets/photographers/${portrait}`;

	/**
	 * @return {HTMLElement} article return un article qui contient une image le nom le pays le slogan et le tarif journalier de photographer
	 */
	function getUserCardDOM() {
        
		const article = document.createElement( "article" );
		article.tabIndex ="0";

		//creer ue lien pour chaque article
		const link = document.createElement("a");
		link.href = `./photographer.html?id=${id}`;
		link.tabIndex = 0;
		article.append(link);

		// creer l'image
		const image = document.createElement("img");
		image.src = `./${picture}`;
		image.alt = `photo de ${name}`;
		link.append(image);

		// creer le nom
		const title = document.createElement("h2");
		title.innerText = ` ${name} `;
		title.id = "photographer-name";
		link.append(title);

		//creer le pays
		const cityP = document.createElement("p");
		cityP.innerText = `${city} , ${country}`;
		cityP.classList.add("photograph-city");
		article.append(cityP);

		//creer le slogan 
		const taglineP = document.createElement("p");
		taglineP.innerText = `${tagline} `;
		taglineP.classList.add("photograph-tagline");
		article.append(taglineP);

		//creer le prix 
		const priceP = document.createElement("p");
		priceP.innerText = `${price}€/jour `;
		priceP.classList.add("photograph-price");
		article.append(priceP);
      
		return (article);
	}
    
	return { getUserCardDOM };
}