const config = require('./mm-config');
const mm = require('mongodb-migrations');
const migrator = new mm.Migrator(config);

migrator.add(require('./multiply-developers.migration'));


migrator.migrate((err, results) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
});
