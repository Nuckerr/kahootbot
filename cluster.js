var cluster = require('cluster');
var settings = require('./settings.json');
var amount = settings.amount;

if (cluster.isMaster) {

    for (var i = 0; i < amount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function () {
        cluster.fork();
    });

} else {
    require('./script');
}
