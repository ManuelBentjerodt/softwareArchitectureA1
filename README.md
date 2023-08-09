## 1. Setup

Package installation, inside the client and server folders run the command: 

```
npm i
```

In the main folder, create a file called ".env" and write:

```
EXPRESS_PORT = 5000 
COUCH_DB_URL=http://admin:admin@127.0.0.1:5984
```

## 2. Run and management

To run the program, open 2 terminals, one in the client folder and the other in the server folder and run this command in each one:

```
npm start
```

## 3. Important

This application uses CouchDB as a database manager. To use it, create a .env file and declare the variables COUCH_DB_URL and PORT for the Express.js port (Step 1.). Make sure CouchDB is running. If you don't have it installed, you can find it [here](https://couchdb.apache.org/#download).
