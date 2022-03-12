import express, {request, response} from "express";
import bodyParser from "body-parser";

const app = express();
// middle ware
app.use(bodyParser.json())
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
    ]
}
app.get("/", (request, response) => {
    response.send(database.users);
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
    database.users.push({
        id: "124334",
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateOfBirth: "Sat Mar 12 2002 08:42:24 GMT+0500 (Pakistan Standard Time)",
        password: password,
        entries: 0,
        joined: new Date(),
        history: []
    });
    response.json(database.users[database.users.length - 1]);
});
app.get('/profile/:id', (request, response) => {
    const {id} = request.params;
    const userData = database.users.find((currentUser) => {
        return currentUser.id===id;
    });
    if(userData) {
        response.json(userData);
    }else{
        response.status(404).json("Ooops! user not found !");
    }
})
app.listen(2000, () => {
    console.log("App is running on port 3000")
})

/*
/ -> THis is working
/sign-in ...> POST success / fail
/register ...> POST = new user
/profile/:userId ...> GET = user
/image ...> PUT ...> user
*/
