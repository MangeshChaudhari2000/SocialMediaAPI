import jwt from 'jsonwebtoken';


const jwtAuth = (req, res, next) => {
    try {
        const authorizaionPassword = req.headers['authorization'];

        const decode = jwt.verify(authorizaionPassword,
            process.env.JWT_KEY
        )
        req.userId = decode.userId;

    } catch (error) {
        console.log(error.message);
        return res.status(401).send("UnaAuthorised please check credenials")

    }
    next();

}

export default jwtAuth;

