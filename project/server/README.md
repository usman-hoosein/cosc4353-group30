# HOW TO START THE SERVER
1. Clone the whole GitHub repo onto your local machine

2. Open a new terminal (seperate from the front-end terminal) and locate this folder (project/server) on your machine

3. Run 
  ### 'npm install'

4. Run 
  ### 'npm start'

5. The back-end server should begin running

## To shut down the server, hit 'Ctrl + C' on the terminal where the server is running


# HOW TO RUN UNIT TESTS

1. Open new terminal and cd into project/server. Run 'npm install' if you haven't already.

2. Run
  ### 'npm test'

3. All unit tests should run and pass

4. To check code coverage, run
  ### 'npx jest --coverage'

## Press 'Ctrl + C' in server terminal to terminate server.


# HOW TO INITIALIZE / RESET TABLES

1. cd into project.

2. Run
  ### 'node queries/initialize/initialize.js'