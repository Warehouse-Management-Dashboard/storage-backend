require("dotenv").config();
import express from "express";
import router from "./routes";
const cors = require("cors");


// try{
//     const createAdmins = () => {
//         admins.map(admin => {
//             bcrypt.hash(admin.password, 10, (err: any, hash: any) => {
//                 admin.password = hash
//                 db.Admin.create(admin).then(() => {console.log("It works")}).catch((e:any) => {console.error(e)})
//             })
//         })
//     }
//     createAdmins()
// }catch(e){
//     console.log("it broke")
// }

//I HAVE NO IDEA WHY IT WORKS I HAVE BEEN DOING THIS FOR THE PAST 10 HOURS AND IT JUST DECIDED TO FUCKING WORK AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});