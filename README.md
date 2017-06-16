APPLICATION OVERVIEW
----------------------------  
Create an account with a company name.  
Dashboard will display Company Name and Contact Information  
Graphs of data will be generated upon user selection of categories where user can choose timeframe of interest.  
Forms in the formbuilder are now saved to the database.  
Users can now check in to an appointment on the sign-in tab and this information is saved in the database.  

# web-app [ ![Codeship Status for CSE112-GoldTeam/web-app](https://codeship.com/projects/5f33bf40-cb9d-0133-dbda-4a84e368cd36/status?branch=master)](https://codeship.com/projects/59497)

First Run
----------------------------
1. Setup Account with [mLab](https://mlab.com/)
2. Copy mongoDB access point into app.js:

        $ var mongoURI = process.env.MONGOLAB_URI || 'YOUR MONGODB CONNECTION ON mLAB';
        
2. Install [Node.js](http://nodejs.org/download/)
3. Navigate to the root directory
4. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

6. Use ``gulp`` to run the application
7. Navigate your browser to [http://localhost:4000](http://localhost:4000/)

Push to testing environment
----------------------------
1. Simply push your experimental changes to the ``develop`` branch.
2. Changes may be view on the [staging site](http://fubar-staging.herokuapp.com/).

Logging in as Peter
----------------------------
In order to login as peter, use the following credentials

	username: peter@enque.com
	password: peter
	
The live app can be found [here](http://xposeidon.herokuapp.com/).
	
