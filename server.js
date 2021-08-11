const inquirer = require("inquirer");
const db = require("./db");

const start = () => {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "list",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID", "EXIT"],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "POST") {
        postAuction();
      } else if (answer.postOrBid === "BID") {
        bidAuction();
      } else {
        connection.end();
      }
    });
};