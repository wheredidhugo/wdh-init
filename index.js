#!/usr/bin/env node

// Node.js modules
import { exec } from "child_process";
import path from "path";
import fs from "fs";

// Variables
import { gitignore, README, indexENV, MIT, meowVariable } from "./texts.js";

// Styling modules
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

// CLI
import meow from "meow";
const cli = meow(meowVariable, {
  importMeta: import.meta,
  flags: {
    help: {
      alias: "h",
    },
    env: {
      type: "boolean",
      alias: "e",
    },
    yes: {
      type: "boolean",
      alias: "y",
    },
  },
});

function write(file, data) {
  fs.writeFile(path.join(process.cwd() + `/${file}`), data, (err) => {
    if (err) return err;
  });
}

if (!cli.flags.yes) {
  await inquirer.prompt({
      name: "danger",
      type: "confirm",
      message:
        "WARNING: This tool will remove important files if your directory isn't empty. Are you sure to proceed?",
      default: false,
    })
    .then((answer) => {
      if (!answer.danger) process.exit(1);
    });
}

if (cli.flags.env) {
  exec("npm install dotenv");
  write("index.js", indexENV);
  exec("touch .env");
} else {
  await inquirer.prompt({
      name: "env",
      type: "confirm",
      message: "Do you need an env file?",
      default: false,
    })
    .then((answer) => {
      if (answer.env) {
        exec("npm install dotenv");
        write("index.js", indexENV);
        exec("touch .env");
      } else {
        exec("touch index.js");
      }
    });
}

exec("git init");
exec("npm init -y");

write(".gitignore", gitignore);
write("README.md", README);
write("LICENSE", MIT);

createSpinner()
  .start()
  .success({text: chalk.cyanBright("Successfully initialized your project!")});
