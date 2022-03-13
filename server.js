import express, {request, response} from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";

const database = {
    users: [
        {
            id: "123",
            firstName: "Ayesha",
            lastName: "Munawar",
            email: "ayeshagreat467@gmail.com",
            dateOfBirth: "Sat Mar 12 2001 08:42:24 GMT+0500 (Pakistan Standard Time)",
            password: "*123HelloMadam",
            entries: 1,
            joined: new Date(),
            history: [
                {
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Matt_Damon_TIFF_2015.jpg",
                    celebrityName: "Matt Damon",
                    imageId: 1234
                }
            ]
        },
        {
            id: "124",
            firstName: "Moneeza",
            lastName: "Syed",
            email: "moneezasyed234@gmail.com",
            dateOfBirth: "Sat Mar 12 2001 08:42:24 GMT+0500 (Pakistan Standard Time)",
            password: "*123HelloMoneeza",
            entries: 1,
            joined: new Date(),
            history: [
                {
                    imageUrl: "https://www.hollywoodreporter.com/wp-content/uploads/2021/08/GettyImages-1205210191-H-2021.jpg?w=681&h=383&crop=1",
                    celebrityName: "scarlett johansson",
                    imageId: 1235
                }
            ]
        }
    ],
    login: [
        {
            id: "124",
            hash: "",
            email: "moneezasyed234@gmail.com"
        }
    ]
}

const app = express();
// middle ware
app.use(bodyParser.json())

const searchByID = (id) => {
    return database.users.find((currentUser) => {
        return currentUser.id === id;
    });
}
app.get("/", (request, response) => {
    response.send(database);
})
app.post("/sign-in", (request, response) => {
    if (request.body.email === database.users[0].email) {
        if (request.body.password === database.users[0].password) {
            response.json("Success full login")
        } else {
            response.status(400).json("error logging in ")
        }
    }

    response.send("Signing")
})
app.post("/register", (request, response) => {
    let {firstName, lastName, email, dateOfBirth, password} = request.body;
    // salt rounds are the number of iteration done by bcrypt
    // it means bcrypt iterates 2^10 times i.e. 1024 times over the password stirng for the process called as key stretching
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (hash) {
                database.login.push({
                    id: "124334",
                    hash: hash,
                    email: email
                });
                database.users.push({
                    id: "124334",
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    password: password,
                    entries: 0,
                    joined: new Date(),
                    history: []
                });
            } else if (err) {
                response.json("Couldn't register user")
            }
        });
    });
    response.json(database.login[database.login.length-1]);
});
app.get('/profile/:id', (request, response) => {
    const {id} = request.params;
    const userData = searchByID(id);
    if (userData) {
        response.json(userData);
    } else {
        response.status(404).json("Ooops! user not found !");
    }
})
app.post("/image", (request, response) => {
    const {id, imageUrl, celebrityName, imageId} = request.body;
    const userData = searchByID(id);
    if (userData) {
        userData.history.push({
            imageUrl,
            celebrityName,
            imageId
        });
        userData.entries++;
        response.json("User history updated successfully");
    } else {
        response.status(404).json("invalid account")
    }
})
app.listen(3000, () => {
    console.log("App is running on port 3000")
})

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });
// // Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//     // res === false
// });
//
// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//     // res === true
// });
