<div align="center">
    <h1>Cronos mobile-app</h1>
    <img src="/assets/images/logo.png" alt="logo" width="280px" />
</div>

## Description

Cronos is an innovative social media platform designed with a unique approach to content sharing and user interaction. Emphasizing both the ephemeral nature of digital content and the importance of user privacy, Cronos offers a distinctive experience for its users.

## Requirements

- [Node](https://nodejs.org/en) : `v20.11.0`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) : `v1.22.21`

## Installation

### Recover the project

Get the project from github using :

- https:

```sh
git clone https://github.com/Cronos-B3/app.git
```

or

- ssh:

```sh
git clone git@github.com:Cronos-B3/app.git
```

Then, enter in the project folder.

### Install dependencies

```sh
yarn
```

### Tunneling

In case your computer and your phone are on 2 distincts connections or if you are using WSL2, do:

```sh
yarn global add @expo/ngrok@4.1.0
```

## Configuration

### Android & IOS

To use the app on a mobile, you'll need a phone (virtual or not).

On:

- XCode (virtual device for IOS, only on Mac)
- Android Studio (virtual device for Android)
- Android (real device)
- Iphone (real device)

Install [Expo](https://expo.dev/)

### Web

When starting the project, you will be able to access it at [localhost:8081](http://localhost:8081) (by default).

## Use

### Expo development

Run the project:

```sh
yarn start
```

or:

In case your computer and your phone are on 2 distincts connections or if you are using WSL2, do:

```sh
yarn tunnel
```

In your console, follow the steps but, to make it simple:

- Press a to open Android Studio with the project
- Press i for XCode
- Press w for web

For a real device, scan the QRCode using:

- Expo for Android
- Camera for IOS

You can now use the project.

## Tests

<!-- TODO -->

## Deployement

<!-- TODO -->

## License

Cronos is open source software [or "is licensed"] under the [MIT License](LICENSE). This means that anyone is free to use, copy, modify, and distribute the software for any purpose, subject to the terms outlined in the license.
