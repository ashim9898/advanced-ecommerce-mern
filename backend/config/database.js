const connectDb=async ()=> {
    const mongoose = require('mongoose');
    
    
        const data = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        if (data) console.log(`connected to MongoDb: ${data.connection.host}`)
    
 
 
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = connectDb