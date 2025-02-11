const fs = require("fs");

// Blocking, syncronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `What is it that we know about the avocade? ${textIn}. \n created on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);

console.log("File written");

//  Non=blocking asyncronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return console.log(err.message);
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    if (err) return console.log(err.message);
    fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
      if (err) return console.log(err.message);
      fs.writeFile(
        "./txt/finalFile.txt",
        `${data2}\n ${data1}`,
        "utf-8",
        (err) => {
          console.log("Your file has been written 🎉");
          fs.readFile("./txt/finalFile.txt", "utf8", (err, data3) => {
            if (err) return console.log(err.message);
            fs.writeFile(
              "./txt/finalFinalFile.txt",
              `${data}\n${data1}\n${data2}\n${data3}`,
              "utf-8",
              (err) => {
                if (err) return console.log(err.message);
              }
            );
          });
        }
      );
    });
  });
});

console.log("after");
