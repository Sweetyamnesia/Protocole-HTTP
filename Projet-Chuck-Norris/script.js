//sur le bouton blague au hasard => renvoyer une requete http sur le site chuck norris
//Utiliser l'URL qui génère aléatoirement une blague
//Se connecter à l'API en utilisant fetch
//Récupérer l'information
//Afficher l'information à l'intérieur d'une balise html

const button = document.getElementById("b1");
button.addEventListener("click", function () {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Convertit la réponse en JSON
    })
    .then(data => {
        console.log('Data received:', data); // Affiche les données
        
        const p = document.getElementById("paragraphe");
        console.log((data["value"]));
        p.innerHTML = data["value"];
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error); 
    }); 
});


//Quand on envoie le formulaire, génération d'une blague aléatoire sur la base d'une catégorie
//Utiliser un queryparameter dans l'URL
fetch('https://api.chucknorris.io/jokes/categories')
.then(response => response.json())
.then(categories => {
    const select = document.getElementById("select");
    // Ajouter chaque catégorie comme une option dans le select
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        select.appendChild(option);
    });
})
.catch(error => {
    console.error('Error fetching categories:', error);
    document.getElementById("paragraphe").textContent = "Une erreur s'est produite lors de la récupération des catégories.";
});

const button2 = document.getElementById("b2");
button2.addEventListener("click", function () {
    const select = document.getElementById("select");
    const valeurSelect = select.value;
    const url = `https://api.chucknorris.io/jokes/random?category=${valeurSelect}`;
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return response.json(); // Convertit la réponse en JSON
    })
    .then(data => {
        document.getElementById("paragraphe").textContent = data.value;
        console.log('Data received:', data);
        console.log(data.value)        
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error); 
    }); 
});

/*/
      fetch('https://api.chucknorris.io/jokes/categories')
      .then(response => {
        if(!response.ok) {
            throw new Error ("Network response was not ok");
        }
        return response.json();
      })
      .then(categories => {
        console.log(categories);
        const select = document.getElementById("select");
        if (!select) {
            throw new Error ("Element with ID 'select' not found");
        }
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            select.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Error fetching categories ; ", error);
        document.getElementById("paragraphe").textContent = "Une erreur s'est produite lors de la récupération des catégories";
      });

      const valeurSelect = select.value;
      const url = `https://api.chucknorris.io/jokes/random?category=${valeurSelect}`;
      fetch(url)
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Convertit la réponse en JSON
    })
    .then(data => {
        console.log('Data received:', data); // Affiche les données
        
        const p = document.getElementById("paragraphe");
        p.innerHTML = data["value"];
        console.log(p.innerHTML)
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error); 
    }); 
})



      const select = document.getElementById("select");
      select.innerHTML = '';
      const options = document.createElement('option');
      const optionsElement = url.value;/*/ 
    
    /*/fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error ('Network response was not ok' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("paragraphe").textContent = data.value;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        document.getElementById("paragraphe").textContent = ("Une erreur s'est produite lors de la récupération de la phrase");
    })

const options = [
        { value: 'animal', text: 'animal' },
        { value: 'career', text: 'career' },
        { value: 'celebrity', text: 'celebrity' },
        { value: 'dev', text: 'dev' },
        { value: 'explicit', text: 'explicit' },
        { value: 'fashion', text: 'fashion' },
        { value: 'food', text: 'food' },
        { value: 'history', text: 'history' },
        { value: 'money', text: 'money' },
        { value: 'movie', text: 'movie' },
        { value: 'music', text: 'music' },
        { value: 'political', text: 'political' },
        { value: 'religion', text: 'religion' },
        { value: 'science', text: 'science' },
        { value: 'sport', text: 'sport' },
        { value: 'travel', text: 'travel' },
    ];
    
    const url = 'https://api.chucknorris.io/jokes/random';
async function getCategories() {
    try {
        const response = await fetch (`${url}/categories`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! status : ${response.status}`);
        }
        const categories = await response.json();
        console.log("Catégories : ", categories);
        populateCategoryDropdown(categories);
    } catch(error) {
        ("Erreur lors de la récupération des catégories: ", error)
    }
}

async function getJokeByCategory(category) {
    try {
        const response = await fetch (`${category}`);
        if (!response.ok) {
            throw new Error (`Erreur HTTP! status: ${response.status}`);
        }
        const joke = await response.json();
        console.log("Blague : ", joke);
        displayJoke(joke);
    } catch (error) {
        console.error("Erreur lors de la récupération de la blague: ", error)
    }
}

function populateCategoryDropdown (categories) {
    const dropdown = document.getElementById("select");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        dropdown.appendChild(option)
    });
}

function displayJoke(joke) {
    const jokeContainer = document.getElementById("box");
    jokeContainer.textContent = joke.value;
}

button2.addEventListener("click", async() => {
    const selectedCategory = populateCategoryDropdown.value;
    await getJokeByCategory(selectedCategory)
});

getCategories();




/*/
     

