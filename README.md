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

Once in the main screem click on "Populate" to fill the database with fakedata

For admin usage enter the following link and insert your CouchDB credentials:
```
http://localhost:5984/_utils/
```
