#!/usr/bin/env node

// Execute terminal commands
import { exec, execSync } from "child_process";

// Variables
import { gitignore, gitignoreENV, README, indexENV, MIT, meowVariable, write, append } from "./stuff.js";

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
      alias: "h"
    },
    env: {
      type: "boolean",
      alias: "e"
    },
    yes: {
      type: "boolean",
      alias: "y"
    },
    code: {
      type: "boolean",
      alias: "c"
    }
  },
});

var vscode;
if (cli.flags.yes || cli.flags.code) {
  vscode = true;
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
  if (!cli.flags.code) {
    await inquirer.prompt({
      name: "code",
      type: "confirm",
      message: "Launch VSCode after initialization?",
      default: true,
    })
    .then((answer) => {
      if (answer.code) vscode = true;
    });
  }
}

exec("git init");
exec("npm init -y");

write("README.md", README);
write("LICENSE", MIT);
write(".gitignore", gitignore);

function env() {
  exec("npm install dotenv");
  write("index.js", indexENV);
  exec("touch .env");
  append(".gitignore", gitignoreENV);
}

if (cli.flags.env) {
  env();
} else {
  await inquirer.prompt({
    name: "env",
    type: "confirm",
    message: "Do you need an env file?",
    default: false,
  })
  .then((answer) => {
    if (answer.env) {
      env();
    } else {
      exec("touch index.js");
    }
  });
}

if (vscode) {
  execSync("code .");
}

createSpinner()
  .start().success({text: chalk.cyanBright("Successfully initialized your project!")});
