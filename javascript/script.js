/*
========================================================================================================================
=====================PARTIE DECLARATION DES VARIABLES==============================================================
========================================================================================================================
*/

const   Form = document.querySelector("#Form"),                     // stockage de la forme 
        Name = document.querySelector("#NameField"),                //le textbox nom complet 
        Email = document.querySelector("#EmailField"),              //le textbox adresse email
        Password = document.querySelector("#PasswordField"),        //le textbox mot de passe 
        //le textbox valider mot de passe
        ValidatePassword = document.querySelector("#ValidatePasswordField"),
        // le checkbox accepter les conditions
        Conditions = document.querySelector("#ConditionsField"),
        // les ptites textes affiche apres chaque erreur de validation
        ErrorShow = document.querySelector("#errorHandler"),
        // la ptite icone a droite du textbox mot de passe
        ShowHidePassword1 = document.querySelector("#Eye1 i"),
        // la petite icone a droit du textbox valider le mot de passe
        ShowHidePassword2 = document.querySelector("#Eye2 i"),
        /*
            un tableau qui contient les 4 textboxes pour controler les labels flottantes 
            en haut en cours de focus
        */
        hasData = document.querySelectorAll(".FocusOut"),
        /*
            jai essayer de donner un z-index -1 au labels flottantes mais ca na pas marcher 
            alors jai fais sa en javascript puisque c plus efficace 
            au cas du click sur label on va focus le textbox voulu 
        */
        LabelClick = document.querySelectorAll(".placeHolder");

/*
========================================================================================================================
=====================les expressions reguliaires pour les controles de saisie==============================================================
========================================================================================================================

a savoir en ecrivant une 'i' a la fin du expression on evite la sensibilitee des lettres 
alors si a l'explication ecrit des lettres  ca veut dire (entre a et z et A et Z)
des chiffres ca veut dire de 0 a 9

*/

/*
        =====l'expression regulaire pour l'email ===========

    l'utilisateur doit entrer exactement :  un mot qui contient des lettres et/ou des chiffres
    et/ou des points et/ou des _  et/ou des - (cette format que jai decris peut ce repeter une 
    ou plusieurs fois) suivi d'une seul @ , Apres il faut entrer un mot qui contient (des lettres
    et/ou des chiffres une ou plusieurs fois)  suivi d'une point , cette deuxieme format peut ce
    repeter une ou plusieurs fois ( exemple aaa-bbb@aaa.bbb.ccc. .etc) apres il doit obligatoirement
    entrer un mot de 2 ou 3 char par exemple aa bb ccc ddd (puisque l'email finit avec .fr/.com...etc)
    la format finale sera par exemple comme ca ayoub-akkal.123@ayoub.akkal.com (ou autre chose)

*/        regEmail = /^[A-Z0-9._-]+@([A-Z0-9]+\.)+[A-Z]{2,3}$/i,

/*
        =====l'expression regulaire pour le nom complet ===========

    puisque ya des nom qui commencent par 'EL' par exemple 'el akkal ayoub' et ya une posibilitee
    que l'utilisateur final peut penser a entrer son nom en premier, On a specifier que l'utilisateur 
    doit entrer au moins 2 mots (qui contienent que des lettres ) separer par 'espace' ,chaque mot 
    doit comporter au moins 2 lettres et au plus 30 lettres
    par exemple ayoub akkal , mohamed amine el akkal ...etc

*/      regName = /^[A-Z]{2,30}(\s[A-Z]{2,30})+$/i,
        
/*
        =====l'expression regulaire pour le mot de passe===========

    pour le password l'utilisateur doit entrer entre 4 et 6 characteres qui peuvent etre nimporte quoi 
    par exemple
    12345 , abdc , abc.12 , ...etc

*/      regPassword = /^.{4,6}$/;
        

// ========================================================================================================================
// =====================PARTIE CONTROLES DE SAISIE SUR LEVENT SUBMIT=======================================================
// ========================================================================================================================

