# Database Assignment 2 - Kasper Pagh

## Introduction

This application is written in node.js, and functions by exposing a number of API endpoints
(each corresponding to the answer for one of Helge's questions).


## Dependencies

To run the code you'll need to have Nodejs and MongoDB installed. 

<b>Remeber to add all the binaries to your path for convinience!!</b>

#### Step 1
Get the node installer from https://nodejs.org/en/. Here you can get installation packages for Mac, Win and linux. 
If you'd like to install useing apt-get (eg. on VM without GUI), 
follow these instructions: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions



#### Step 2
Obvously you're gonna need an instance of MongoDB (mongod) up and running for this project. 
In this regard, I'll simpley refer you to helges slides for how to run mongod in a container. 

You can also install a "real" instance of MongoDB, if you follow the appropriate instructions over at: 
https://docs.mongodb.com/manual/installation/

NB. I will assume that your Mongo instance runs on the localhost, using the default port. Otherwise you'll have to edit my code
to account for the new IP. (see dbFacade.js file)

#### Step 3
Next you'll need to populate the Database with the twitter data provided by Helge.

To do this (and ensure you use the same DB and Collection names as me) first run the .csv file
through sed as follows (assuming of course that you haven't renamed the file):

```sh
sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv
```

Next up you'll need to import the data to MongoDB, for the you'll need the MongoImport tool (ships with the other mongo related binaries).

```sh
mongoimport -d twitter -c tweets --type csv --file {path to the csv file} --headerline
```
NB: the above path to the file is without curly brackets (Eg on winblows C:\Users\BobTheUnmaker\Documents\training.1600000.processed.noemoticon.csv). 

## How to run the code

The code on this repo is hosted without it's dependencies, therefore you'll have to go through the following before you can execute the application.

#### Step 1
Clone the code
```sh
git clone https://github.com/kasperpagh/dbAssignment2KasperPagh.git
```
#### Step 2
Get the dependencies by navigating to the project folder and typing
```sh
npm install
```
This command downloads all the dependencies as given by the <i>package.json</i> file.


#### Step 3
You should now be all set, navigate to the projects root folder (the one containing package.json and app.js amongst others).

You can then run the code by simply typing:

```sh
node app.js //input
lytter på port 3000! //output assuming no errors!
```


## What does the code do?

The application is an HTTP server that listens on localhost:3000, on the following endpoints:


| METHOD | ENDPOINT  | Function |
| --------|----- | ------------- |
| GET | /uniqueusers  | Returns the number of unique users in the DB  |
| GET | /mostlinkedusers  | Returns the most commonly linked users in the DB  |
| GET | /mostmentionedusers | Returns the most commenly mentioned users in the DB  |
| GET | /mostactiveusers | Returns the users with the most posts in the DB  |
| GET | /happypolarity | Returns the users with the highest average polarity AND more than 150 posts  |
| GET | /unhappypolarity | Returns the users with the lowest average polarity AND more than 150 posts  |


This means that if you are running the application properly, you should be able to grap a webbrowser
and navigate to: http://localhost:3000/uniqueusers (or whatever), and you'll be presented with a JSON object, cotaining the
number of unique users (ie. {"Total number of unique users":659774}).


## Final notes

Please give your machine atleast 30 seconds to execute each of the above queries, since they are quite heavy on the DB.
This time can of course be reduced, through clever use of indices (i would suggest: text, users and polarity - assuming you have the memory, prolly round 500 mb)  

In case you don't want to reimport the CSV file, just to satisfy my naming convention, you can just make an edit in the <i>dbFacade.js</i> file.
At the very top of the file, you'll find two constants called: db_name and col_name, you can then simply set these to whatever value 
you choose when you imported the data.

I reccomend jsonlint.com if you want to see the pretty print of the results, just copy-paste the response and press "validate JSON"


## Navigation
- app.js is the entry point for the program and contains depedencies, routes and http stuff
- dbFacade.js contains all the logic for communicating with the database
- /routes/index contains all the endpoints for the application








