var mongoose = require('mongoose');
var origin = '52.23.251.45'; 
var url = `mongodb://${origin}:27017/mortgages`; // 
//var url = 'mongodb://localhost:27017/mortgages'; 

//Comment out line 3 and uncomment line 4 for local access


var mortgagesSchema = new mongoose.Schema({
    id: {type: Number, index: true},
    price: {type: Number}
});

mongoose.connect(url, {useNewUrlParser: false})
.then(() => console.log(`The connection was successful to ${origin}`))
.catch(err => console.log(`There was an err: ${err}`))

module.exports.Mortgages = mongoose.model('Mortgage', mortgagesSchema);


