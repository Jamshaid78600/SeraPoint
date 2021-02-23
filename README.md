# Serapoint

# Development Environment

This project is configured initally using
###text Editor: VScode v1.30.1
###node: v8.12.0 LTS

# Configure project for Development

### clone the repository,

- `git clone git@github.com:Jamshaid78600/SeraPoint.git` (for ssh cloning)

  or

- `git clone https://github.com/Jamshaid78600/SeraPoint.git` (for https cloning)

### change working directory

- cd serapoint

### checkout to refactoring branch

- `git checkout refactoring-jan2019`

### install dependencies

- `npm install`

### start development server

- `npm run watch`

all the webpack files will be compiled and watchify,
will start watching for any changes in JS files

We have started the development server.

### Now let us view the out put on browser..

initializing local server from current directory

- open a new terminal (DO NOT close the webpack running terminal)

- make sure you have a package `http-server` installed globally

- if not please install it by runnning following command
- `npm i http-server -g --save`

  now:

- run command `http-server`

it will display

`Starting up http-server, serving ./`
`Available on:`
`http://127.0.0.1:8080`
`http://192.168.1.105:8080` (local ip address may differ)
`Hit CTRL-C to stop the server`

now go to any of the above links and you will have the project running

# For Building the Application

run `npm run build`

and then run http-server as before

# Lint for better practices

It is common for developers to differ in practices when writing code.

Therefore a steadfast approach is implemented in eslint.js file.

After every successfull development and before commiting.

On every save (CTRL + S) on file/s, in VSCode it automatically formats the code.

Also `Ctrl`+ `Shift` + `I` formats the file. In VSCode.

# Build the Dev completed Project

run command `npm run build`

This will create a build and build directory

--recommended, not to use this command unless to deploy the project.

## Project's Major Developmet Tech Stack

- `context` API for redux actions and store
- `Webpack ejected` for `es6` and `eslint`
- `Jest` will be used for test case writing

# Project Directory's Description

// needs to be written

# Good To haves

implemting `husky`, to run before every commit.
