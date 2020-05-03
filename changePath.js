const glob = require("glob");
const fs = require("fs");
const readline = require("readline");
const execSync = require("child_process").execSync;

glob("./*.md", function (er, files) {
  files.forEach((file) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    });
    let content = "";

    rl.on("line", (line) => {
      if (
        line.match("/Users/pj/Library/Application Support/typora-user-images")
      ) {
        const imagePath = line.replace(/^.+\(/, "").replace(/\).+$/, "");
        const mvToPath = imagePath.replace(
          "/Users/pj/Library/Application Support/typora-user-images",
          "/Users/pj/Desktop/yasi1/assets"
        );
        execSync(`cp "${imagePath}" ${mvToPath}`);
        line = line.replace(
          "/Users/pj/Library/Application Support/typora-user-images",
          "/Users/pj/Desktop/yasi1/assets"
        );
      }
      content += line + "\n";
    });
    rl.on("close", () => {
      fs.writeFileSync(file, content, { flag: "w" });
    });
  });
});
