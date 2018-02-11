# Database Assignment 2 - Kasper Pagh

## Introduction

This application is written in node.js, and functions by exposing a number of API endpoints
(each corresponding to the answer for one of Helge's questions).


## Dependencies

To run the code you'll need to have Nodejs and MongoDB installed. 

#### Step 1
Get the node installer from https://nodejs.org/en/. Here you can get installation packages for Mac, Win and linux. 
If you'd like to install useing apt-get (eg. on VM without GUI), 
follow these instructions: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

Remeber to add all the binaries to your path for convinience!!

#### Step 2
Obvously you're gonna need an instance of MongoDB (mongod) up and running for this project. 
In this regard, I'll simpley refer you to helges slides for how to run mongod in a container. 

You can also install a "real" instance of MongoDB, if you follow the appropriate instructions over at: 
https://docs.mongodb.com/manual/installation/

NB. I will assume that your Mongo instance runs on the localhost, using the default port. Otherwise you'll have to edit my code
to account for the new IP.

#### Step 3
Next you'll need to populate the Database with the twitter data provided by Helge.

To do this (and ensure you use the same DB and Collection names as me) first run the .csv file
through sed as follows (assuming ofcause that you haven't renamed the file):

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


| ENDPOINT  | Function |
| ------------- | ------------- |
| /uniqueusers  | Returns the number of unique users in the DB  |
| /mostlinkedusers  | Returns the most commonly linked users in the DB  |
| /mostmentionedusers | Returns the most commenly mentioned users in the DB  |
| /mostactiveusers | Returns the users with the most posts in the DB  |
| /happypolarity | Returns the users with the highest average polarity AND more than 150 posts  |
| /unhappypolarity | Returns the users with the lowest average polarity AND more than 150 posts  |


This means that if you are running the application properly, you should be able to grap a webbrowser
and navigate to: http://localhost:3000/uniqueusers (or whatever), and you'll be presented with a JSON object, cotaining the
number of unique users.







