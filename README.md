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

Then, enter in the project folder

### Install dependencies

```sh
yarn
yarn global add @expo/ngrok@4.1.0
```

## Configuration

### Expo

<!-- App will be available on web (only in development). -->
<!-- If you want to use it with your phone, we gonna need to use expo. -->

Install [Expo](https://expo.dev/) on your phone

<!-- TODO -->

## Use

Run it in developer mode under development :

```sh
yarn start
```

Scan the QRCode with your phone to access the project.

If you can't connect to your app (using WSL2) or you aren't on the same network,

consider using:

```sh
yarn tunnel
```

<!-- - On web, click on the link, or go to [localhost:8081](http://localhost:8081) (by default) to access the project -->

## Tests

<!-- TODO -->

## Deployement

<!-- TODO -->

## License

Cronos is open source software [or "is licensed"] under the [MIT License](LICENSE). This means that anyone is free to use, copy, modify, and distribute the software for any purpose, subject to the terms outlined in the license.
