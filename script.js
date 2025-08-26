function searchMeal(defaultQuery) {
      const query = defaultQuery || document.getElementById("searchInput").value.trim();
      if (!query) {
        alert("Please enter a meal name!");
        return;
      }

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error("Error:", error));
    }

    function displayMeals(meals) {
      const mealsDiv = document.getElementById("meals");
      mealsDiv.innerHTML = "";        

      if (!meals) {
        mealsDiv.innerHTML = "<p>No meals found!</p>";              
        return;
      }

      meals.forEach(meal => {
        const mealDiv = document.createElement("div");    
        mealDiv.classList.add("meal");

        mealDiv.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <p><b>Category:</b> ${meal.strCategory}</p>
          <p><b>Area:</b> ${meal.strArea}</p>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
          <p><b>Instructions:</b> ${meal.strInstructions.slice(0,150)}...</p>
        `;

        mealsDiv.appendChild(mealDiv);
      });
    }

    // === Auto-load default meal when page loads ===
    window.onload = function() {  
      searchMeal("Arrabiata");
    }