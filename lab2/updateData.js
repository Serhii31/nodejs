import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
        {
          type: "input",
          name: "recordID",
          message: "Enter Record ID",
        },
      ]);
      let current;

      info.forEach((element) => {
        if (element.id === answers.recordID) {
          current = element;
  
          updateDetails(current, info);
        }
      });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

async function updateDetails(current, info) {
    try {
        const feedbacks = await inquirer.prompt([
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
          current.name = feedbacks.name;
          current.surname = feedbacks.surname;
          current.position = feedbacks.position
          current.age = feedbacks.age;
          await fs.writeFile("db.json", JSON.stringify(info), function (err) {
            if (err) {
              console.log(err);
            }
            console.log("Updated");
          });  
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  }
  queryDB(updateData)