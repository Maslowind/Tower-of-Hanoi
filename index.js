const express = require('express');
let app = express();

const jsonHelper = require('./Services/jsonHelper');

let A = [];
let B = [];
let C = [];

prepareDataset = function (count) {
  for (let i = 1; i <= count; i++)
    A.push(i);
  A.reverse();
  B = [];
  C = [];
};

printAll = function () {
  console.log("A :", A);
  console.log("B :", B);
  console.log("C :", C);
  console.log();
}


towerWithPushPop = function (a, from, middle, to) {
  let el;
  if (a == 1) {
    el = from.pop();
    to.push(el);
    return;
  }
  else {
    towerWithPushPop(a - 1, from, to, middle);
    el = from.pop();
    to.push(el);
    towerWithPushPop(a - 1, middle, from, to);
  }
};

towerWithSplice = function (a, from, middle, to) {
  let el;
  if (a == 1) {
    el = from.splice(from.length - 1, 1)
    to.concat(el);
    to.splice(to.length, 0, el[0])
    return;
  }
  else {
    towerWithSplice(a - 1, from, to, middle);
    el = from.splice(from.length - 1, 1)
    to.splice(to.length, 0, el[0])
    towerWithSplice(a - 1, middle, from, to);
  }
};

app.get('/', function (req, res) {
  const count = jsonHelper.getJsonData();

  for (let i = 0; i < 25; i++) {
    prepareDataset(count);
    const startWithPushPop = new Date().getTime();
    towerWithPushPop(count, A, B, C);
    const endWithPushPop = new Date().getTime();
    console.log('With PushPop:', endWithPushPop - startWithPushPop, 'ms');

    prepareDataset(count);
    const startWithSplice = new Date().getTime();
    towerWithSplice(count, A, B, C);
    const endWithSplice = new Date().getTime();
    console.log('With Splice:', endWithSplice - startWithSplice, 'ms');
  }

  res.send("Hey! Look at the console! =)");
});


let server = app.listen(3000, function () {
  console.log('Server is running!');
});

