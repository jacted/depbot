# Introduction

Depbot is a deployment tool to help deploying files from GIT to your server.

## Installation

1. Git clone project
2. Edit `config.example.js` and change name to `config.js`
3. Run `npm run compile`
4. Run server `npm start`

## Commands

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:PORT`.|
|`compile`|Compiles the application to /client/public.|
|`dev`|Webpack watches front-end files and nodemon will run server.|

## Questions and issues

Use the Github issue tracker for any questions, issues or feature suggestions.

## Roadmap
 
- [X] Git push webhook deployment
- [ ] Front-end
- [ ] Authentication
- [ ] Add/Delete/Edit projects
- [ ] Verify FTP credentials on project creation
- [ ] Deployment via SSH
- [ ] Slack integration
- [ ] Refactoring

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