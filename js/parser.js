import eventPublisher from "./publisher";
import Command from "./command";

const commandArgs = {
  roll: ["number", "number"]
};

let instance = null;

function Parser(logElement) {
  if (instance !== null) {
    return instance;
  }
  this.logElement = logElement;
  eventPublisher.subscribe("saveMotion", motion => {
    this.clear();
    const rawFunction = Function.apply(window, [Object.keys(commandArgs), motion.motion.motionCode].reduce((a, b) => {
      return a.concat(b);
    }));
    const commands = [];
    let isError = false;
    rawFunction.apply(window, Object.keys(commandArgs).map(commandName => {
      return function() {
        const args = [];
        commandArgs[commandName].forEach((argType, index) => {
          if (index >= arguments.length) {
            this.log(`${index}番目の引数が指定されていません。 at ${commandName}()`, "error");
            isError = true;
          } else if (typeof arguments[index] !== argType) {
            this.log(`${index}番目の引数の型は${argType}ですが、${typeof arguments[index]}が指定されています。 at ${commandName}()`, "error");
            isError = true;
          } else {
            args.push(arguments[index]);
          }
        });
        if (commandArgs[commandName].length >= arguments.length) {
          this.log(`時間を指定してください。 at ${commandName}()`, "error");
          isError = true;
        } else {
          const time = arguments[commandArgs[commandName].length];
          if (typeof time !== "number") {
            this.log(`時間が数値ではありません。 at ${commandName}()`, "error");
            isError = true;
          }
          if (!isError) {
            commands.push(new Command(commandName, args, time));
          }
        }
      }.bind(this);
    }));
    if (!isError) {
      eventPublisher.publish("compile", { motion, commands });
      this.log("コードのParseは正しく完了しました。", "success");
    }
  });
  instance = this;
}

Parser.prototype.log = function(rawMessage, logType) {
  const logTypeChars = {
    "normal": ["", ""],
    "success": ["<span style=\"color: green;\">", "</span>"],
    "error": ["<span style=\"color: red;\">", "</span>"]
  }
  if (Object.keys(logTypeChars).indexOf(logType) === -1) {
    throw new Error("logTypeは正しくありません : " + logType);
  }
  const message = rawMessage
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");
  this.logElement.innerHTML +=
    logTypeChars[logType][0] + message + logTypeChars[logType][1] + "<br />";
};

Parser.prototype.clear = function() {
  this.logElement.innerHTML = "";
};

export default Parser;

