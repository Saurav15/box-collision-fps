# Box Collision FPS
This is the video of how the game looks: 
https://github.com/user-attachments/assets/2960af0f-b0df-4619-99e1-a2158e50b31b



This is the screenshot of the game
![Screenshot 2024-10-16 at 7 21 15 PM](https://github.com/user-attachments/assets/eeb4502b-925d-4a90-9156-c23a99545762)

## Overview

Box Collision FPS is a simple first-person shooter game built using Three.js, a powerful 3D library for creating graphics in the browser. The game allows players to navigate a 3D environment, interact with objects, and experience collision detection mechanics.

## Features

- **First-Person Perspective**: Experience the game from a first-person viewpoint.
- **3D Environment**: Explore a fully rendered 3D environment with grass, structures, and interactive elements.
- **Collision Detection**: Implemented collision detection for realistic interactions with objects.
- **Simple Controls**: User-friendly controls for movement and interaction.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- NPM (Node Package Manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saurav15/box-collision-fps.git
   cd box-collision-fps
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Access the game**: Open your web browser and go to `http://localhost:5173` to start playing.

## Controls

- **W**: Move forward
- **S**: Move backward
- **A**: Move left
- **D**: Move right
- **Mouse**: Look around

## Usage

Once the game is running, use the controls to navigate through the environment. You can interact with various objects within the scene. The collision detection system will prevent the player from moving through solid objects.

## Project Structure

```
box-collision-fps/
├── src/
│   ├── components/     # Contains reusable components
│   ├── scenes/         # Contains different game scenes
│   ├── assets/         # 3D models, textures, and other assets
│   ├── index.js        # Main entry point for the application
│   └── styles.css      # Styles for the game
├── public/
│   ├── index.html      # HTML template
│   └── favicon.ico     # Favicon for the application
├── package.json        # NPM dependencies and scripts
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, please open an issue or submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Three.js for providing the 3D graphics library.
- Inspiration from various online tutorials and documentation for game development.
