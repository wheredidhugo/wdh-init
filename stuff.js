import path from "path";
import fs from "fs";

var year = new Date().getFullYear();

export var gitignore = `# Node.js
node_modules
package-lock.json
# Mac
.DS_Store
`;

export var gitignoreENV = `# Environnement variables
.env
.env.local
`;

export var README = `# ${path.basename(process.cwd())}
Description of the project
`;

export var indexENV = `require("dotenv").config();

console.log(process.env);
`;

export var MIT = `MIT License

Copyright (c) ${year} Hugo <wheredidhugo@proton.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

export var meowVariable = `
Usage
  $ wdh-init

Options
  --help, -h      Shows this menu.
  --env, -e       Doesn't prompt for env and automatically creates one.
  --yes, -y       Automatically accept warning, launch VSCode after initialization (but doesn't create an env file).
  --warning, -w   Automatically accept warning.
  --code, -c      Launch VSCode after initialization.

Example
  $ wdh-init
    ? WARNING: This tool will remove important files if your directory isn't empty.
    Are you sure to proceed? Yes
    ? Launch VSCode after initialization? No
    ? Do you need an env file? No
    ✔ Successfully initialized your project!
  $ wdh-init -y
    ⚠ Not creating an env file.
    ✔ Launched VSCode.
    ✔ Successfully initialized your project!
  $ wdh-init -y -e
    ✔ .env file created.
    ✔ Launched VSCode.
    ✔ Successfully initialized your project!
`;

export function write(file, data) {
  fs.writeFile(path.join(process.cwd() + `/${file}`), data, (err) => {
    if (err) return err;
  });
}

export function append(file, data) {
  fs.appendFile(path.join(process.cwd() + `/${file}`), data, (err) => {
    if (err) return err;
  });
}
