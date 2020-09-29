# Kahoot-Spam
An npm package for spamming kahoots 😏 

---
### Spam
```js
spam(pin, name, amout)
```
##### Example
```js
const KahootSpam = require('kahoot-spam')
let api = KahootSpam
api.spam(123456, 'Name', 10)
```
> *This WIll Spam The Kahoot 123456 10 Times With The Name 'Name'*
---
## Spam With Answers
###### Sleep Is If It Pauses Before It Will Answer A Question
```js
spamWithAnswers(pin, name, amout, sleep)
```
##### Example
```js
//With sleep
const KahootSpam = require('kahoot-spam')
let api = KahootSpam
api.spamWithAnswers(123456, "Name", 10, true)
```
> *This WIll Spam The Kahoot 123456 10 Times With The Name 'Name' With Answering The Questions With Sleep*
##
```js
//Without sleep
const KahootSpam = require('kahoot-spam')
let api = KahootSpam
api.spamWithAnswers(123456, "Name", 10, false)
```
> *This WIll Spam The Kahoot 123456 10 Times With The Name 'Name' With Answering The Questions Without Sleep*
---
## Repo Stats
##### You Should Star/Fork it 😃 Plz (Click The Picture)
[![Repo Stats](https://github-readme-stats.vercel.app/api/pin/?username=Mafia-boss-lvl-420&repo=Kahoot-Spam&theme=dark&show_icons=true)](https://github.com/Mafia-boss-lvl-420/Kahoot-Spam)