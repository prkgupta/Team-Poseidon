# Enque web-app [ ![Travis CI Status for CSE112-Team-Poseidon/web-app](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/)

Enviroment Setup
----------------------------
1. Setup Account with [mLab](https://mlab.com/)
2. Copy mongoDB access point into app.js:

        $ var mongoURI = process.env.MONGOLAB_URI || 'YOUR MONGODB CONNECTION ON mLAB';
        
2. Install [Node.js](http://nodejs.org/download/)  
    To check if you have node installed, just type node at your terminal. If you see a >, then you have it. If not, you probably don't have it
3. Navigate to the root directory
4. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

5. Use ``npm run start`` to run the server
6. Use ``gulp`` to run the application
7. Navigate your browser to [http://localhost:4000](http://localhost:4000/)

Testing
----------------------------
```bash
npm test
```
This will run mocha and unit tests

Push to testing environment
----------------------------
1. Simply push your experimental changes to the ``develop`` branch.
2. Changes may be view on the [staging site](http://fubar-staging.herokuapp.com/).

Logging in as Peter
----------------------------
In order to login as peter, use the following credentials

	username: peter@enque.com
	password: peter
	
The live app can be found [here](http://team-fubar.herokuapp.com/).
	
Click the restart button on the latest build to rebuild it.
