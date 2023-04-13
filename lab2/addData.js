import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";
export default async function addData(info) {
    try {
        const answers = await inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "What's your name?",
            },
            {
                type: "input",
                name: "surname",
                message: "What's your last name?",
            },
            {
                type: "input",
                name: "position",
                message: "What's your position?",
            },
            {
                type: "number",
                name: "age",
                message: "How old are you?"
            }
          ]);
          const data = {
            id: uuidv4(),
            name: answers.name,
            surname: answers.surname,
            position: answers.position,
            age: answers.age
          };
          info.push(data);
          if (fs.existsSync("db.json")) {
            createDetails(info);
          } else {
            fs.appendFile("db.json", "[]", (err) => {
              if (err) {
                console.log("Could not create db.json", err);
                return;
              }
              createDetails(info);
            });
          }
      
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  }
  async function createDetails(info) {
    await fs.writeFile("db.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Saved!");
    });
  }
  queryDB(addData);