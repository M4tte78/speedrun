import React, { useState } from 'react';

const Footer = () => {
  const [meals, setMeals] = useState([]);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterClick = async (letter) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    if (data.meals) {
      setMeals(data.meals);
    } else {
      setMeals([]);
    }
  };

  return (
    <footer className="alphabet">
      {alphabet.map((letter) => (
        <button key={letter} onClick={() => handleLetterClick(letter)}>
          {letter}
        </button>
      ))}
      <main>
        {meals.map((meal, index) => (
          <div key={index}>
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </main>
    </footer>
  );
};

export default Footer;