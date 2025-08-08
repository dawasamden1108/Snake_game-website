# Snake_game-website

A classic Snake game built with HTML, CSS, and JavaScript. This project demonstrates the basics of web APIs and the use of localStorage for persistent data, such as a leaderboard and customizable snake skins.

## 📚 Purpose

This project was created to help me learn and demonstrate the fundamentals of working with APIs and to understand practical use cases of local storage in web development.

## 🎮 Features

- **Classic Snake Gameplay**: Control the snake with arrow keys, eat food to grow, and avoid collisions.
- **Leaderboard**: Top 5 high scores are saved and displayed using localStorage.
- **Custom Skins**: Choose your favorite snake color and save it for future games.
- **Sound Effects**: Enjoy menu, eat, and game over sounds (assets from [pixabay.com/music](https://pixabay.com/music/)).
- **Responsive UI**: Clean, modern interface with instructions and credits.

## 🕹️ How to Play

- Use **Arrow keys** to move the snake (Up, Down, Left, Right).
- Eat the food to grow and increase your score.
- Avoid hitting the walls or your own tail.
- The game ends if you collide with yourself or the wall.
- Try to get the highest score!

## 📁 Project Structure

```
snake-game/
│
├── assets/
│   ├── eat.mp3
│   ├── gameover.mp3
│   └── menu.mp3
│
├── src/
│   ├── api.js           # Leaderboard API using localStorage
│   ├── leaderboard.js   # Leaderboard rendering logic
│   └── script.js        # Main game logic
│
├── index.html           # Main menu
├── gamepage.html        # Game screen
├── leaderboard.html     # Leaderboard page
├── skins.html           # Custom skins page
├── credit.html          # Credits and project purpose
└── style.css            # All styles
```
