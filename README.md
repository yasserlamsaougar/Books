# Books

## Setup 

1. install git (jspm needs it here is a quick link https://git-scm.com/) 

2. install nodejs  (here is a quick link https://nodejs.org/en/) 

3. npm install -g jspm (install jspm globally and can be run anywhere)

4. cd path/to/project (go the project directory)

5. npm install (install all the npm dependencies)

6. jspm install -y (install jspm dependencies and apply default answer when prompted)

## Run

In the package.json, in the scripts property you will find many scripts here is some of them: 

* npm run dev (run the application locally on port 3000)

* npm run build (build your project)

* npm run prod (build your project for production and outputs the result in /dist directory)

* npm run test (runs your unit tests in the /test/unit which name matches *.spec.js pattern)

* npm run e2e (runs your e2e tests in the /test/e2e/src)





