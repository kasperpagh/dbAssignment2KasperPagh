const Tweet = require("./tweetSchema");
const MongoClient = require("mongodb").MongoClient;
const db_name = "twitter";
const col_name = "tweets";


let getNumberOfUniqueUsers = function func_number_of_users(callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.distinct('user').then(function (item)
        {
            database.close();
            callback(item.length);
        })
    });
};

let getUserWhoLinkTheMost = function func_number_of_links(top_x, callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            console.log("Vi har con fejl " + err);
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.aggregate(
            [
                {$group: {_id: "$user", total: {$sum: {$size: {$split: ["$text", "@"]}}}}},
                {$sort: {total: -1}},
                {$limit: top_x}],
            {allowDiskUse: true}).toArray((err, item) =>
        {
            if (err)
            {
                database.close();
                callback(err);
            }
            else
            {
                database.close();
                callback(item);
            }

        });
    })
};


let mostMentionedUser = function func_most_mentioned(top_x, callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.aggregate(
            [
                {$addFields: {words: {$split: ["$text", " "]}}},
                {$unwind: "$words"},
                {$match: {words: {$regex: "@.", $options: 'm'}}},
                {$group: {_id: "$words", total: {$sum: 1}}},
                {$sort: {total: -1}},
                {$limit: top_x}],
            {allowDiskUse: true}).toArray((err, item) =>
        {
            if (err)
            {
                database.close();
                callback(err);
            }
            else
            {
                database.close();
                callback(item);
            }

        });
    });
};


let mostActiveUsersByPostCount = function func_number_of_posts(top_x, callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.aggregate(
            [
                {$group: {_id: "$user", total: {$sum: 1}}},
                {$sort: {total: -1}},
                {$limit: top_x}],
            {allowDiskUse: true}).toArray((err, item) =>
        {
            if (err)
            {
                database.close();
                callback(err);
            }
            else
            {
                database.close();
                callback(item)
            }
        });
    })
};


let happyPolarity = function func_avg_part(top_x, adj, gt, callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.aggregate(
            [
                {$group: {_id: "$user", avg: {$avg: "$polarity"}, total: {$sum: 1}}},
                {$match: {total: {$gt: gt}}},
                {$sort: {avg: adj}},
                {$limit: top_x}],
            {allowDiskUse: true}).toArray((err, item) =>
        {
            if (err)
            {
                database.close();
                console.log(err);
            }
            else
            {
                database.close();
                callback(item)
            }
        });
    });
};


let unHappyPolarity = function func_avg_part(top_x, highOrLow, postCountGreaterThan, callback)
{
    MongoClient.connect("mongodb://localhost:27017/" + db_name, function (err, database)
    {
        if (err)
        {
            return console.dir(err);
        }
        let collection = database.db(db_name).collection(col_name);
        collection.aggregate(
            [
                {$group: {_id: "$user", avg: {$avg: "$polarity"}, total: {$sum: 1}}},
                {$match: {total: {$gt: postCountGreaterThan}}},
                {$sort: {avg: highOrLow}},
                {$limit: top_x}],
            {allowDiskUse: true}).toArray((err, item) =>
        {
            if (err)
            {
                database.close();
                console.log(err);
            }
            else
            {
                database.close();
                callback(item);
            }
        });
    });
};

module.exports =
    {
        getNumberOfUniqueUsers: getNumberOfUniqueUsers,
        getUserWhoLinkTheMost: getUserWhoLinkTheMost,
        mostMentionedUser: mostMentionedUser,
        mostActiveUsersByPostCount: mostActiveUsersByPostCount,
        happyPolarity: happyPolarity,
        unHappyPolarity: unHappyPolarity
    };