# Welcome / JS-Under-Pressure

## Description

Welcome !
Js-under-pressure is a website to test your js skills, built with `Reactjs` and `NodeJs`.

## Getting started

### Prerequisites

#### IDE

You can choose the IDE you whant, but you need to have some packages installed with it like `ESLint` for the live linter, and some `React` packages to get autocompletion, ...
Here an exemple of the needed packages with Visual Studio Code IDE:

- `Reactjs code snippets`
- `ESLint`
- `mobx-snippet`

#### Node / Npm / Yarn

Since it's a JS-Based project, due to ReactJs & express you need to install some stuff on your computer:

- macOS:
  Install [Homebrew](https://brew.sh) as package manager and install the following dependencies:

```bash
brew install node
brew install npm
```

---

- Windows:
  Note that you can't run iOS app on windows.
  Install [Chocolatey](https://chocolatey.org) as package manager and install the following dependencies:

```bash
choco install -y nodejs.install python2 jdk8 npm
```

---

- Linux:
  Follow the [install instructions for your linux distribution](https://nodejs.org/en/download/package-manager/) to install Node 8 or newer and npm.

---

- Yarn:
  Follow the [install instructions for yarn](https://yarnpkg.com/en/docs/install#windows-stable) to
    to install yarn

---

### Install the project

First you need to clone the repository:
Do not forget to upload your SSH Key into github and having the right access.

```bash
git@github.com:werayn/js-under-pressure.git
```

```bash
cd client && yarn setup && cd ../server && yarn
```

### Run it

When everything is installed, if you want to run it, do the following:

server :
```bash
yarn start
```

client :
```bash
yarn start:dev
```

The linter will start everytime you enter this command.

### Test it

when everything is installed and run well, if you want to run every unit tests, do the following:

```bash
TODO
```

## Documentation

if you want to know everything about our website just run:

```bash
TODO
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use nothing for versioning right now.

## Authors

* **Junique Virgile** - *Initial contributor* - [Junique Virgile](https://github.com/werayn)

## License

This project is no licensed.
