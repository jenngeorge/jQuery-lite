const DomNodeCollection = require('./dom_node_collection.js');


window.$l = function(arg) {
  let funcArr = [];
  document.addEventListener("DOMContentLoaded", event => {
    funcArr.forEach(func => {
      console.log('im ready');
      func();
    });
  });

  if(arg instanceof Function){
    if(document.readyState === 'complete'){
      console.log('was already ready');
      arg();
    }else{
      funcArr.push(arg);
    }
  }
  else if (arg instanceof Object ){
    return new DomNodeCollection(arg);
  }
  else if (arg instanceof String){
    let arr = Array.from(document.querySelectorAll(arg));
    return new DomNodeCollection(arr);
  }
}; // class end

$l.extend =function(...args){
  let obj = {};
  args.forEach (arg=> {
    obj = Object.assign(obj, arg);
  });
  return obj;
};

$l.ajax = function(obj){
  let defaults= {
    url: "http://appacademy.io",
    type: "GET",
    contentType: "JSON",
    data: "",
    success(data) {
      alert(`you got a response!`);
    },
    error(){
      console.error("An error occured.");
    },
  };

  const req = $l.extend(defaults, obj);
  const xhr = new XMLHttpRequest();
  xhr.open(req.type, req.url);
  xhr.onload = function () {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };
  xhr.send(req.data);
};

let body = document.querySelectorAll('body');
console.log();


let allLi = document.querySelectorAll('li');
// console.log(allLi);

const objA = {a: 'a', b: 'a', c: 'a'};
const objB = {b: 'b', c: 'b'};
const objC = {c: 'c'};

const newL = $l.extend(objA, objB, objC);
// console.log(newL);
