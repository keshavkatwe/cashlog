# Cashlog

**A React Native app for keeping track of everyday spending.**

Record transactions, organize wallets, and explore spending by category in a mobile interface built with TypeScript. This repository contains the Android and iOS client; the API is maintained in [cashlog-backend](https://github.com/keshavkatwe/cashlog-backend).

## What’s inside

- **Transactions:** add and edit expenses with an amount, category, wallet, currency, date, merchant, and note.
- **Wallets:** create and manage wallets, with a wallet overview on the home screen.
- **Spending insights:** review category breakdowns and filter transaction history by date and category.
- **Account flows:** email/password and Google sign-in, OTP verification, password reset, and profile settings.
- **Personal settings:** choose a currency, configure transaction reminders, and enable the biometric app lock on supported devices.

## Built with

| Area | Technology |
| --- | --- |
| App | React Native 0.73.2, React 18, TypeScript |
| Navigation and state | React Navigation, Redux Toolkit, React Redux |
| UI and charts | Styled Components, React Native SVG and SVG Charts, Lottie |
| Forms and API | React Hook Form, Yup, Axios |
| Native integrations | Firebase, Google Sign-In, Notifee, device biometrics |

## Run locally

### 1. Install the toolchain

Use Node.js compatible with the `>=18` engine declared in `package.json` and Yarn Classic (the repository uses a v1 `yarn.lock`). Set up the Android or iOS native development tools for React Native 0.73. iOS development also requires macOS, Xcode, Ruby, Bundler, and the CocoaPods version specified in the Gemfile.

```sh
git clone https://github.com/keshavkatwe/cashlog.git
cd cashlog
yarn install --frozen-lockfile
```

### 2. Configure your development services

Point `baseURL` in [`src/services/axiosInstance/axiosInstance.ts`](src/services/axiosInstance/axiosInstance.ts) at your development API. The checked-in default is `https://api.cashlog.in/`; the mobile repository does not start a backend server.

For your own app build, configure Firebase and Google Sign-In for your Android package and iOS bundle identifier. Review the native Firebase configuration and `GoogleSignin.configure` in [`src/App.tsx`](src/App.tsx). Email authentication and account data also depend on the API configuration. Keep server credentials and private signing material outside the repository.

For iOS, install the Ruby and native dependencies from the repository root:

```sh
bundle install
cd ios
bundle exec pod install
cd ..
```

### 3. Start the app

Run Metro in one terminal:

```sh
yarn start
```

In another terminal, launch a configured emulator, simulator, or connected development device:

```sh
# Android
yarn android

# iOS
yarn ios
```

## Repository map

```text
src/
  pages/       App screens and navigation flows
  widgets/     Transaction forms, wallet cards, filters, and settings
  components/  Shared UI elements
  services/    API client, authentication, and domain requests
  store/       Redux state and typed hooks
  helpers/     Storage, formatting, and native helpers
android/       Android native project
ios/           iOS native project
__tests__/     Jest tests
```

## Development commands

| Command | Purpose |
| --- | --- |
| `yarn start` | Start Metro. |
| `yarn android` / `yarn ios` | Run a native development build. |
| `yarn lint` | Run ESLint and TypeScript checks. |
| `yarn test` | Run the existing Jest suite. |
| `yarn build:release` | Build an Android release using the configured native toolchain. |

The distribution scripts in `package.json` bump versions and push commits and tags. Run them only when intentionally preparing a release.

## Explore more

Built by [Keshav Katwe](https://github.com/keshavkatwe). See the [portfolio](https://keshavkatwe.github.io/) and [Agenvik](https://github.com/keshavkatwe/agenvik), an open-source AI agent platform.
