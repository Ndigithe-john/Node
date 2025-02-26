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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (error) {
    console.log(error);
    throw new Error('There was an error');
  }
  return '2. Ready';
};

(async () => {
  try {
    console.log('1. Will get the dog pic');
    const x = await getDogPic();
    console.log(x);
    console.log('3. Done getting the dogs pic');
  } catch (error) {
    console.error(error.message);
  }
})();

// console.log('1: Will get dog pic');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3. Done getting dog pic');
//   })
//   .catch((err) => {
//     console.log('Error');
//   });

/*readFilePro(`${__dirname}/dog.txt`)
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
  });*/
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
