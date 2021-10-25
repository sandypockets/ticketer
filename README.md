# Ticketer
A Chrome extension to improve productivity and experience while working through a ticketed or to do type system. 

## Features
* Timer - Start, stop, pause, or reset a timer to keep track of how much time is invested in each ticket or task.
* Counter - Count the number of tickets or tasks to help visualize your progress.
* Fast tabs - Open three URLs at once with the click of a Fast tab button.

## Screenshots
![https://github.com/sandypockets/ticketer/blob/main/docs/ticketer-1.png?raw=true](https://github.com/sandypockets/ticketer/blob/main/docs/ticketer-1.png?raw=true)

![https://github.com/sandypockets/ticketer/blob/main/docs/ticketer-3.png?raw=true](https://github.com/sandypockets/ticketer/blob/main/docs/ticketer-3.png?raw=true)

## Getting started
This project was developed and tested with `Node 14.17.0` and `yarn 1.22.15`.

1. Clone the repository.
2. Install dependencies by running:
```shell
yarn install
```
3. Build the extension by running:
```shell
yarn build
```
4. In your browser, go to `chrome://extensions/` and enable developer mode.
> Click the Chrome menu icon and select Extensions from the Tools menu. Ensure that the "Developer mode" checkbox in the top right-hand corner is checked.
5. Click **Load unpacked**.
6. Upload the `build/` directory within the project.

### Making changes
For the most part, the extension functions like a normal React app. Make changes in the `src/App.js` file. After making a change, you need to:

1. Rebuild the app:
```shell
yarn build
```
2. Refresh the extension upload. In your browser, go to `chrome://extensions/`. Click the refresh icon on your extension's card.

## Dependencies
* @testing-library/jest-dom `^5.11.4`
* @testing-library/react `^11.1.0`
* @testing-library/user-event `^12.1.10`
* react `^17.0.2`
* react-dom `^17.0.2`
* react-scripts `"4.0.3`
* web-vitals `^1.0.`