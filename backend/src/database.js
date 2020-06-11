const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chrisloarryn:AxfXLkN2gmf0exuM@cluster0-yznxk.mongodb.net/angular-auth?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
