let Kahoot = require('kahoot.js-updated');
let settings = require('./settings.json');
let client = new Kahoot;
let NameGenerator = require('nodejs-randomnames');
let randomName = settings.randomName ? NameGenerator.randomName.getRandomName() : settings.bot_name + "-"+Math.round(Math.random()*1000);


let i;
for (i = 0; i < settings.amount; i++) {
  console.log("Joining kahoot...  ");
  client.join(settings.pin, randomName);
} 
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
