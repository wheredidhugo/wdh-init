const { homedir } = require("os"),
  path = require("path"),
  fs = require("fs");

var aliasName = "hugo-init";

if (process.env.SHELL === "/bin/zsh") {
  var shellFile = path.join(homedir() + "/.zshrc");
} else if (process.env.SHELL === "/bin/bash") {
  var shellFile = path.join(homedir() + "/.bashrc");
}

var alias = `alias ${aliasName}="node ${__filename}"`;

fs.readFile(shellFile, "utf-8", (err, data) => {
  if (err) return err;
  if (!data.includes(alias)) {
    fs.appendFile(shellFile, alias, (err) => {
      if (err) return err;
      console.log(`Successfully added ${aliasName} to ${shellFile}`);
    });
  }
});
