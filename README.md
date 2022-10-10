# Full Stack Idea: Workout Logging App

# Overview
This is a simple application to help users keep track of their workouts as well
as their progress in improving their overall fitness. Users will have the ability
to both log their workouts, as well as view and comment on workouts created by 
other users. The purpose of this application is to both enable users to more seamlessly
track their workout routines, and foster a community of workout collaboration by sharing workouts out to other users for them to view and provide feedback.

# Technologies used:
-HTML5
-CSS
-Javascript
-Node
-MongoDB
-Mongoose
-Express
-Liquid
-Bootstrap

# User Stories
- As a user, I want the ability to sign up for the application with a distinct username.
- As a user, I want the ability to log in after signing up.
- As a user, I want the ability to log out after being logged in.
- As a user, I want the ability to view all workouts posted by all users (including seed data).
- As a user, I want the ability to view my own user created workouts on a separate page from all workouts.
- As a user, I want the ability to create new workout objects and have the option to either log only to my own page or share with all users.
- As a user, I want the ability to delete workout objects created by me.
- As a user, I want the ability to edit workout objects created by me.
- As a user, I want the ability to provide feedback and review workouts shared by other users.
- As a user, I want the ability to click the App Logo and be redirected to my user home page.
- As a user, I want the ability to click "Log Workout" and then be directed to a page where I can create my own workout object.
- As a user, I want to see descriptive text for each field when creating a new workout object.
- As a user, I want to be prevented from logging new workouts while not logged in.


# Data
- Seed with 10 sets of existing workout objects

# Wireframe/Screenshots
![Full-Stack-Project](Wireframes/Workout%20Logger%20Wireframes.drawio.png)

# ERD
![Full-Stack-Project](ERD/Workout%20Logger%20ERD.drawio.png)

# Weekly Plan
Monday - Create all data models, get middleware setup, server setup, organize files and directories. Get the barebones backend setup and run tests with POSTMAN to ensure objects can be created and stored.

Tuesday - Continue working through basic backend infrastructure. Then begin creating views. Start with organizing view for seed data, then move to user authentication (sign up, log in, log out).

Wednesday - Continue working on views. Build out the view and test functionality for logging new user workouts and optional share to the community. Build and test ability to view other user workouts and give reviews.

Thursday - Begin looking at ways to refactor now that the barebones of frontend and backend should be complete. Test all user cases, common and edge-case scenarios. 

Friday - Work on enhancing views and introducing more flavor to the design. Expect to have full app functionality by this point, so focus more on improving design and layout. 

