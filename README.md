# Boss Machine

[Boss Machine](http://carokrny.github.io/boss-machine) is a basic back-end web project built with Node.js and Express.

## Table of Contents 
* [Introduction](#introduction)
* [Set Up](#set-up)
* [Technologies](#technologies)
* [Boss Machine API](#bss-machine-api)
  * [API Routes](#api-routes)
  * [Database Functions](#database-functions)
  * [Schemas](#schemas)
  * [Custom Middleware](#custom-middleware)
* [Testing](#testing)
* [Sources](#sources)

## Introduction 

The Boss Machine is a unique management application for today's most accomplished (evil) entrepreneurs. Routes to manage your 'minions', your brilliant 'million dollar ideas', and to handle all the annoying meetings that keep getting added to your busy schedule.

This project was created to practice creating a RESTful API and middleware with Node.js and Express.

## Set Up 

You should use [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) (at least version 60) or [Firefox](https://www.mozilla.org/en-US/firefox/new/) (at least version 55) to use Boss Machine.

View live site [here](http://carokrny.github.io/boss-machine)!

## Technologies 

* `express` v. 4.16.1
* `mocha` v. 9.1.2
* `chai` 4.1.1
* `nodemon` v. 2.0.13
* `morgan` v. 1.8.2
* `node` v. 14.17.1
* `npm` v. 7.21.1

## Boss Machine API

### API Routes

- `/api/minions`
  - GET `/api/minions` to get an array of all minions.
  - POST `/api/minions` to create a new minion and save it to the database.
  - GET `/api/minions/:minionId` to get a single minion by id.
  - PUT `/api/minions/:minionId` to update a single minion by id.
  - DELETE `/api/minions/:minionId` to delete a single minion by id.
  - GET `/api/minions/:minionId/work` to get an array of all work for the specified minon.
  - POST `/api/minions/:minionId/work` to create a new work object and save it to the database.
  - PUT `/api/minions/:minionId/work/:workId` to update a single work by id.
  - DELETE `/api/minions/:minionId/work/:workId` to delete a single work by id.
- `/api/ideas`
  - GET `/api/ideas` to get an array of all ideas.
  - POST `/api/ideas` to create a new idea and save it to the database.
  - GET `/api/ideas/:ideaId` to get a single idea by id.
  - PUT `/api/ideas/:ideaId` to update a single idea by id.
  - DELETE `/api/ideas/:ideaId` to delete a single idea by id.
- `/api/meetings`
  - GET `/api/meetings` to get an array of all meetings.
  - POST `/api/meetings` to create a new meeting and save it to the database.
  - DELETE `/api/meetings` to delete _all_ meetings from the database.

### Working with the 'Database'

The **server/db.js** file exports helper functions for working with the database arrays.

- `getAllFromDatabase`:
  - Takes only the single argument for model name. 
  - Returns the array of elements in the database or `null` if an invalid argument is supplied.
- `getFromDatabaseById`:
  - Takes the model name argument and a second string argument representing the unique ID of the element. 
  - Returns the instance with valid inputs and `-1` with an invalid id.
- `addToDatabase`:
  - Takes the model name argument and a second argument which is an object with the key-value pairs of the new instance. 
    - Handles assigning `.id` properties to the instances. 
    - It does not check to make sure that valid inputs are supplied. 
  - Returns the newly-created instance from the database. 
  - This function will validate the schema of the instance to create and throw an error if it is invalid.
- `updateInstanceInDatabase`:
  - Takes the model name argument and a second argument which is an object representing an updated instance. 
    - The instance provided must have a valid `.id` property which will be used to match. 
  - Returns the updated instance in the database or `null` with invalid inputs. 
  - This function will validate the schema of the updated instance and throw an error if it is invalid.
- `deleteFromDatabasebyId`:
  - Takes the model name argument and a second string argument representing the unique ID of the element to delete. 
  - Returns `true` if the delete occurs properly and `false` if the element is not found.
- `deleteAllFromDatabase`:
  - Takes only the single argument for model name. 
  - Deletes all elements from the proper model and returns a new, empty array.

#### Schemas

- Minion:
  - id: string
  - name: string
  - title: string
  - salary: number
- Idea
  - id: string
  - name: string
  - description: string
  - numWeeks: number
  - weeklyRevenue: number
- Meeting
  - time: string
  - date: JS `Date` object
  - day: string
  - note: string
- Work:
  - id: string
  - title: string
  - description: string
  - hours: number
  - minionId: string

### Custom Middleware

- `checkMillionDollarIdea`:
  - Custom middleware function used in `/api/ideas` routes. 
  - Ensures that any new or updated ideas are still worth at least one million dollars! 

## Testing

A testing suite has been provided, checking for all essential functionality and edge cases.

Run `npm run test`. You will see a list of tests that ran with information about whether or not each test passed. 

## Sources 

This app was created as part of [Codecademy's Fullstack Engineer](https://www.codecademy.com/learn) curriculum. Codecademy provided starter code with the front-end completed, a full testing suite, and the 'database' helper functions. The API was written by the student.  
