const express = require ('express');
let app = express ();

const jsonHelper = require ('./Services/jsonHelper');

let A = [] ;
let B = [] ;
let C = [] ;

getArray =  function (count) {
    for( let i = 1; i <= count; i++) 
        A.push (i);
};

getOutput = function () {
    console.log ( "A :", A);
    console.log ( "B :", B);
    console.log ( "C :", C);
    console.log ();    
}


getTower =  function (a, from, middle, to) {
    let el;
    if (a == 1) {
      getOutput ();
      el = from.pop ();
      to.push (el);
      return;
    }
    else {
      getTower (a - 1, from, to, middle);
      getOutput ();
      el = from.pop ();
      to.push (el);
      getTower (a - 1, middle, from, to);
    }
  };

app.get('/', function(req, res) {    
    const count = jsonHelper.getJsonData ();
    getArray (count);    
    getTower (count, A, B, C);    
    getOutput ();
    res.send("Hey! Look at the console! =)");    
});
    

 let server = app.listen(3000, function () {
      console.log ('Server is running!');
  });
 
