'use strict';

const PORT = 8000;
const path = require('path');
const http = require('http');
const request = require('request');
const md5 = require('MD5');
const moment = require('moment');
const Typo = require('typo-js')
// const filter = require('filter');

let server = http.createServer(function(req, res){
  console.log("method: ",req.method);
  console.log("url: ",req.url);

  let [ , op, ...param] = req.url.split('/');
  // console.log("opration: ",op);
  // console.log("param: ",param);

  switch(op){
    case 'addition':
      let add = param.reduce( (sum,p) => sum+parseInt(p),0 );
      // console.log("add: ",add);
      res.write(`addition: ${add}`);
      res.end();
      break;
    case 'subtraction':
      let sub = param.reduce( (m,n) => parseInt(m) - parseInt(n));
      // console.log("sub: ",sub);
      res.write(`subtraction: ${sub}`);
      res.end();
      break;
    case 'multiplication':
      let mul = param.reduce( (m,n) => parseInt(m) * parseInt(n));
      // console.log("multiply: ",mul);
      res.write(`multiplication: ${mul}`);
      res.end();
      break;
    case 'division':
      let div = param.reduce( (m,n) => parseInt(m) / parseInt(n));
      // console.log("division: ",div);
      res.write(`division: ${div}`);
      res.end();
      break;
    case 'square':
      let squ = Math.pow(param,2);
      res.write(`${param} squared: ${squ}`);
      res.end();
      break;
    case 'cube':
      let cub = Math.pow(param,3);
      res.write(`${param} cubed: ${cub}`);
      res.end();
      break;
    case 'gravatar':
      let gra = md5(param);
      console.log("gra: ",gra);
      res.write(`gravatar is http://www.gravatar.com/avatar/${gra}`);
      res.end();
      break;
    case 'analyzer':
      console.log("param: ",param[0]);
      let encur = decodeURI(param[0]);
      console.log("encur: ",encur);
      var word = encur.split(/[^a-zA-Z]/ig).filter(n=>{
        if(n==='') return false;
        else return true;
      });
      // console.log("word: ",word);
      let wordCount = word.length;
      let letter =  word.join('').length;
      res.write(`decodeuri: ${encur}\nword count: ${wordCount}\ncharacter count: ${letter}\navg: ${(letter/wordCount).toFixed(2)}`);
      res.end();
      break;
    case 'age':
      console.log("param: ",param[0]);
      let age = moment(param[0], "YYYYMMDD").fromNow();
      res.write(`age: ${age}`);
      res.end();
      break;
    case 'magic8':
      let arr = ['YES', 'NO', 'MAYBE'];
      let ans = Math.floor(Math.random()*3);
      res.write(`${decodeURI(param[0])} : ${arr[ans]}`);
      res.end();
      break;
    case 'areaofrectangle':
      let rec = param[0]*param[1];
      res.write(`Area of a rectangle (length: ${param[0]}, width: ${param[1]}) is ${rec}`);
      res.end();
      break;
    case 'areaoftriangle':
      let tri = 1/2*param[0]*param[1];
      res.write(`Area of a triangle (base: ${param[0]}, height: ${param[1]}) is ${tri}`);
      res.end();
      break;
    case 'sqrt':
      let sq = Math.sqrt(param);
      res.write(`Square root of ${param} if ${sq}`);
      res.end();
      break;
    case 'factorial':
      let fac = factorial(parseInt(param));
      res.write(`factorial of ${param} is ${fac}`);
      res.end();
      break;
    case 'cbrt':
      let cb = Math.cbrt(param);
      res.write(`Cube root of ${param} if ${cb}`);
      res.end();
      break;
    case 'volumeofpyramid':
      let volpyr = 1/3 *param[0]*param[1];
      res.write(`Volume of a pyramid (base:${param[0]},height: ${param[1]}) is ${volpyr.toFixed(2)}`);
      res.end();
      break;
    case 'volumeofsphere':
      let volsph = Math.PI * 4/3 *Math.pow(param[0],3);
      res.write(`Volume of a sphere (radius:${param}) is ${volsph.toFixed(2)}`);
      res.end();
      break;
    case 'spellchecker':
      let dictionary = new Typo('en_US');
      let is_correctly = dictionary.check(param[0]);
      // console.log("is_correctly",is_correctly);
      let array_suggestions = dictionary.suggest(param[0]);
      // console.log("array_suggestions",array_suggestions);
      res.write(`${param} is ${is_correctly}\nsuggestion: ${array_suggestions}`);
    // case 'filterbadword':
    //   console.log(filter.clean('badass your mother f'));
    default:
    res.end();
  }


});

function factorial(param){
  if(param===0) return 1;
  else return param*factorial(param-1);

}

server.listen(PORT, err => {
  console.log(`Server listening on ${PORT}`);
});
