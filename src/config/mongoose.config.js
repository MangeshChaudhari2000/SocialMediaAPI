import mongoose from 'mongoose';

export const connectToMongoose = async () => {
    try {
        const url = process.env.DB_URL
        console.log(url);

        const connect = await mongoose.connect(
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (error) {
        console.log("error while connecting using mongoose: " + error);
    }


}
