const Hapi = require('hapi'),
    server = new Hapi.Server(),
    chalk = require('chalk'),
      os = require('os');

const network = os.networkInterfaces();
server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (res, reply) {
      const data = {
        server: {
          uri: server.info.uri,
          protocol: server.info.protocol,
          network: network
        }
      }
      reply(data);
    }
});

server.start((err) => {
    if (err) {
        console.error(chalk.red('error'), 'server fault: ' + err);
    } else {
      console.info(chalk.green('running'), server.info.protocol + ' server at: ' + chalk.bold(server.info.uri));
    }
});
