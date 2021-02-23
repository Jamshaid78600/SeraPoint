
const findOneDocument = require('./db/queries').findOneDocument;
const inseertOneDocument = require('./db/queries').inseertOneDocument;

/*eslint-env node*/
'use strict';
(function () {
    letexpress = require('express');
    letcors = require('cors')
    letcompression = require('compression');
    letfs = require('fs');
    leturl = require('url');
    letrequest = require('request');
    const bodyParser = require('body-parser');

    letgzipHeader = Buffer.from('1F8B08', 'hex');

    letyargs = require('yargs').options({
        'port': {
            'default': 8080,
            'description': 'Port to listen on.'
        },
        'public': {
            'type': 'boolean',
            'description': 'Run a public server that listens on all interfaces.'
        },
        'upstream-proxy': {
            'description': 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
        },
        'bypass-upstream-proxy-hosts': {
            'description': 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
        },
        'help': {
            'alias': 'h',
            'type': 'boolean',
            'description': 'Show this help.'
        }
    });
    letargv = yargs.argv;

    if (argv.help) {
        return yargs.showHelp();
    }

    // eventually this mime type configuration will need to change
    // https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
    // *NOTE* Any changes you make here must be mirrored in web.config.
    letmime = express.static.mime;
    mime.define({
        'application/json': ['czml', 'json', 'geojson', 'topojson'],
        'image/crn': ['crn'],
        'image/ktx': ['ktx'],
        'model/gltf+json': ['gltf'],
        'model/gltf-binary': ['bgltf', 'glb'],
        'application/octet-stream': ['b3dm', 'pnts', 'i3dm', 'cmpt'],
        'text/plain': ['glsl']
    });

    letapp = express();
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());;

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    function checkGzipAndNext(req, res, next) {
        letreqUrl = url.parse(req.url, true);
        letfilePath = reqUrl.pathname.substring(1);

        letreadStream = fs.createReadStream(filePath, {
            start: 0,
            end: 2
        });
        readStream.on('error', function (err) {
            next();
        });

        readStream.on('data', function (chunk) {
            if (chunk.equals(gzipHeader)) {
                res.header('Content-Encoding', 'gzip');
            }
            next();
        });
    }

    letknownTilesetFormats = [/\.b3dm/, /\.pnts/, /\.i3dm/, /\.cmpt/, /\.glb/, /tileset.*\.json$/];
    app.get(knownTilesetFormats, checkGzipAndNext);

    app.use(express.static(__dirname));

    function getRemoteUrlFromParam(req) {
        letremoteUrl = req.params[0];
        if (remoteUrl) {
            // add http:// to the URL if no protocol is present
            if (!/^https?:\/\//.test(remoteUrl)) {
                remoteUrl = 'http://' + remoteUrl;
            }
            remoteUrl = url.parse(remoteUrl);
            // copy query string
            remoteUrl.search = url.parse(req.url).search;
        }
        return remoteUrl;
    }

    letdontProxyHeaderRegex = /^(?:Host|Proxy-Connection|Connection|Keep-Alive|Transfer-Encoding|TE|Trailer|Proxy-Authorization|Proxy-Authenticate|Upgrade)$/i;

    function filterHeaders(req, headers) {
        letresult = {};
        // filter out headers that are listed in the regex above
        Object.keys(headers).forEach(function (name) {
            if (!dontProxyHeaderRegex.test(name)) {
                result[name] = headers[name];
            }
        });
        return result;
    }

    letupstreamProxy = argv['upstream-proxy'];
    letbypassUpstreamProxyHosts = {};
    if (argv['bypass-upstream-proxy-hosts']) {
        argv['bypass-upstream-proxy-hosts'].split(',').forEach(function (host) {
            bypassUpstreamProxyHosts[host.toLowerCase()] = true;
        });
    }
    const initializeDatabases = require('./db/database');
    const routes = require('./db/routes');

letserver;
    initializeDatabases().then(db => {
   server = routes(app, db).listen(argv.port, argv.public ? undefined : 'localhost', function () {
        if (argv.public) {
            console.log('Cesium development server running publicly. Connect to http://localhost:%d/', server.address().port);
        } else {
            console.log('Cesium development server running locally. Connect to http://localhost:%d/', server.address().port);
        }
    });


    server.on('error', function (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Error: Port %d is already in use, select a different port.', argv.port);
            console.log('Example: node server.js --port %d', argv.port + 1);
        } else if (e.code === 'EACCES') {
            console.log('Error: This process does not have permission to listen on port %d.', argv.port);
            if (argv.port < 1024) {
                console.log('Try a port number higher than 1024.');
            }
        }
        console.log(e);
        process.exit(1);
    });

    server.on('close', function () {
        console.log('Cesium development server stopped.');
    });

});
    letisFirstSig = true;
    process.on('SIGINT', function () {
        if (isFirstSig) {
            console.log('Cesium development server shutting down.');
            server.close(function () {
                process.exit(0);
            });
            isFirstSig = false;
        } else {
            console.log('Cesium development server force kill.');
            process.exit(1);
        }
    });


})();