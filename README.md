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

Next up you'll need to import the data to MongoDB, for this you'll need the MongoImport tool (ships with the other mongo related binaries).

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


| METHOD | ENDPOINT  | Function | Output |
| --------|----- | ------------- | ------------- |
| GET | /uniqueusers  | Returns the number of unique users in the DB  | {"Total number of unique users":659774} |
| GET | /mostlinkedusers  | Returns the most commonly linked users in the DB  | {"most linked users":[{"_id":"lost_dog","total":1098},{"_id":"tweetpet","total":620},{"_id":"VioletsCRUK","total":575},{"_id":"SallytheShizzle","total":515},{"_id":"tsarnick","total":506},{"_id":"mcraddictal","total":493},{"_id":"what_bugs_u","total":492},{"_id":"SongoftheOss","total":484},{"_id":"Karen230683","total":482},{"_id":"keza34","total":458}]}|
| GET | /mostmentionedusers | Returns the most commenly mentioned users in the DB  | {"most mentioned users":[{"_id":"@mileycyrus","total":4310},{"_id":"@tommcfly","total":3837},{"_id":"@ddlovato","total":3349},{"_id":"@Jonasbrothers","total":1263},{"_id":"@DavidArchie","total":1222},{"_id":"@jordanknight","total":1105},{"_id":"@DonnieWahlberg","total":1085},{"_id":"@JonathanRKnight","total":1053},{"_id":"@mitchelmusso","total":1038},{"_id":"@taylorswift13","total":973}]} |
| GET | /mostactiveusers | Returns the users with the most posts in the DB  | {"most active users":[{"_id":"lost_dog","total":549},{"_id":"webwoke","total":345},{"_id":"tweetpet","total":310},{"_id":"SallytheShizzle","total":281},{"_id":"VioletsCRUK","total":279},{"_id":"mcraddictal","total":276},{"_id":"tsarnick","total":248},{"_id":"what_bugs_u","total":246},{"_id":"Karen230683","total":238},{"_id":"DarkPiano","total":236}]} |
| GET | /happypolarity | Returns the users with the highest average polarity AND more than 150 posts  | {"users with highest polarity and more than 150 posts":[{"_id":"KevinEdwardsJr","avg":4,"total":171},{"_id":"what_bugs_u","avg":4,"total":246},{"_id":"DarkPiano","avg":3.9152542372881354,"total":236},{"_id":"Scyranth","avg":3.9036144578313254,"total":166},{"_id":"keza34","avg":3.853881278538813,"total":219},{"_id":"shanajaca","avg":3.8309859154929575,"total":213},{"_id":"cookiemonster82","avg":3.7,"total":160},{"_id":"shellrawlins","avg":3.6729559748427674,"total":159},{"_id":"maynaseric","avg":3.6729559748427674,"total":159},{"_id":"TraceyHewins","avg":3.6587677725118484,"total":211}]} |
| GET | /unhappypolarity | Returns the users with the lowest average polarity AND more than 150 posts  | {"users with lowest polarity and more than 150 posts":[{"_id":"tweetpet","avg":0,"total":310},{"_id":"lost_dog","avg":0,"total":549},{"_id":"wowlew","avg":0.03773584905660377,"total":212},{"_id":"mrs_mcsupergirl","avg":0.8860759493670886,"total":158},{"_id":"webwoke","avg":0.9391304347826087,"total":345},{"_id":"mcraddictal","avg":0.9565217391304348,"total":276},{"_id":"_magic8ball","avg":1.1216931216931216,"total":189},{"_id":"Dogbook","avg":1.2291666666666667,"total":192},{"_id":"JBnVFCLover786","avg":1.3006134969325154,"total":163},{"_id":"MiDesfileNegro","avg":1.310734463276836,"total":177}]} |


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








