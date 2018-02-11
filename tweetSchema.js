const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    polarity: {type: String},
    id: {type: String},
    date: {type: String},
    query: {type: String},
    user: {type: String},
    text: {type: String}
});


var Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;