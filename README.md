# CrimeWatch
README 
Elevator Pitch:
    CrimeWatch is an app that displays recent incidents from an inputted zip code in NOLA along with breakdowns of report statistics for those areas.

Project features:
    - The user can submit an incident report that will be added to our database.
    - The zip code submission box at the top will retrieve all incidents from the zip code entered into it that occurred within the last 48 hours from both the NOPD API and our database of user reported incidents when the “Submit” button is clicked.
    - A dynamic city map will display incidents from the zip code submitted by the user.
    - A dynamic time line will display incidents from the zip code submitted by the user.
    - Dynamic charts will display breakdowns of all incidents from within the given zip code in three different forms depending on user selection: Bar Graph, Pie Chart, or Radar Chart.
- Frameworks & Libraries that are used by this project: MySQL, Express, ReCharts, Axios, Moment, Passport, React, Sequelize, Nodemon, Mapbox-GL, Babel
- scripts:
    - `npm run dev` - runs both the build & server concurrently in one terminal
        - Note: if there are issues with this command, try running `npm run build` and `npm run start` in separate terminals
    - `npm run deploy`  - deploys the app (WARNING: don’t use locally!)
    - `npm run seed` - initiates the database (but does not add any additional data to it)
    - `npm run pull` - this will pull from origin main - mostly used in the deploy script
- To start this app:
    - Run `npm run dev` in your terminal in the root of this project’s repo. Leave this terminal open.
    - Launch your MongoDB server. Leave this terminal open.
    - Launch the mongo shell by running the command `mongosh` in a new terminal. Leave this terminal open.
    - Run `npm run seed` to initialize the database
    - Open an internet browser (we recommend Brave or Chrome). In the url field at the top of your browser window, type [http://localhost:8080/](http://localhost:8080/) and push enter to access the app. Note that you will need a working internet connection for the app to function.
    - The first page you should see is a Google authentication page. Click the orange button in the center and log in to your Google account to access the app.
        - Note: if you have issues seeing the app after logging in, navigating to [http://localhost:8080/](http://localhost:8080/) in a new browser tab/window
    - Once the app is running, input a valid New Orleans zip code into the input box at the top and click Submit to view all reports from that zip code (both from the NOPD API and from our database of user submissions)
    - You can click the “Create Incident Report” button at the top to submit an incident report yourself
        - You will first be asked if you have already contacted the authorities. You must select ‘Yes’ to proceed to the form. If you select ‘No’, you will be shown a list of various relevant telephone numbers you can use to report your incident.
        - On the incident report itself, you will need to enter your Name, Age, street Address, Zipcode, State, and City, as well as a description of the incident you are reporting
        - Use the dropdown to select the incident type from our pre-generated list
        - Click ‘Submit’ to submit the report, which will add it to the database.
        - Note: You may click ‘Cancel’ at any time to exit out of the form.
    - You can scroll through the timeline and zoom in and out on the map
        - The timeline will show the most recently reported incidents at the top, and later incidents further down. Only incidents from the last 48hrs will be displayed.
        - Incidents on the map are marked with colored pins. Clicking these pins will display information relevant to the event.
    - You can hover over the ‘select chart’ element to see a list of available chart types that the data can be displayed in. Click one of the entries to switch to that chart.
        - Note: hovering over bars on the bar chart or pie slices on the pie chart will display additional relevant data related to the incident type represented in that area.

Use instructions:
    After starting the app (see above), open the app page and sign on via Google Auth
    Input a zipcode to display data from that zipcode (note: you MUST input a zipcode, no data will display without one!)
    Click pins on map to display relevant data
    Scroll through timeline of events sorted by recency
    Hover over dropdown menu in Charts and click chart type to display that chart/graph for the relevant data
    Click the 'Create Incident Report' button to bring up an incident submission form. Fill this form out and click 'submit' to submit a report
