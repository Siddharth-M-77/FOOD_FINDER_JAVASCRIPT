const apiKey = "0202db1ebfa1411daa79b3a0b4fa67ed";
const searchBtn = document.getElementById("search-btn");
const ingredientsInput = document.getElementById("ingredients");
const recipeResults = document.getElementById("recipe-results");
const container = document.querySelector(".container");

// Fetch recipes based on ingredients
async function fetchRecipes(ingredients) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`
    );
    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeResults.innerHTML = `<p class="error">Failed to fetch recipes. Try again later.</p>`;
  }
}

// Display recipes in the UI
function displayRecipes(recipes) {
  recipeResults.innerHTML = "";
  if (recipes.length === 0) {
    container.innerHTML += `<p class="not-found">No recipes found. Try different ingredients.</p>`;
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="details">
        <h3>${recipe.title}</h3>
        <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
        <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
      </div>
      <button onclick="alert('${recipe.title} added')">Save to Favorites</button>
    `;
    recipeResults.appendChild(recipeCard);
  });
}

// Search button click event
searchBtn.addEventListener("click", () => {
  const ingredients = ingredientsInput.value.trim();
  if (ingredients) {
    fetchRecipes(ingredients);
  } else {
    alert("Please enter ingredients.");
  }
});
