# Enque web-app [ ![Travis CI Status for CSE112-Team-Poseidon/web-app](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/)

Enviroment Setup
----------------------------
1. Setup Account with [mLab](https://mlab.com/)
2. Copy mongoDB access point into app.js:

        $ var mongoURI = process.env.MONGOLAB_URI || 'YOUR MONGODB CONNECTION ON mLAB';
        
2. Install [Node.js](http://nodejs.org/download/)  

    To check if you have node installed, just type node at your terminal. If you see a >, then you have it. If not, you probably don't have it
    
3. Clone Repository

	`` git clone https://github.com/prkgupta/Poseidon.git poseidon ``
	
4. Navigate to the root directory
5. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

6. Use ``npm run start`` to run the server
7. Use ``gulp`` to run the application
8. Navigate your browser to [http://localhost:4000](http://localhost:4000/)

Testing
----------------------------
```bash
npm test
```
This will run mocha and unit tests. Whenever you make a change to a file, mocha will restart your tests. So you don't have to keep restarting mocha all the time.

Push to testing environment
----------------------------
1. Push your experimental changes to the ``develop`` branch to be tested before pushing to master branch
2. Changes may be view on the [staging site](http://fubar-staging.herokuapp.com/).

Logging in as Peter
----------------------------
In order to login as peter, use the following credentials

	username: peter@enque.com
	password: peter
	
The live app can be found [here](http://team-fubar.herokuapp.com/).
	
Click the restart button on the latest build to rebuild it.
