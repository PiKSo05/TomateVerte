
var Datastore = require('nedb')
    , db = new Datastore({ filename: 'data_storage/TomateVerte.nedb', autoload: true });

module.exports = {
    //update parameter value
    setParam: function (paramName, paramValue) {
        console.log('update parameter value : ' + paramName + ' = ' + paramValue);
        db.update({ name: paramName }, { name: paramName, value: paramValue }, { upsert: true }, function () {
            console.log('update parameter value' + paramName + ' = ' + paramValue + ' - SUCCESS');
        });
    },
    //get parameter value
    getParam: function (paramName, callback) {
        console.log('get parameter value : ' + paramName);

        db.find({ name: paramName },  (err, docs) => {
            if (docs.length !== 0) {
                var paramValue = docs[0].value;
                console.log('get parameter value : ' + paramName + ' = ' + paramValue);
                callback(paramValue);
                return paramValue;
            }
            else {
                console.log('paramètre inexistant : ' + paramName);
                return null;
            }
        });
    }
}