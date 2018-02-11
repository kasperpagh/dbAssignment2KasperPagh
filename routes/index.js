var express = require('express');
var router = express.Router();
const facade = require("../dbFacade");

/* GET home page. */
router.get('/', function (req, res, next)
{
    res.render('index', {title: 'Express'});
});


router.get("/uniqueusers", function (req, res, next)
{
    facade.getNumberOfUniqueUsers(function (users)
    {
        let resObj = {"Total number of unique users": users};

        res.status(200).end(JSON.stringify(resObj));
    });
});


router.get("/mostlinkedusers", function (req, res, next)
{
    facade.getUserWhoLinkTheMost(10, function (users)
    {
        let resObj = {"most linked users": users};
        res.status(200).end(JSON.stringify(resObj));
    });
});


router.get("/mostmentionedusers", function (req, res, next)
{
    facade.mostMentionedUser(10, function (users)
    {
        let retObj = {"most mentioned users": users};
        res.status(200).end(JSON.stringify(retObj));
    });
});


router.get("/mostactiveusers", function (req, res, next)
{
    facade.mostActiveUsersByPostCount(10, function (users)
    {
        let retObj = {"most active users": users};
        res.status(200).end(JSON.stringify(retObj));
    });
});


router.get("/happypolarity", function (req, res, next)
{
    facade.happyPolarity(10, -1, 150, function (things)
    {
        let retObj = {"users with highest polarity and more than 150 posts": things};
        res.status(200).end(JSON.stringify(retObj));
    });
});

router.get("/unhappypolarity", function (req, res, next)
{
    facade.unHappyPolarity(10, 1, 150, function (things)
    {
        let retObj = {"users with lowest polarity and more than 150 posts": things};
        res.status(200).end(JSON.stringify(retObj));
    });
});
module.exports = router;
