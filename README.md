# Introduction

Depbot is a deployment tool to help deploying files from GIT to your server.

## Installation

1. Git clone project
2. Add `push webhook` to the repo you want to deploy (Remember to add a secret) - `http://depbotserver.com/git/webhook`
3. Edit `config.example.js` and change name to `config.js`
4. Run `npm run compile`
5. Run server `npm start`

**Webhook content-type has to be application/json**

## Commands

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:PORT`.|
|`compile`|Compiles the application to /client/public.|
|`dev`|Webpack watches front-end files and nodemon will run server.|

## Questions and issues

Use the Github issue tracker for any questions, issues or feature suggestions.

## Roadmap
 
Look Github issue tracker [features](https://github.com/jacted/depbot/issues?q=is%3Aissue+is%3Aopen+label%3Afeature)

## Warning

This project is under development. Things might break or change.

## Contributing

1. Create an issue and describe your idea
2. [Fork it](https://github.com/jacted/depbot/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
7. Profit! :white_check_mark:

## License
>You can check out the full license [here](https://github.com/jacted/depbot/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.

## Screenshots

![Projects view](https://raw.githubusercontent.com/jacted/depbot/master/screenshots/projects.png "Projects view")
![Projects create step 1](https://raw.githubusercontent.com/jacted/depbot/master/screenshots/create-project-step1.png "Projects create step 1")
![Projects create step 2](https://raw.githubusercontent.com/jacted/depbot/master/screenshots/create-project-step2.png "Projects create step 2")
![Project view](https://raw.githubusercontent.com/jacted/depbot/master/screenshots/view-project.png "Project view")