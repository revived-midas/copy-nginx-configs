const fs = require("fs");
const { exit } = require("process");
const originDomain = "origin-pragmaticplay.net";

(async () => {
    const newDomain = process.argv[2];
    if (!newDomain) {
        console.log("No domain input");
        exit();
    }

    let files = fs.readdirSync("./");
    let cnt = 1;

    for (const file of files) {
        if (!isNaN(Number(file.split("-")[0]))) {
            ++cnt;
        }
    }

    let newDir = "./" + cnt + "-" + newDomain;
    fs.mkdirSync(newDir);

    files = fs.readdirSync("./src");

    for (const file of files) {
        const content = fs.readFileSync("./src/" + file, 'utf-8');
        const newContent = content.replaceAll(originDomain, newDomain);
        const newFile = file.replace(originDomain, newDomain);

        fs.writeFileSync(newDir + "/" + newFile, newContent);
    }
})();