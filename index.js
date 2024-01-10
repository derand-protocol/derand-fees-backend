import server from './src/server.js';
import db from './src/db/index.js';

const boot = async () => {
  
  db.start();
  server.start();

}

boot()