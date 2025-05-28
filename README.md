# Athlete Monitoring Module

A React Native application for monitoring and managing athlete performance, injuries, and game statistics.

## Features

- **Athlete Management**

  - Add and manage athlete profiles
  - Track athlete positions and attributes
  - Monitor injury history
  - Record game performance

- **Game Records**

  - Track game statistics
  - Generate game reports
  - Historical game data analysis

- **Injury Tracking**
  - Categorized injury records
  - Injury history timeline
  - Recovery monitoring

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd athlete-monitoring-module
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your preferred platform:

```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## Project Structure

```
athlete-monitoring-module/
├── views/
│   ├── components/         # Reusable UI components
│   │   ├── AddButton.js   # Responsive add button component
│   │   ├── Header.js      # App header component
│   │   ├── TabBar.js      # Navigation tab bar
│   │   └── BottomNavBar.js# Bottom navigation bar
│   └── screens/           # Application screens
│       ├── MainScreen.js
│       ├── AthletesScreen.js
│       ├── GameRecordsScreen.js
│       └── InjuryRecordsScreen.js
├── context/               # React Context providers
├── App.js                # Main application component
└── package.json          # Project dependencies
```

## Dependencies

- React Native: 0.79.2
- Expo: ~53.0.9
- React Native Safe Area Context: ^5.4.0
- React Native Gesture Handler: ~2.24.0
- @react-native-picker/picker: ^2.11.0
- @react-native-async-storage/async-storage: ^2.1.2

## Components

### AddButton

A responsive floating action button that adapts to different screen sizes:

- Scales based on screen width
- Maintains square proportions
- Responsive positioning
- Configurable through props

Usage:

```jsx
import AddButton from "../components/AddButton";

<AddButton onPress={() => handleAddAction()} />;
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [repository-url]
