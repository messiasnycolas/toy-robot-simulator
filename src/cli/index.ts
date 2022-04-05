import readline from 'readline';
import { Robot } from '../core/robot.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.question(
  `Greetings. Welcome to the Toy Robot Simulator!\nFirst, let me know your name:\n`,
  (name: string) => {
    console.log(`\nNice to meet you, ${name}.\nLet's begin. Try placing the robot.`);
    start();
  });

const robot = new Robot();

function start() {
  rl.question(`type a command:\n> `, (input: string) => {
    let output: string;
    const [command, params] = input.split(' ');

    switch (command) {
      case 'PLACE':
        output = robot.place(params);
        break;
      case 'MOVE':
        output = robot.move();
        break;
      case 'LEFT':
        output = robot.left();
        break;
      case 'RIGHT':
        output = robot.right();
        break;
      case 'REPORT':
        output = robot.report();
        break;
      default:
        output = '[!] invalid command';
        break;
    }
    if (output) console.log(`- ${output}`);
    start();
  });
}
