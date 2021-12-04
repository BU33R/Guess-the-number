// Définition des variables nécessaires au stockage des données : 

// La première variable — randomNumber — reçoit le nombre aléatoire entre 1 et 100, 
// calculé en utilisant un algorithme mathématique.

let randomNumber = Math.floor(Math.random() * 100) + 1;

// Les trois variables suivantes sont chacune faite pour stocker une référence aux paragraphes de résultats dans le HTML.

let suppositions = document.querySelector('.suppositions');
let dernierResultat = document.querySelector('.dernierResultat');
let basOuHaut = document.querySelector('.basOuHaut');

// Les deux variables suivantes stockent des références au champ de saisie du formulaire et au bouton de soumission.

let Soumettre = document.querySelector('.Soumettre');
let guessField = document.querySelector('.guessField');

// Les deux dernières variables stockent un nombre de suppositions qui vaut initialement 1 
// (utilisées pour garder une trace du nombre de suppositions que le joueur a faite) 
// et une référence à un bouton de réinitialisation.

let guessCount = 1;
let resetButton;

// --------------------------FUNCTION TEST------------------------------

function checkGuess(){

    // déclare une variable nommée userGuess et définit sa valeur par celle qui vient d'être saisie dans le champ de texte.
    // Passer cette valeur par la méthode  Number(), 
    // juste pour s'assurer que la valeur stockée dans userGuess est bien un nombre.

    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        suppositions.textContent = 'Propositions précédentes : ';
    }
    suppositions.textContent += userGuess + ' ';
    
    // Ajoute la valeur courante userGuess à la fin du paragraphe guesses , 
    // plus un espace vide de sorte qu'il y aura un espace entre chaque supposition faite

    if (userGuess === randomNumber) {
        dernierResultat.textContent = 'Bravo, vous avez trouvé le nombre !';
        dernierResultat.style.backgroundColor = 'green';
        basOuHaut.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
        dernierResultat.textContent = '!!! PERDU !!!';
       setGameOver();
    } else {
        dernierResultat.textContent = 'Faux !';
        dernierResultat.style.backgroundColor = 'red';
       if (userGuess < randomNumber) {
        basOuHaut.textContent = 'Le nombre saisi est trop petit !';
       } else if (userGuess > randomNumber) {
        basOuHaut.textContent = 'Le nombre saisi est trop grand !';
       }
    }
    
    //  prépare une nouvelle proposition.

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

Soumettre.addEventListener('click', checkGuess);


// ----------------------------------------------------------------


function setGameOver() {

    // Désactivent l'entrée de texte et le bouton en définissant leurs propriétés désactivées à true.
    guessField.disabled = true;
    Soumettre.disabled = true;

    // Génèrent un nouvel <button> élément, 
    // avec le libellé "Commencer une nouvelle partie" et l'ajoute au bas du HTML existant.
    resetButton = document.createElement('button');
    resetButton.textContent = 'Commencer une nouvelle partie';
    document.body.appendChild(resetButton);

    // La dernière ligne définit un écouteur d'événement sur ce nouveau bouton : 
    // un click sur le bouton déclenchera un appel de la fonction  resetGame().
    resetButton.addEventListener('click', resetGame);

}

// réinitialise complètement les paramètres du jeu (le joueur pourra commencer une nouvelle partie). 

function resetGame() {

    // Remettre le compteur guessCount à 1.
    guessCount = 1;
    
    // Effacer tous les paragraphes d'information.
    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
    
    // Supprimer le bouton de réinitialisation.
    resetButton.parentNode.removeChild(resetButton);
    
    // Activer les éléments de formulaire, 
    // vide et met au point le champ de texte, prêt à entrer une nouvelle proposition.
    guessField.disabled = false;
    Soumettre.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    // Supprimer la couleur d'arrière-plan du paragraphe lastResult.
    dernierResultat.style.backgroundColor = 'white';
    
    // Génèrer un nouveau nombre aléatoire.
    randomNumber = Math.floor(Math.random() * 100) + 1;
}