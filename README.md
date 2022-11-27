# About This Project
This project was developed for the Bodyport takehome assessment. It displays a frontend dashboard that plots health datapoints. 
This project uses bootstrap components and the Plotly.js react component.

## Running the Project
First, follow instructions in `/backend/README.md` to set up the python server. Then in the `/backend` directory run 
 `python main.py`

Open a new terminal and in the /frontend directory run 
 `npm install` to install dependencies
 `npm start`

## Task 2
Suppose new data points are added and the UI needs to be updated.
These could be patient symptoms, hospital visits, medication changes, diet logs, risk calculations, etc...

Write up a proposal for the next version of your dashboard.
It should address these questions, as well as any other product or design concerns that come to mind:

* How should these extra data points be surfaced on your site?
* How should the API be updated to support your new design?
* Are there any performance limitations that should be taken into consideration?
* How would future developers extend your work?
* Can you assess the usability of newly added features?

1. For new metrics to be added to the dashboard, information needs to be added to the hardcoded 'measurements' array (line 52 of `\frontend\src\App.js`). This array contains an object for each metric with one property 'propName' storing the json key of the metric and another property 'name' storing the frontend display string of the metric so that the portal can display the name of the metric that is selected. In the future perhaps this information can be sent through an API to eliminate the hardcoded variable.

2. As mentioned before, an API endpoint can be made that maps each metric's json key to its desired display name. Also, an API endpoint where userIDs are mapped to the patient's name would allow for the user selection dropdown to be more usable, since it would be able to display names rather than IDs. The current provided data does not include the patient name.

3. With the current amount of data I did not encounter performance issues. If there were many more points there could potentially arise performance issues,
since every time a new measurement or userID is selected the frontend goes through every point in the data to identify points that need to be graphed (that is, the points that match the current userID and measurement selections). One solution that would make this process more efficient would be to group the points by userID (using an object, probably) on initial render so that there are fewer points to process when identifying points that need to be graphed.

4. It would be nice to be able to search the userID dropdown because it could become hard to use with more userIDs. As previously mentioned, it would also be good to match the userIDs to the patient's name to make the user selection dropdown to be more usable.

5. I find the dashboard to be simple and intuitive, and therefore usable. As previously mentioned, one thing that would improve usability is to display the patient's name in the user selection dropdown, rather than the ID.

## Other Notes
I ran into some issues setting up the python server. First, I ran `./venv/scripts/activate.bat`  instead of `source venv/bin/activate` since I have a windows computer. I also had to change `requirements.txt` to upgrade Flask to 2.1.0 and Flask-SQLAlchemy to 2.5.1.
