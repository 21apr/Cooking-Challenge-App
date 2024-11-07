
async function getUser() {
    try {
        const response = await fetch('/users/getUser');
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.user) {
            helloUser(jsonResponse.user.name, document.getElementById('userName'));
        } else {
            window.location.href = './../login/login.html';
        }
       
    }
    catch (error) {
        console.error(error);
    }
}

getUser();

function helloUser(userName:string, element:HTMLElement|null){
    try {
        if(!element){
            throw new Error('Element not found');
        }
        element.innerHTML = `Hello <a href="./../user/profile.html">${userName}</a>`;
    } catch (error) {
        console.error(error);   
    }
}

async function getRecipes(){
    try {
        const response = await fetch('/recipes/get-recipes');
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      
        if(jsonResponse.recipes){
            renderRecipes(jsonResponse.recipes);
        }
      
    } catch (error) {
        console.error(error);
    }
}

getRecipes();

//model Pets
interface Recipe{
    id:string;
    title:string;
    time:number;
    difficulty:string;
    imageURL:string;
}

//render
function renderRecipes(recipes: Recipe[]){
    try {
        const recipesContainer = document.getElementById('recipes');
        if(!recipesContainer){
            throw new Error('HTML Element for recipes not found');
        }
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('pet');
            recipeElement.innerHTML = `
            ${recipe.imageURL ? `<img src="${recipe.imageURL}" alt="${recipe.title}">` : ''}
            <h3>${recipe.title}</h3>
            <p>Time cooked: ${recipe.time}</p>
            <p>Difficulty: ${recipe.difficulty}</p>
            <button id=${recipe.id}>Challenge</button>
            `;
            recipesContainer.appendChild(recipeElement);
        });
    } catch (error) {
        console.error(error);
    }
}