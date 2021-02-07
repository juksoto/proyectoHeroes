// Selector para el home

var localStorage = window.localStorage;

function leerJson()
{
    const requestURL = 'info.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    // respuesta del json
    request.onload = function() {
        const heroes = request.response;
        showHeaderHeroe(heroes);
        showCardHeroes(heroes);
    }
}

function showHeaderHeroe(jsonObj) {
    var sectionTop = document.querySelector('.top .uVentanaHome .ventanaContainer');
    var nameHeroe = sectionTop.querySelector('h2 span');
    var descHeroe = sectionTop.querySelector('p');
    var urlHeroe = sectionTop.querySelector('.linkHeroe');
    var votosLike = document.querySelector(".top .uVotos .votosLike");
    var votosDisLike = document.querySelector(".top .uVotos .votosDisLike");

    var heroe = jsonObj;

    // convertimos como objeto

    for (var i = 0; i < heroe.length; i++) {
        if(heroe[i].destacado == true)
        {
            // actualizamos los datos con la información nueva
            nameHeroe.innerHTML = heroe[i].name;
            descHeroe.innerHTML = heroe[i].desc;
            urlHeroe.setAttribute('href', heroe[i].url);
            votosLike.setAttribute('data-votos', heroe[i].likes);
            votosDisLike.setAttribute('data-votos', heroe[i].dislikes);
            renderVotos(votosLike, votosDisLike);
        }
    }
    return false;
}

function showCardHeroes(jsonObj) {
    // array que permite validar que no se repita las cards en el render
    let contadoresCard = [];

    var containertHeroes = document.querySelector('.cardsHeroes');

    //asignamos un identificador a cada tarjeta
    var cards = containertHeroes.querySelectorAll(".cardItem");
    for (var i=0, max=cards.length; i < max; i++) {
        
        //agregamos una clase unica para cada card item
        newNameClass ="cardItem_" + i;
        cards[i].classList.add(newNameClass);

        // llenamos con la informacion del json
        var heroe = jsonObj;
        for (var j = 0; j < heroe.length; j++) {
            if( (heroe[j].destacado == false ) && (contadoresCard.indexOf( heroe[j].id ) == -1))
            {
                // ubicamos los elementos en la card
                var bgImage = cards[i].querySelector('.uCardItem');
                var nameHeroe = cards[i].querySelector('.titleCard');
                var descHeroe = cards[i].querySelector('.descriptionCard');
                var urlHeroe = cards[i].querySelector('.actionBtn a');
                var descUrl = cards[i].querySelector('.uCardActions p');
                var votosLike = cards[i].querySelector(".uVotos .votosLike");
                var votosDisLike = cards[i].querySelector(".uVotos .votosDisLike");
                
                // actualizamos los datos con la información nueva
                pathImg = "url('" + heroe[j].urlFoto + "')";
                bgImage.style.backgroundImage= pathImg;
                nameHeroe.innerHTML = heroe[j].name;
                descHeroe.innerHTML = heroe[j].desc;
                urlHeroe.setAttribute('href', heroe[j].url);
                descUrl.innerHTML = heroe[j].descUrl;
                votosLike.setAttribute('data-votos', heroe[j].likes);
                votosLike.setAttribute('data-id', heroe[j].id);
                votosDisLike.setAttribute('data-votos', heroe[j].dislikes);
                votosDisLike.setAttribute('data-id', heroe[j].id);
                renderVotos(votosLike, votosDisLike);

                //agreamos este id para validar que no se repita esta card
                contadoresCard.push(heroe[j].id);
                //cerramos este ciclo
                break;
            }
            
        }
    }
   
  }
  function renderCard(itemCard )
  {
    var sectionTop = document.querySelector('.top .ventanaContainer');
    var nameHeroe = sectionTop.querySelector('h2 span');
    var descHeroe = sectionTop.querySelector('p');
    var urlHeroe = sectionTop.querySelector('.linkHeroe');
    var votosLike = document.querySelector(".top .uVotos .votosLike");
    var votosDisLike = document.querySelector(".top .uVotos .votosDisLike");

    var heroe = jsonObj;

    // convertimos como objeto

    for (var i = 0; i < heroe.length; i++) {
        if(heroe[i].destacado == true)
        {
            // actualizamos los datos con la información nueva
            nameHeroe.innerHTML = heroe[i].name;
            descHeroe.innerHTML = heroe[i].desc;
            urlHeroe.setAttribute('href', heroe[i].url);
            urlHeroe.setAttribute('data', heroe[i].url);
            votosLike.setAttribute('data-votos', heroe[i].likes);
            votosDisLike.setAttribute('data-votos', heroe[i].dislikes);
            renderVotos(votosLike, votosDisLike);
        }
    }
    return false;
  } 


  function renderVotos(cLike, cDislike ){
    if(cLike.getAttribute("data-votos"))
    {
        //calculamos el %
        cantLikes = parseInt(cLike.getAttribute("data-votos"));
        cantDislikes =  parseInt(cDislike.getAttribute("data-votos"));
        totalVotos = cantLikes + cantDislikes;
        // redondeamos el %
        porLike =  Math.round( (cantLikes *100) / totalVotos);

        // restamos al 100%
        porDislike = 100 - porLike;

        // asignamos los votos
        cLike.querySelector("span").innerHTML = porLike;
        valueVotos = porLike + "%";
        cLike.style.width = valueVotos;

        cDislike.querySelector("span").innerHTML = porDislike;
        valueVotos = porDislike + "%";
        cDislike.style.width = valueVotos;
    }
    return false;
  }

