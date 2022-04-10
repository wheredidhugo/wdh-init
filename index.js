const exec = require("child_process").exec,
  path = require("path"),
  fs = require("fs"),
  readline = require("readline"),
  { gitignore, README, indexENV, MIT } = require("./texts.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

exec("git init");
exec("npm init -y");

fs.writeFile(path.join(process.cwd() + `/.gitignore`), gitignore, (err) => {
  if (err) return err;
});

fs.writeFile(path.join(process.cwd() + `/README.md`), README, (err) => {
  if (err) return err;
});

rl.question("Do you need a .env file? (y/n) ", (answer) => {
  if (answer === "y") {
    exec("npm install dotenv");
    fs.writeFile(path.join(process.cwd() + `/index.js`), indexENV, (err) => {
      if (err) return err;
    });
  } else if (answer === "n") {
    exec("touch index.js");
  }
  rl.close();
});

fs.writeFile(path.join(process.cwd() + `/LICENSE`), MIT, (err) => {
  if (err) return err;
});

console.log("Initialized your project!")
