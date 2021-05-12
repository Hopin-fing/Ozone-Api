var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://84.38.180.73:27017";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("parserV2");
    dbo.collection("chrt_id").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});