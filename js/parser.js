import eventPublisher from "./publisher";
import Command from "./command";
import MotionSpecialData from "./motion-special-data";

const commandArgs = {
  roll: ["number", "number"],
  rotate: ["number"],
  stop: [],
  dash: ["number", "number"]
};

// motionSpecialData を使用できる関数
const availableFunctionArgs = {
  randomRange: ["number", "number"],
  randomInArray: ["object"]
};

let instance = null;

function Parser(logElement) {
  if (instance !== null) {
    return instance;
  }
  this.logElement = logElement;
  eventPublisher.subscribe("saveMotion", motion => {
    this.clear();
    const commands = [];
    const errors = [];
    const rawFunctionArgList = [Object.keys(commandArgs), Object.keys(availableFunctionArgs), motion.motion.motionCode].reduce((a, b) => {
      return a.concat(b);
    });
    const rawFunctionArgs = Object.keys(commandArgs).map(commandName => {
      return function() {
        const validateResult = validateArgumentsType(arguments, commandArgs[commandName], true);
        validateResult.errors.forEach(error => {
          errors.push(error + " at " + commandName + "()");
        });
        if (commandArgs[commandName].length >= arguments.length) {
          errors.push(`時間を指定してください。 at ${commandName}()`);
        } else {
          const time = arguments[commandArgs[commandName].length];
          if (typeof time !== "number") {
            errors.push(`時間が数値ではありません。 at ${commandName}()`);
          } else if (time < 0.5) {
            errors.push(`時間は0.5以上を使用してください。 at ${commandName}()`);
          }
          commands.push(new Command(commandName, validateResult.arrayArgs, time));
        }
      }.bind(this);
    }).concat(Object.keys(availableFunctionArgs).map(functionName => {
      return function() {
        const validateResult = validateArgumentsType(arguments, availableFunctionArgs[functionName], false);
        validateResult.errors.forEach(error => {
          errors.push(error + " at " + functionName + "()");
        });
        return new MotionSpecialData(functionName, validateResult.arrayArgs);
      }.bind(this);
    }));
    try {
      const rawFunction = Function.apply(window, rawFunctionArgList);
      rawFunction.apply(window, rawFunctionArgs);
    } catch (error) {
      // SyntaxError、ReferenceErrorなどが入ってくる
      errors.push(error.message);
    }
    if (errors.length > 0) {
      this.log(errors.join("\n"), "error");
    } else {
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

function validateArgumentsType(args, types, isAcceptSpecialData) {
  const errors = [];
  const arrayArgs = [];
  types.forEach((type, index) => {
    if (index >= args.length) {
      errors.push(`${index + 1}番目の引数が指定されていません。`);
    } else if (typeof args[index] !== type && !(isAcceptSpecialData && args[index] instanceof MotionSpecialData)) {
      errors.push(`${index + 1}番目の引数の型は${type}ですが、${typeof args[index]}が指定されています。`);
    } else {
      arrayArgs.push(args[index]);
    }
  });
  return {
    errors,
    arrayArgs
  };
}

export default Parser;

