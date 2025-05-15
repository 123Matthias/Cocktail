function suchen() {
    var suche = document.getElementById('inputsuchen').value;
        var request = new XMLHttpRequest();
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+suche;
        request.open('GET', url);
        request.send();

        request.onreadystatechange = function() {
            if( request.readyState===4) {
                var alleDrinks = JSON.parse(request.response).drinks;
                var liste = document.getElementById('listeallerdrinks');
                var zubereitung = document.getElementById('zubereitung');
            
        

            $("#listeallerdrinks").empty();
         
            
            for(d=0; d<alleDrinks.length;++d) {
                var node = document.createElement('a');
                node.type="button";
                node.classList="cocktaillink";
                var text = document.createTextNode(alleDrinks[d].strDrink);
                var textzubereitung = document.createTextNode(alleDrinks[d].strInstructionsDE);
              
             
                
                node.appendChild(text);
                liste.appendChild(node);
                
            }
            

        $(".cocktaillink").on('click', function() {
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
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+auswahl;
        request.open('GET', url);
        request.send();

        request.onreadystatechange = function() {
            if( request.readyState===4) {
                var Drink = JSON.parse(request.response).drinks;
                


              
             
            $("#ingredients").empty();
            $("#Bild").empty();
            $("#textzubereitung").empty();
             
                var alleingredients = Drink[0].strMeasure1 + Drink[0].strIngredient1 +",  "+ Drink[0].strMeasure2 + Drink[0].strIngredient2 +",  "+ 
                Drink[0].strMeasure3 + Drink[0].strIngredient3 +",  "+ Drink[0].strMeasure4 + Drink[0].strIngredient4 +",  "+ 
                Drink[0].strMeasure5 + Drink[0].strIngredient5 +",  "+ Drink[0].strMeasure6 + Drink[0].strIngredient6 +",  "+ 
                Drink[0].strMeasure7 + Drink[0].strIngredient7 +",  "+ Drink[0].strMeasure8 + Drink[0].strIngredient8 +",  "+ 
                Drink[0].strMeasure9 + Drink[0].strIngredient9 +",  "+ Drink[0].strMeasure10 + Drink[0].strIngredient10 +",  "+ 
                Drink[0].strMeasure11 + Drink[0].strIngredient11 +",  "+ Drink[0].strMeasure12 + Drink[0].strIngredient12 +",  "+ 
                Drink[0].strMeasure13 + Drink[0].strIngredient13 +",  "+ Drink[0].strMeasure14 + Drink[0].strIngredient14 +",  "+ Drink[0].strMeasure15 + Drink[0].strIngredient15;
                var ZubereitungDE = document.createTextNode(Drink[0].strInstructionsDE);
                var textzubereitung = document.getElementById("textzubereitung");

                var node = document.getElementById("ingredients");

                var ingredients = document.createTextNode(alleingredients);
                var BildURL = Drink[0].strDrinkThumb;
                $("#Bild").append("<span id=imgspan> click me <img id=img src=" + BildURL +"></img></span>");

                node.appendChild(ingredients);
                textzubereitung.appendChild(ZubereitungDE);
                



            }
        }
}
    
    

    $("#alkoholische").on('click', function() {
        var request = new XMLHttpRequest();
        var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
        request.open('GET', url);
        request.send();

        request.onreadystatechange = function() {
            if( request.readyState===4) {
                var alleDrinks = JSON.parse(request.response).drinks;
                var liste = document.getElementById('listeallerdrinks');

                $("#listeallerdrinks").empty();

                for(d=0; d<alleDrinks.length;++d) {
                    var node = document.createElement('a');
                    node.type="button";
                    node.classList="cocktaillink";
                    var text = document.createTextNode(alleDrinks[d].strDrink);

                    node.appendChild(text);
                    liste.appendChild(node);
                }

            $(".cocktaillink").on('click', function() {
                var text = $(this).text();
                var auswahl = $("#auswahl");
                auswahl.text(text);
                ingredients();
            });

            }
        }

    });



    $("#nichtalkoholische").on('click', function() {
        var request = new XMLHttpRequest();
        var url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
        request.open('GET', url);
        request.send();

        request.onreadystatechange = function() {
            if( request.readyState===4) {
                var alleDrinks = JSON.parse(request.response).drinks;
                var liste = document.getElementById('listeallerdrinks');

                $("#listeallerdrinks").empty();

                for(d=0; d<alleDrinks.length;++d) {
                    var node = document.createElement('a');
                    node.type="button";
                    node.classList="cocktaillink";
                    node.id="cocktaillink";
                    var text = document.createTextNode(alleDrinks[d].strDrink);

                    node.appendChild(text);
                    liste.appendChild(node);
                }

            $(".cocktaillink").on('click', function() {
                var text = $(this).text();
                var auswahl = $("#auswahl");
                auswahl.text(text);
                ingredients();
            });

            }
        }

    });




    $(document).ready( function() {
        $("#Bild").on('click', function() {
            var img = document.getElementById("img");
            var url = img.getAttribute('src');
            window.open(url, '', "width=650,height=650");
            
            
            
        });
        });