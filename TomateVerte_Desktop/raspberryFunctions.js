

const dbTools = require('./dbFunctions');

module.exports = {
    //update parameter value

    actionLed: function (action, couleur) {
        dbTools.getParam('ipRaspberry', function (paramValue) {
            var urlService = paramValue;
            var commande = action + 'Led' + couleur;
            console.log("commande:" + commande);
            console.log('urlService : ' + urlService);
            var urlCommande = urlService + '/' + commande + '/';
            console.log("urlCommande:" + urlCommande);

            request(urlCommande, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
            });
        });
    }
}