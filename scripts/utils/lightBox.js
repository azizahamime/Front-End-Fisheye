// Afficher la lightbox 
export function displayCarrousel () {
	const lightBox = document.getElementById("carrousel");
	const main = document.querySelector("main");
	const carrousel = document.getElementById("center");
	const media = document.querySelectorAll("figure a");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const closeLightBox = document.getElementById("closeLightBox");
	media.forEach((ele, index) => {
		ele.ariaHasPopup = "carrousel";
		ele.addEventListener("click", function () {
			// e.preventDefault();
			openLightBox();
			carrousel.innerHTML = "";
			const mediaClone = ele.cloneNode(true);
			const mediaCloneTitle = ele.nextSibling.cloneNode(true);
			carrousel.append(mediaClone);
			carrousel.append(mediaCloneTitle);
			prevBtn.addEventListener("click", prevFig);
			nextBtn.addEventListener("click", nextFig);

			// Afficher media précedente
			function prevFig () {
				if (index === 0) {
					index = media.length;
				}
				const prevFig = media[--index];
				const prevFigClone = prevFig.cloneNode(true);
				const prevFigCloneName = prevFig.nextSibling.cloneNode(true);
				carrousel.innerHTML = "";
				carrousel.append(prevFigClone);
				carrousel.append(prevFigCloneName);
			}

			//Afficher media suivante
			function nextFig () {
				if (index === media.length) {
					index = 0;
				}
				const nextFig = media[index++];
				const nextFigClone = nextFig.cloneNode(true);
				const nextFigCloneName = nextFig.nextSibling.cloneNode(true);
				carrousel.innerHTML = "";
				carrousel.append(nextFigClone);
				carrousel.append(nextFigCloneName);
			}

			/**
			 * @param {KeyboardEvent} e afficher les medias suivantes ou précedante avec les fléches droites et gauches de clavier 
			 */
			document.addEventListener("keydown", (e) => {
				if (e.key === "ArrowRight") {
					nextFig();
					elementFocus();
				} 
				if (e.key === "ArrowLeft") {
					prevFig();
					elementFocus();
				}
			});

			/**
			 * @param {KeyboardEvent} e aller au media précédente en cliquant sur entre quand le focus est sur la fléshe gauche
			 */
			prevBtn.addEventListener("keydown",(e)=>{
				if (e.key === "Enter"){
					prevFig();
				}
			});

			/**
			 * @param {KeyboardEvent} e aller au media suivante en cliquant sur entre quand le focus est sur la fléshe droite
			 */
			nextBtn.addEventListener("keydown",(e) =>{
				if (e.key === "Enter"){
					nextFig();
				}
			});

			/**
			 * @param {KeyboardEvent} e fermer la modale en cliquand sur enter quand le foxus est sur la croix
			 */
			closeLightBox.addEventListener("keydown",(e)=>{
				if (e.key === "Enter"){
					close();
				}

			});

			/**
			 * @param {KeyboardEvent} e ouvrir la lightbox avec la touche enter
			 */
			ele.addEventListener("keydown",(e)=>{
				if (e.key === "Enter"){
					openLightBox();
				}
			});
		});
	});
	
	// Ouvrir la light box la fonction
	function openLightBox () {
		lightBox.style.display = "block";
		lightBox.ariaHidden = false;
		main.ariaHidden = true;
		elementFocus();
	}

	// Naviguer dans la lightbox avec le clavier 'touch tab'
	function elementFocus() {
		let focusableElements = lightBox.querySelectorAll("div#center,#prev,#next,#close");
		focusableElements = Array.prototype.slice.call(focusableElements);
		closeLightBox.focus();
		let firstElement = focusableElements[0];
		let lastElement = focusableElements[focusableElements.length - 1];
		lightBox.addEventListener("keydown",trapTabKey);
		function trapTabKey(e) {
			if (e.key === "Tab"){
				if(document.activeElement === lastElement){
					e.preventDefault();
					firstElement.focus();
				} 
			}
		}
	}

	/*****
	 * Fermer la lightbox la fonction
	 */
	function close () {
		lightBox.style.display = "none";
		lightBox.ariaHidden = true;
		main.ariaHidden = false;
	}

	// Fermer la lightbox avec le click de la souris
	closeLightBox.addEventListener("click", close);

	/****
	 * @param {KeyboardEvent} e fermer la lightbox avec la touche escape 'clavier'
	***/
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			close();
		}
	});
}
