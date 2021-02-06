// Selector para el home


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
        console.log(heroes)
    }
}

function showHeaderHeroe(jsonObj) {
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
                console.log(bgImage)
                pathImg = "url('" + heroe[j].urlFoto + "')";
                bgImage.style.backgroundImage= pathImg;
                nameHeroe.innerHTML = heroe[j].name;
                descHeroe.innerHTML = heroe[j].desc;
                urlHeroe.setAttribute('href', heroe[j].url);
                descUrl.innerHTML = heroe[j].desc;
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


leerJson()