/**** actualizar los votos */
function votar(){
    var ventanaHome = document.querySelector(".top .uVentanaHome");
    var ventanaLike = document.querySelector(".top .uVentana_like");
    var ventanaDislike = document.querySelector(".top .uVentana_dislike");
    
    var buttonLike = document.querySelector('#votarLike');
    var buttonDisLike =  document.querySelector('#votarDisLike');

    //agregamos los eventos
    buttonLike.addEventListener("click", function(){changeVoto(1)});
    buttonDisLike.addEventListener("click", function(){changeVoto(-1)});
    // ocultamos las ventanas y mostramos la de home
    document.querySelectorAll('.votarNuevo').forEach(item => {
        item.addEventListener('click', event => {
            ventanaHome.classList.remove("d-none");
            ventanaLike.classList.add("d-none");
            ventanaDislike.classList.add("d-none");
        })
      })
}

function changeVoto(voto){
    // cargamos los contenedores
    var votosLike = document.querySelector(".top .uVotos .votosLike");
    var votosDisLike = document.querySelector(".top .uVotos .votosDisLike");
    var ventanaHome = document.querySelector(".top .uVentanaHome");
    var ventanaLike = document.querySelector(".top .uVentana_like");
    var ventanaDislike = document.querySelector(".top .uVentana_dislike");

    // capturamos los votos actuales
    cantLikes = parseInt(votosLike.getAttribute("data-votos"));
    cantDislikes =  parseInt(votosDisLike.getAttribute("data-votos"));
    
    ventanaHome.classList.add("d-none");
    
    // sumamos o restamos de acuerdo al voto. Actualizamos los campos data
    if(voto > 0)
    {
        cantLikes ++;
        votosLike.setAttribute('data-votos', cantLikes);
        localStorage.setItem("votosLike", cantLikes);
        ventanaLike.classList.remove("d-none");

    }
    else
    {
        cantDislikes ++ ;
        votosDisLike.setAttribute('data-votos', cantDislikes);
        localStorage.setItem("votosDisLike", cantDislikes);
        ventanaDislike.classList.remove("d-none");
    }

    // realizamos el render de los votos
    renderVotos(votosLike , votosDisLike )
}

function updateVotosLocalStorage()
{
    var votosLike = document.querySelector(".top .uVotos .votosLike");
    var votosDisLike = document.querySelector(".top .uVotos .votosDisLike");

    var cantLikes = localStorage.getItem("votosLike");
    var cantDislikes = localStorage.getItem("votosDisLike");

    if (localStorage.getItem("votosLike") != null) {
    
        // actualizar los votos
        votosLike.setAttribute('data-votos', cantLikes);
        votosDisLike.setAttribute('data-votos', cantDislikes);
    
        renderVotos(votosLike , votosDisLike )
      }
      else{

        localStorage.setItem("votosLike", 10);
        localStorage.setItem("votosDisLike", 10);
      }
}


/** ejecutamos */
$(function() {
    leerJson()
    votar()
    // guardar en localstorage
    setTimeout(function () {
        updateVotosLocalStorage()
    },500);
});

