<img width="405" alt="chameleon-runner-logo" src="https://github.com/user-attachments/assets/da5803be-9558-4e30-abc5-01c02cc8165b" />

# Chameleon Runner

**Chameleon Runner** is a fun and challenging retro-style web game built for the **AWS Game Builder Challenge Hackathon** by Amazon on Devpost. The game features a chameleon that must change colors to camouflage and avoid obstacles while collecting points.

## How to Play

- **Objective**: Help the chameleon blend in by changing colors to match the squares, earning points in the process, while avoiding the pink diamond obstacles. Master the camouflage and save the chameleon!
- **Controls**:
  - Use the **left/right arrow keys** or the **A/D keys** to move the chameleon left and right between the 3 lanes.
  - On mobile devices, use the on-screen arrow buttons to control movement.
  - After 8 rows of falling squares, a row of **circles** will appear. Touch a circle to change your chameleon’s color.
  - Match the color of your chameleon to the falling squares.
  - If you touch a square that doesn’t match your color or collide with an obstacle, the game is over.
  - You can restart by pressing **Spacebar**, **R**, or by clicking the "Restart Game" button.

- **Scoring**:
  - Earn **5 points** for every matching square touched and **200 points** for every circle touched.
  - Your **best score** of the session will be tracked between games.

## Accessing the Game

1. **Live Version**:  
   You can play the game online by visiting:  
   [Chameleon Runner (Hosted on AWS Amplify)](https://main.dk1dq5dx1o6nx.amplifyapp.com)

2. **Run Locally**:
   To run the game on your local machine:
   - Clone this repository.
   - Open your terminal and navigate to the project directory.
   - Run the following command to start a local server:  
     `python3 -m http.server 8000`
   - Open your browser and go to:  
     `http://localhost:8000/`

## Technologies Used

- **Languages**: HTML, JavaScript, CSS
- **Cloud Services**: AWS Amplify (for hosting)
- **Developer Tools**: Amazon Q Developer (for real-time feedback and suggestions)
- **Game Development Tools**: None (built from scratch using standard web technologies)
- **Version Control**: Git, GitHub (for collaboration and source code management)

## Challenges and Solutions

- **Dynamic Color Tracking**: We faced challenges with tracking the chameleon’s color changes dynamically and ensuring smooth game mechanics. We addressed these issues by iterating on the game’s logic and using *touched* attributes to ensure points were only added once per square.
  
- **Collision Detection**: When points were introduced, collisions were detected multiple times, so we added a *touched* attribute to track the first collision and prevent multiple point additions.
  
- **Visuals**: Initially using a triangle, we gradually replaced it with a pixelated chameleon to give the game its signature style. Obstacles and gameplay features like the pink diamonds and falling squares were then added to make the game more engaging.

## What We Learned

- **AWS Amplify** made it incredibly easy to deploy and host our web app, allowing us to focus on building the game itself.
- **Amazon Q Developer** provided real-time feedback and suggestions, significantly speeding up our development and ensuring cleaner, more efficient code.
- **Game Development**: This project helped us improve our problem-solving and coding skills while creating a fully interactive game. We also gained experience in designing user-friendly mechanics and optimizing gameplay.

## What's Next for Chameleon Runner

We plan to:
- Add more levels and features to make the game even more engaging.
- Improve game mechanics with additional obstacles and power-ups.
- Optimize performance and compatibility for mobile devices.

## Conclusion

This game was built during the **AWS Game Builder Challenge Hackathon** hosted by Amazon on Devpost. We had a lot of fun creating it, and we hope you enjoy playing **Chameleon Runner**! Feel free to fork the repo, contribute, or leave suggestions for improvements!

## Credits

- Built by Kylee Kazenski and Helena Kazenski (January 2025)