// on va ecouter la Form quon recupere en haut pour un event de submit 
        Form.addEventListener("submit", e => {

// on test si l'un des textboxes est vide 
            if(Name.value =="" || Email.value=="" || Password.value=="" || ValidatePassword.value=="")
            {

/*
    la function preventDefault() aide a stoper l'event en cours de s'appliquer alors pas besoin
    d'expliquer cette function a chaque fois

    sur cette cas on stop l'event submit pour qu'on perde pas l'affichage des erreurs
*/

                e.preventDefault();

// la classe .help en css a deux proprietees:  color:red et display:block

                ErrorShow.classList.add("help");
                ErrorShow.innerHTML="il faut remplir tout les champs avant s'inscrire ";

// fin premiere condition if
            }

// apres on test si l'utilisateur a accepter les conditions 
            else if (!Conditions.checked)
            {
                e.preventDefault();
                ErrorShow.classList.add("help");
                ErrorShow.innerHTML="il faut accepter les conditions generales avant s'inscrire";
            }

// si tout passe bien  on passe a la prochaine etape qui est la validation des valeurs
            else
            {

//on test le textbox nom on passant l'expression reguliaire decris en haut
                if(!regName.test(Name.value))
                {
                    e.preventDefault();
                    ErrorShow.classList.add("help");
                    ErrorShow.innerHTML="le nom n'est pas valid ";
                }


// on test aussi si lutilisateur a respecter lexpression reguliaire du email
                if(!regEmail.test(Email.value))
                {
                    e.preventDefault();
                    ErrorShow.classList.add("help");
                    ErrorShow.innerHTML="l'email n'est pas valid ";
                }


// comme en haut on test si le password et aussi valid
                if(!regPassword.test(Password.value))
                {
                    e.preventDefault();
                    ErrorShow.classList.add("help");
                    ErrorShow.innerHTML="votre password doit comporter entre 4 et 6 characteres ";
                }


// et a la fin on  test si les deux mots de passe sont les memes
                if(ValidatePassword.value != Password.value)
                {
                    e.preventDefault();
                    ErrorShow.classList.add("help");
                    ErrorShow.innerHTML="les mots de passe sont pas les memes";
                }

// fin else qui est apres la ligne  alert("please accept the conditions before submit");
            }

// fin function submit
        }
        
// fin event listener submit
        );

        
// ========================================================================================================================
// =====================PARTIE AffiChage et Cachage du password sur les deux textboxes password ===========================
// ========================================================================================================================


// on ecoute pour une click sur la premiere icon du password  
ShowHidePassword1.addEventListener("click", () => {

// on check si le type de textbox est password  
    if(Password.type == "password")
    {

/*
        si le type est password on change le type a text pour afficher le mot de passe et 
        on change l'icone du yeu on utilisant la methode
        classlist.add et classlist.remove
*/
        Password.type = "text";
        ShowHidePassword1.classList.add("fa-eye-slash"); 
        ShowHidePassword1.classList.remove("fa-eye");
    }

// sinon le type du textbpx est text
    else
    {

// alors on change le type a password pour masquer le text et on change aussi l'icon
        Password.type = "password";
        ShowHidePassword1.classList.add("fa-eye");          
        ShowHidePassword1.classList.remove("fa-eye-slash");
    }

// fin function click
}

// fin event listener showhidepassword1
);

// on ecoute pour une click sur la deuxieme icon du password ici 
ShowHidePassword2.addEventListener("click", () => {

// on check si le type du textbox est password
    if(ValidatePassword.type == "password")
    {

/*
        si le type est password on change le type a text pour afficher le mot de passe et 
        on change l'icone du yeu on utilisant la methode
        classlist.add et classlist.remove
*/
        ValidatePassword.type = "text";
        ShowHidePassword2.classList.add("fa-eye-slash");
        ShowHidePassword2.classList.remove("fa-eye");
    }

// sinon le type de textbox est text
    else
    {

//alors on le change a password et on chance aussi l'icon
        ValidatePassword.type = "password";
        ShowHidePassword2.classList.add("fa-eye");
        ShowHidePassword2.classList.remove("fa-eye-slash");
    }

// fin function click
}
// fin event listener showhidepassword2
);

// ========================================================================================================================
// =====================PARTIE DE CUSTOMISATION DU PLACE HOLDER DES 4 INPUTS ==============================================
// ========================================================================================================================

// une boucle pour parcourir les elements du array hasData qui contient les 4 textboxes

for (let index = 0; index < hasData.length; index++) 
{

// sur chaque tour on stock l'element courant sur une variable 
        const element = hasData[index];

// appres on ajout a l'element stocker (qui est un textbox) un event listener OnFocusOut 

    element.addEventListener('focusout' , () => {

/*
    au cas du perte de focus sur l'element courant on a une function qui a le role de 
    tester si l'input courant est vide : 
    si oui on ajoute la classe HasData au elementparent du element courant , 
    cette classe est faite pour quon laisse le label flottante au cas ou l'input courant
    nest pas vide 
    sinon on retire la classe HasData pour que le label retourne a sa place comme un placeHolder

*/
        //condition
        element.value != "" ? element.parentElement.classList.add("HasData")    //if true
                            : element.parentElement.classList.remove("HasData");//else false

// fin function focusout
    }

// fin event listener element
    );

// fin for loop
}

// ========================================================================================================================
// =====================PARTIE fixage du label qui interdire l'ecriture sur le textbox ==============================================
// ========================================================================================================================

// une loup pour parcourir les labels qui sont stocker sur la table labelClick
for (let index = 0; index < LabelClick.length; index++) {

// puisque chaque label a son textbox frere qui est deja stocker sur la table hasdata

// on stock le label courrant et le textbox qui est sur le meme index a deux var differents
    const label = LabelClick[index];
    const textbox = hasData[index];

// on ecoute pour un event click sur le label courant qui est a cette cas la variable label
    label.addEventListener("click", () => {


// au cas de click on focus le textbox qui a le meme index 
        textbox.focus();

// fin function click
    }
    
//fin eventlistener click
    );

//fin loup for
}
