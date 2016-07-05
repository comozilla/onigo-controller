import eventPublisher from "./publisher";
import Command from "./command";

let instance = null;

function Compiler(logElement) {
  if (instance !== null) {
    return instance;
  }
  this.logElement = logElement;
  eventPublisher.subscribe("saveMotion", (motion) => {
    try {
      let rawFunction = new Function("sequence", motion.motion.motionCode);
      // 1回目（テスト）
      rawFunction({
        command: function(commandName, args, time) {
          let errors = [];
          if (typeof commandName !== "string") {
            errors.push("コマンド名が正しくないところがあります。");
          }
          if (!Array.isArray(args)) {
            errors.push("コマンドの引数が正しくないところがあります。");
          }
          if (typeof time !== "number") {
            errors.push("時間が数値ではありません。");
          }

          if (errors.length > 0) {
            throw new Error(errors.join("\n"));
          }
        }
      });

      // 2回目（本番）
      let commands = [];
      rawFunction({
        command: function(commandName, args, time) {
          commands.push(new Command(commandName, args, time));
        }
      });
      eventPublisher.publish("compile", { motion, commands });
      this.log("コードのParseは正しく完了しました。", "success");
    } catch (e) {
      this.log(e.message, "error");
    }
  });
  instance = this;
}

Compiler.prototype.log = function(rawMessage, logType) {
  const logTypeChars = {
    "normal": ["", ""],
    "success": ["<span style=\"color: green;\">", "</span>"],
    "error": ["<span style=\"color: red;\">", "</span>"]
  }
  if (Object.keys(logTypeChars).indexOf(logType) === -1) {
    throw new Error("logTypeは正しくありません : " + logType);
  }
  let message = rawMessage
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");
  this.logElement.innerHTML +=
    logTypeChars[logType][0] + message + logTypeChars[logType][1] + "<br />";
};

export default Compiler;

