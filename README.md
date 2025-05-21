# React Native App (TypeScript)

This is a [React Native](https://reactnative.dev) project created with [`@react-native-community/cli`](https://github.com/react-native-community/cli), written in TypeScript.

The project start for the article “Make professional mobile apps with React Native and TypeScript — Introduction” di Thinh Tran:
- https://thinhtran3588.medium.com/make-professional-mobile-apps-with-react-native-and-typescript-introduction-777ba2423c35
I add storybook configuration and unit test during the development of the application.

## Getting Started

> Nota: Be shure to finished the official guide “Set Up Your Environment” prima di procedere:
> https://reactnative.dev/docs/set-up-your-environment

### Step 1: Avviare Metro

Metro è il bundler JavaScript per React Native. Avvialo dalla root del progetto:


```shell
yarn start
```

### Step 2: Build & Run the App

With Metro running, open a new terminal window and run one of the following:

#### Android

```shell
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (only on first setup or after changing native deps).

Install Ruby Bundler (if not already) and CocoaPods:

```shell
bundle install
```

Then (first setup and whenever native deps change):


```shell
bundle exec pod install
```

More info: https://guides.cocoapods.org/using/getting-started.html

Run the app:

```shell
yarn ios
```

If everything is configured correctly, you should see the app running on Android Emulator, iOS Simulator, or a connected device. You can also build and run from Android Studio or Xcode.

### Step 3: Modify the App

Open `App.tsx` and make changes. Thanks to [Fast Refresh](https://reactnative.dev/docs/fast-refresh), your changes will appear instantly.

For a full reload (e.g., to reset app state):

- Android: press R twice or choose “Reload” from the Dev Menu (Ctrl + M on Windows/Linux, Cmd ⌘ + M on macOS).
- iOS: press R in the iOS Simulator.

## Useful Scripts

- `npm start` / `yarn start` — Start Metro bundler.
- `npm run android` / `yarn android` — Build & run on Android.
- `npm run ios` / `yarn ios` — Build & run on iOS.

## Troubleshooting

If you run into issues setting up or running the project:
- https://reactnative.dev/docs/troubleshooting

## Learn More

- React Native website: https://reactnative.dev
- Environment Setup: https://reactnative.dev/docs/environment-setup
- Learn the Basics: https://reactnative.dev/docs/getting-started
- Blog: https://reactnative.dev/blog
- GitHub repository: https://github.com/facebook/react-native

## References & Inspiration

- Make professional mobile apps with React Native and TypeScript — Introduction (Thinh Tran)  
  https://thinhtran3588.medium.com/make-professional-mobile-apps-with-react-native-and-typescript-introduction-777ba2423c35
