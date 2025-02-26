const fs = require('fs');
const superAgent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Couldn't Find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject('Could not write the file');
      resolve('Success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    writeFilePro('dog-img.txt', res.body.message);
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   if (err) return console.log(err.message);
    //   console.log('A random dog image url saved to file');
    // });
  })
  .then(() => {
    console.log('Random dog image url added to my file');
  })
  .catch((err) => {
    console.log(err.message);
  });
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superAgent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('A random dog image url saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
