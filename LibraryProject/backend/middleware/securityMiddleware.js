//cors: look at configuration options for express api
//csurf: how it helps with csrf attavks and configures for a node.js api
//helmet: how it helps with header protections with click jacking
//rate limiting, brute force prevention and libraries to include for this node.js api

const helmet = require('helmet')
const cors = require('cors')

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}

const securityMiddlewares = (app) => {
    app.use(helmet({
        contentSecurityPolicy:{
            useDefaults: true,
            directives:{
                
                'default-src': ["'self'"],
                'frame-ancestors':["'none'"],

            }
        },
        featurePolicy:{
            features:{
                geolocation: ["'none'"],
                microphone: ["'none'"]
            }
        },
        hidePoweredBy: true,
        framegaurd:{
            action: 'deny'
        },
        ieNoOpen: true
    }))

    app.use(cors(corsOptions))
}

module.exports = { securityMiddlewares }