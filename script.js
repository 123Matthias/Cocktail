function suchen() {
    var suche = document.getElementById('inputsuchen').value;
    var request = new XMLHttpRequest();
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + suche;
    request.open('GET', url);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var alleDrinks = JSON.parse(request.response).drinks;
            var liste = document.getElementById('listeallerdrinks');
            var zubereitung = document.getElementById('zubereitung');



            $("#listeallerdrinks").empty();


            for (d = 0; d < alleDrinks.length; ++d) {
                var node = document.createElement('a');
                node.type = "button";
                node.classList = "cocktaillink";
                var text = document.createTextNode(alleDrinks[d].strDrink);
                var textzubereitung = document.createTextNode(alleDrinks[d].strInstructionsDE);



                node.appendChild(text);
                liste.appendChild(node);

            }


            $(".cocktaillink").on('click', function () {
                var text = $(this).text();
                var auswahl = $("#auswahl");
                auswahl.text(text);
                ingredients();
            });

        }
    }
}







function ingredients() {

    var auswahl = document.getElementById("auswahl").innerText;

    var request = new XMLHttpRequest();
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + auswahl;
    request.open('GET', url);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var Drink = JSON.parse(request.response).drinks;




            $("#ingredients").empty();
            $("#picture").empty();
            $("#textzubereitung").empty();

            // Zutaten dynamisch sammeln
            const ingredientsArr = [];
            for (let i = 1; i <= 30; i++) {
                const measure = Drink[0]["strMeasure" + i] || "";
                const ingredient = Drink[0]["strIngredient" + i];
                if (!ingredient) break; // stoppt, wenn keine Zutat mehr
                ingredientsArr.push(measure + ingredient);
            }
            const alleingredients = ingredientsArr.join(", ");

            // Textknoten für Zubereitung
            const ZubereitungDE = document.createTextNode(Drink[0].strInstructionsDE);
            const textzubereitung = document.getElementById("textzubereitung");

            // Textknoten für Zutaten
            const node = document.getElementById("ingredients");
            const ingredients = document.createTextNode(alleingredients);

            // Bild einfügen
            const pictureURL = Drink[0].strDrinkThumb;
            $("#picture").append('<span id="imgspan">click me <img id="img" src="' + pictureURL + '" /></span>');

            // Inhalte anhängen
            node.appendChild(ingredients);
            textzubereitung.appendChild(ZubereitungDE);


        }
    }
}



$("#alkoholische").on('click', function () {
    var request = new XMLHttpRequest();
    var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
    request.open('GET', url);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var alleDrinks = JSON.parse(request.response).drinks;
            var liste = document.getElementById('listeallerdrinks');

            $("#listeallerdrinks").empty();

            for (d = 0; d < alleDrinks.length; ++d) {
                var node = document.createElement('a');
                node.type = "button";
                node.classList = "cocktaillink";
                var text = document.createTextNode(alleDrinks[d].strDrink);

                node.appendChild(text);
                liste.appendChild(node);
            }

            $(".cocktaillink").on('click', function () {
                var text = $(this).text();
                var auswahl = $("#auswahl");
                auswahl.text(text);
                ingredients();
            });

        }
    }

});



$("#nichtalkoholische").on('click', function () {
    var request = new XMLHttpRequest();
    var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    request.open('GET', url);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var alleDrinks = JSON.parse(request.response).drinks;
            var liste = document.getElementById('listeallerdrinks');

            $("#listeallerdrinks").empty();

            for (d = 0; d < alleDrinks.length; ++d) {
                var node = document.createElement('a');
                node.type = "button";
                node.classList = "cocktaillink";
                node.id = "cocktaillink";
                var text = document.createTextNode(alleDrinks[d].strDrink);

                node.appendChild(text);
                liste.appendChild(node);
            }

            $(".cocktaillink").on('click', function () {
                var text = $(this).text();
                var auswahl = $("#auswahl");
                auswahl.text(text);
                ingredients();
            });

        }
    }

});



$(document).ready(function () {
    $("#picture").on("click", function () {
        const img = document.getElementById("img");
        const url = img.getAttribute("src");

        const w = window.open("", "imgPopup", "width=600,height=600,resizable=yes");

        w.document.write(`
      <html>
        <head>
          <title>Bild</title>
          <style>
            body {
              margin: 0;
              background: #000;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .close {
              position: fixed;
              top: 10px;
              right: 10px;
              background: rgba(0,0,0,.6);
              color: #fff;
              border: 0;
              border-radius: 50%;
              width: 80px;
              height: 80px;
              font-size: 40px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <button class="close" onclick="window.close()">✖</button>
          <img src="${url}" />
        </body>
      </html>
    `);

        w.document.close();
    });
});