Application NodeJS (REST) expressJS based.

Module "Users Manager" implemented with jQuery library and Sass.

steps:

0.  MondoDB required
0.1 NodeJS required
0.2 npm required
0.3 uncomment <!-- <script src="js/jquery.min.js"></script> --> from index.html if there is not internet connection. 


1. npm install
2. mongorestore -->   this step will insert a demo data into DB 
3. npm start  -->   run the application
4. login as "admin - 123" for full control.

In case you want to modify the style.scss file, you should run "grunt default" in order to compile it to style.css

/public/inidex.html is the entry point of the app.

Tree directories:

├── bin
│   └── www
├── dump
│   └── usersApp
│       ├── groups.bson
│       ├── groups.metadata.json
│       ├── system.indexes.bson
│       ├── users.bson
│       └── users.metadata.json
├── Gruntfile.js
├── models
│   ├── group.js
│   └── user.js
├── package.json
├── public
│   ├── addUser.html
│   ├── css
│   │   ├── style.css
│   │   ├── style.css.map
│   │   └── style.scss
│   ├── images
│   │   └── trash.png
│   ├── index.html
│   └── js
│       ├── app.js
│       ├── groupController.js
│       ├── jquery.min.js
│       ├── loginController.js
│       └── userController.js
├── README.txt
├── routes
│   ├── groups.js
│   └── users.js
└── server.js



TO DO:

- Add pagination in users and groups list-
- Control any User could exits with out a group.
- Improve the design.

