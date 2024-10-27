const button = document.getElementById("b1");
button.addEventListener("click", function () {
    async function randomJokes() {
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random`);
            if (!response.ok) {
                throw new Error(`Network response was not ok : ${response.status}`);
            }
            const data = await response.json();
            console.log("Data received; ", data)
            const p = document.getElementById("paragraphe");
            p.innerHTML = data["value"];
        } catch (error) {
            console.error("There was a problem with your fetch operation: ", error);
        }
    }
    randomJokes();
});

fetch('https://api.chucknorris.io/jokes/categories')
.then(response => response.json())
.then(categories => {
    const select = document.getElementById("select");
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
    async function categoriesJokes() {
        try {
            const select = document.getElementById("select");
            const valeurSelect = select.value;
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${valeurSelect}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok : ${response.status}`);
            }
            const data = await response.json();
            console.log("Data received; ", data)
            const p = document.getElementById("paragraphe");
            p.innerHTML = data["value"];
        } catch (error) {
            console.error("There was a problem with your fetch operation: ", error);
        }
    }
    categoriesJokes();
});