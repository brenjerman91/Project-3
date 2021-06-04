/*
CIT Project 3
Name: Benjamin Jensen 
*/

//imports
const http = require("http");
const fs = require('fs');
const fastify = require("fastify")({
  logger: false
});

const { cointCount, coins } = require(`./p3-module.js`);
//const { exit } = require("node:process");

//html Pathing
fastify.get("/", (request, reply) => {
  let filelocationOfHomePage = __dirname + "/index.html";
  fs.readFile(filelocationOfHomePage,
    (err, data) => {
      if (err) {
        console.log("Error");
        reply
          .code(500)
          .header("Content-Type", "text/html; charset=utf-8")
          .send("Error!");
      } else {
        reply
          .code(200)
          .header("Content-Type", "text/html; charset=utf-8")
          .send(data);
      }
    });

  //Part 9 and 10 created some kind of error that I could not figure out 
  //unfortunately had to submit it as it is 
  
  //Part 9
  fastify.get("/coin", (request, reply) => {
    const { denom = 0, count = 0 } = request.query;
    let coinValue = coinCount({ denom, count });
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
      );
  });
  
  //Part 10
  fastify.get("/coins", (request, reply) => {
    const { option } = request.query;
    const coins = [
      { denom: 25, count: 2 },
      { denom: 1, count: 7 },
    ];
    let coinValue;
    switch (option) {
      case "1":
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case "2":
        coinValue = coinCount(...coins);
        break;
      case "3":
        coinValue = coinCount(coins);
    };
    reply
      .code(200)
      .header("Content-Type", "text/html")
      .send(
        `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
      );
      
  });
  
  
});

//Fastify
const listenIP = "localhost";
const listenPort = 8080;

fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});