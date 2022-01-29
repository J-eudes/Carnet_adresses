var contactsTrie
var valNom;
var valPrenom;
let url = new URL(window.location);
let paramString = url.search;
let urlParams = new URLSearchParams(url.search);
var newContact;

$(document).ready(function () {
    // on affiche ce message quand la page est chargée
    console.log("La page est chargée");

    //on trie les contacts par ordre alphabetique et on les affiches en console
    contactsTrie = contacts.sort(trieContacts);
    console.log(contactsTrie);

    //on affiche la liste de contacts dans une liste (url visulaisation carnet)
    afficherContacts();
    
    // ici on passe le nom et le prénom en paramètre url pour afficher un contact
    let valNom = urlParams.get('nom');
    let valPrenom = urlParams.get('prenom');

    //ici on affiche le contact avec les paramètres de l'URL
    $('#contactNom').html(valNom);
    $('#contactPrenom').html(valPrenom);

});

function trieContacts(a, b) {
    if (a.nom < b.nom) { return -1; }
    if (a.nom > b.nom) { return 1; }
    return 0;
}

function afficherContacts() {

    let listeContactsHtml = '';
    let lettre = '';

    for (let contact of contactsTrie) {
        if (lettre != contact.nom[0].toLowerCase()) { //si la 1ere lettre du nom est différente de l'index actuel
            lettre = contact.nom[0].toLowerCase(); // on assigne la lettre à l'index
            listeContactsHtml += '</ul>' // on ferme la liste
            listeContactsHtml += '<h4 id=' + lettre.toUpperCase() + '>' + lettre.toUpperCase() + '</h4><ul>'
        }
        //listeContactsHtml += '<li><a href="visucontact.html">' + contact.nom + '</a>, ' + contact.prenom + '</li>';
        listeContactsHtml += '<li><a href="visucontact.html?nom=' + contact.nom + '&prenom=' + contact.prenom + "\">" + contact.nom + '</a>, ' + contact.prenom + '</li>';

    }
    $('#listeDeContacts').html(listeContactsHtml);
}
