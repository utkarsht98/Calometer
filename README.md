# Calometer

An angular based web application to track meals based on calories. 

## Development server

- Run `ng serve` for a dev server after moving to the project folder. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the     source files.
- Go to `Calometer/server/` and run main.py file to start the server locally.

## Tech Stack

- For frontend, `Angular` was selected as a web framework, since it has all inbuilt library support, structurally organised etc.
- `PrimeNg` was used as a material library for UI components.
- `MySql` was chosen as a database to store multiple data's such as user data, food category data and meals data for multiple user.
- MySql was chosen because the application required a relational database to establish relations between multiple schemas. Also, out of all SQL database, MySQL has       most support avalaible online.
- To create and manage API's `Python` language and `Flask` framework was used repsectively for the backend. Libraries such as `pymsql`, `CORS` were installed for         multiple support at backend. Flask was chosen as it is easy build and run a flask server given the time constraint for this assignment.
- Apart from this multiple tools such as VS code, github, postman were used in the development process of this project.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

