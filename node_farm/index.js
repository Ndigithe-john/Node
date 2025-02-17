const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

//////////////////////////////////////////////// FILES
// Blocking, syncronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `What is it that we know about the avocade? ${textIn}. \n created on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written");

//  Non=blocking asyncronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.log(err.message);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     if (err) return console.log(err.message);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
//       if (err) return console.log(err.message);
//       fs.writeFile(
//         "./txt/finalFile.txt",
//         `${data2}\n ${data1}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written 🎉");
//           fs.readFile("./txt/finalFile.txt", "utf8", (err, data3) => {
//             if (err) return console.log(err.message);
//             fs.writeFile(
//               "./txt/finalFinalFile.txt",
//               `${data}\n${data1}\n${data2}\n${data3}`,
//               "utf-8",
//               (err) => {
//                 if (err) return console.log(err.message);
//               }
//             );
//           });
//         }
//       );
//     });
//   });
// });

// console.log("after");

///////////////////////////////////////   SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  // const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardHtml = productData
      .map((prod) => replaceTemplate(tempCard, prod))
      .join("");
    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardHtml);
    res.end(output);

    // Product Page
  } else if (pathName === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = productData[query.id];
    const productHtml = replaceTemplate(tempProduct, product);
    res.end(productHtml);

    //  API
  } else if (pathName === "/api/v1") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // res.end("API");

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>This page could not be found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
