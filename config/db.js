const mongose =  require('mongoose')
const connectDB = async () =>{
    try{
        const conn = await mongose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

    }catch (err){
        console.log(`Error: ${err.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB