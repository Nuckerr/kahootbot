var Kahoot = require('kahoot.js-updated');
var settings = require('./settings.json');
var pin = settings.pin;
var client = new Kahoot;
var randomName = settings.bot_name + "-"+Math.round(Math.random() *1000);

var randomnumber = Math.round(Math.random() * 3);

console.log("Joining kahoot...  ");
client.join(pin, randomName);
client.on("joined", () => {
    console.log("I joined the Kahoot!");
});
client.on("questionStart", question => {
    console.log("A new question has started, answering the first answer.");
    question.answer(randomnumber);
    randomnumber = Math.floor(Math.random() * 3);
});
client.on("quizEnd", () => {
    console.log("The quiz has ended.");
});