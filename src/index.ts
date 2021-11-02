import inquirer from "inquirer";
import shell from "shelljs";

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Which component would you like to start",
        choices: ["API", "Scraper", "Simulator", "Mongo", "MQTT"],
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.start);

      switch (answers.start) {
        case "API":
          shell.cd("../api");
          shell.exec("yarn up");
          break;

        case "Simulator":
          shell.cd("../simulator");
          shell.exec("yarn up");
          break;

        case "Scraper":
          shell.cd("../scraper");
          shell.exec("yarn up");
          break;

        case "MQTT":
          shell.cd("docker/mqtt");
          shell.exec("clear && docker compose up -d ");
          break;

        case "Mongo":
          shell.cd("docker/mongo");
          shell.exec("clear && docker compose up -d ");
          console.log("start mqtt stuff");
          break;
      }
    });
}

function stop() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "stop",
        message: "Which component would you like to stop",
        choices: ["API", "Scraper", "Simulator", "Mongo", "MQTT"],
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.stop);

      switch (answers.stop) {
        case "API":
          shell.cd("../api");
          shell.exec("yarn down");
          break;

        case "Simulator":
          shell.cd("../simulator");
          shell.exec("yarn down");
          break;

        case "Scraper":
          shell.cd("../scraper");
          shell.exec("yarn down");
          break;

        case "MQTT":
          shell.cd("docker/mqtt");
          shell.exec("clear && docker compose down");
          break;

        case "Mongo":
          shell.cd("docker/mongo");
          shell.exec("clear && docker compose down");
          console.log("start mqtt stuff");
          break;
      }
    });
}

inquirer
  .prompt([
    {
      type: "list",
      name: "selection",
      message: "What do you want to do",
      choices: ["Start stuff", "Stop stuff"],
    },
  ])
  .then((answers) => {
    console.info("Answer:", answers.selection);
    if (answers.selection === "Start stuff") {
      start();
      console.log("here");
    } else if (answers.selection === "Stop stuff") {
      stop();
      console.log("here");
    }
  });
