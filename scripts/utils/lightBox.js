// Afficher la lightbox 
export function displayCarrousel () {

	const lightBox = document.getElementById("carrousel");
	const main = document.querySelector("main");
	const carrousel = document.getElementById("center");
	const media = document.querySelectorAll("figure a");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const header = document.querySelector("header");
	const footer = document.querySelector("footer");
	let focusedElementBeforeLightBox;
	const closeLightBox = document.getElementById("closeLightBox");
	media.forEach((ele, index) => {
		ele.ariaHasPopup = "carrousel";

		ele.addEventListener("click", function (e) {
			e.preventDefault();
			openLightBox();
			carrousel.innerHTML = "";
			const mediaClone = ele.cloneNode(true);
			if (mediaClone.firstChild.nodeName === "VIDEO"){
				mediaClone.firstChild.setAttribute("controls","");
			}
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
				if (prevFigClone.firstChild.nodeName === "VIDEO"){
					prevFigClone.firstChild.setAttribute("controls","");
				}
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
				if (nextFigClone.firstChild.nodeName === "VIDEO"){
					nextFigClone.firstChild.setAttribute("controls","");
				}
				const nextFigCloneName = nextFig.nextSibling.cloneNode(true);
				carrousel.innerHTML = "";
				carrousel.append(nextFigClone);
				carrousel.append(nextFigCloneName);
			}

			/**
			 * @param {KeyboardEvent} e afficher les medias suivantes ou précedante avec les fléches droites et gauches de clavier 
			 */
			lightBox.addEventListener("keydown", (e) => {
				if (e.key === "ArrowRight") {
					nextFig();
					elementFocus();
					//e.preventDefault();
				} 
				if (e.key === "ArrowLeft") {
					prevFig();
					elementFocus();
					//e.preventDefault();
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
		focusedElementBeforeLightBox = document.activeElement;
		lightBox.style = "display:flex; justify-content:center; align-items:center";
		lightBox.ariaHidden = false;
		main.ariaHidden = true;
		header.ariaHidden = true;
		footer.ariaHidden = true;
		elementFocus();
	}

	// Naviguer dans la lightbox avec le clavier 'touch tab'
	function elementFocus() {
		let focusableElements = lightBox.querySelectorAll("#center, #prev, #next, #closeLightBox");
		focusableElements = Array.prototype.slice.call(focusableElements);
		//console.log(focusableElements);
		let firstElement = focusableElements[0];
		let lastElement = focusableElements[focusableElements.length - 1];
		firstElement.focus();
		lightBox.addEventListener("keydown",trapTabKey);
		function trapTabKey(e) {
			let isTabPressed = e.key === "Tab" ;
			if (!isTabPressed) {
				return;
			}			
			if (e.shiftKey) { 
				if (document.activeElement === firstElement) {
					lastElement.focus(); 
					e.preventDefault();
				}
			} else { 
				if (document.activeElement === lastElement) { 
					firstElement.focus(); 
					e.preventDefault();			
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
		header.ariaHidden = false;
		footer.ariaHidden = false;
		focusedElementBeforeLightBox.focus();

	}

	// Fermer la lightbox avec le click de la souris
	closeLightBox.addEventListener("click", close);

	/****
	 * @param {KeyboardEvent} e fermer la lightbox avec la touche escape 'clavier'
	***/
	lightBox.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			close();
		}
	});
}
