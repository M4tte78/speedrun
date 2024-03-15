import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = async (searchTerm) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
    if (data.meals) {
      const mealsWithDetails = await Promise.all(data.meals.map(async (meal) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const data = await response.json();
        return { ...meal, details: data.meals[0] };
      }));
      setMeals(mealsWithDetails);

      // Send meals to server
      const response = await fetch('http://localhost:3000/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealsWithDetails),
      });
      const data = await response.json();
      console.log(data);
    }
  };

  const handleLetterClick = async (letter) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if (!response.ok || response.status === 204) {
      setErrorMessage(`No meals found starting with the letter ${letter}`);
      return;
    }
    const data = await response.json();
    if (!data.meals) {
      setErrorMessage(`No meals found starting with the letter ${letter}`);
      return;
    }
    setMeals(data.meals);
    setErrorMessage(null); 
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      {errorMessage && <p>{errorMessage}</p>}
      <main>
        {meals && meals.map((meal, index) => (
          <div key={index}>
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </main>
      <Footer onLetterClick={handleLetterClick} />
    </>
  );
}

export default App;