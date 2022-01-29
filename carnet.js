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

    //ancien code pour afficher le code postal
    //$('#search').click(afficherCodePostal); // fait appel au bouton
    //$('#validationCustom09').on('input',afficherCodePostal); // fait appel au oninput (retrait du bouton)

    //ici on affiche le code postal + on selectionne la ville associée
    let codePostalInput = document.getElementById("validationCustom09");
    codePostalInput.oninput = afficherCodePostal;

    //ici on lance la validation d'ajout de contact via bootstrap
    validationBootstrap();

    //ici on affiche le nouvel object contact à la validation du formulaire    
    $('#form').submit(function (event) {
        event.preventDefault();
        if ($(this)[0].checkValidity()) {//ici $(this) est #ajoutForm car on est dans la function
            console.log("form is good");
            // On récupère toute les données
            let newContact = {
                nom: $("#validationCustom01").val(),
                prenom: $("#validationCustom02").val(),
                dateDeNaissance: $("#validationCustom03").val(),
                situationFam: $("#validationCustom04").val(),
                nombreEnfant: $("#validationCustom05").val(),
                telephone: $("#validationCustom06").val(),
                mail: $("#validationCustom07").val(),
                adresse: $("#validationCustom08").val(),
                codePostal: $("#validationCustom09").val(),
                ville: $("#validationCustom10").val(),
                profession: $("#validationCustom11").val(),
                entreprise: $("#validationCustom12").val(),
                linkedIn: $("#validationCustom13").val()
            }
            console.log(newContact);
        }
    });
    //let submitForm= document.getElementById("form");
    //submitForm.submit = ajouterContact();


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

function afficherCodePostal() {
    console.log('debut code postal')
    if ($('#validationCustom09').val().length == 5) {
        let codePost = $('#validationCustom09').val();
        console.log(codePost);
        $.ajax('https://apicarto.ign.fr/api/codes-postaux/communes/' + codePost, {
            success: (result) => {
                console.log("success!!")
                $('#validationCustom09').addClass("is-valid");
                $('#validationCustom09').removeClass("is-invalid");
                let html = '';
                for (let code of result) {
                    html += '<option value =' + code.nomCommune + '>' + code.nomCommune + '</option>';
                }
                console.log(html);
                $('#validationCustom10').removeAttr('disabled');
                $('#validationCustom10').html(html);

            },
            error: (err) => {
                console.log(err)
                $('#validationCustom09').removeClass("is-valid");
                $('#validationCustom09').addClass("is-invalid");
            }
        });
    }
}

/*
function ajouterContact(event) {
    event.preventDefault();
    console.log('debut ajout contact');
    if ($("#form")[0].val().checkValidity()) {
        console.log('formulaire ok')
        var newContact = {
            nom: $("#validationCustom01").val(),
            prenom: $("#validationCustom02").val(),
            dateDeNaissance: $("#validationCustom03").val(),
            situationFam: $("#validationCustom04").val(),
            nombreEnfant: $("#validationCustom05").val(),
            telephone: $("#validationCustom06").val(),
            mail: $("#validationCustom07").val(),
            adresse: $("#validationCustom08").val(),
            codePostal: $("#validationCustom09").val(),
            ville: $("#validationCustom10").val(),
            profession: $("#validationCustom11").val(),
            entreprise: $("#validationCustom12").val(),
            linkedIn: $("#validationCustom13").val()
        };
        console.log(newContact);
    }
}
*/


function validationBootstrap() { //permet d'utiliser la validation par bootstrap

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
}
