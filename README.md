# Frontend Assignment (estimate 3-4 hours)

This assignment consists of two tasks:
1. Create a web frontend for displaying measurements from the Bodyport Cardiac Scale
2. Write a proposal for ways to improve the system

Feel free to use any languages, frameworks or libraries you decide are suitable.
Explain your thinking and provide setup instructions & documentation so we can verify your work.

## API setup
This repository contains a python backend for retrieving measurements at `http://localhost:5555/measurements`.
You may make changes to the Python code if you want, but it's not required.
Run the following commands in a terminal to get the backend server up and running.

```
python --version    # must be >= 3.7
python -m venv venv
source venv/bin/activate (./venv/scripts/activate.bat for windows)
pip install -r requirements.txt
python main.py      # start the server on port 5555
```

## Task 1
Create a web page that loads measurements from the server and displays them on a plot.
Measurements do not belong to the same user, so your interface should allow for switching between users.
Your plot should be able to support the entire measurement history for each patient.
This task will be graded based on design, usability, functionality, and code quality.

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

You may include a mockup if you like, but it's not required.