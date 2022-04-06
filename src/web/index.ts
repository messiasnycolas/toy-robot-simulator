import { Robot } from '../core/robot.js'

const robot = new Robot();
document.querySelector('button').addEventListener('click', handleExecute);
document.querySelector('#command-select').addEventListener('change', handleSelect);

function handleExecute() {
  const command = document.querySelector<HTMLSelectElement>('#command-select').value;
  switch (command) {
    case 'PLACE':
      robot.place(getParams());
      updatePosition(robot.report());
      break;
    case 'MOVE':
      robot.move();
      updatePosition(robot.report());
      break;
    case 'LEFT':
      robot.left();
      updatePosition(robot.report());
      break;
    case 'RIGHT':
      robot.right();
      updatePosition(robot.report());
      break;
  }
}

function handleSelect() {
  const command = document.querySelector<HTMLSelectElement>('#command-select').value;
  const placeSelectContainer = document.querySelectorAll<HTMLSelectElement>('#place-select-container label');
  for (const select of placeSelectContainer) {
    command === 'PLACE'
      ? select.style.display = 'block'
      : select.style.display = 'none';
  }
}

function getParams() {
  const paramsArray: string[] = [];
  paramsArray.push(document.querySelector<HTMLSelectElement>('#x-axis-select').value);
  paramsArray.push(document.querySelector<HTMLSelectElement>('#y-axis-select').value);
  paramsArray.push(document.querySelector<HTMLSelectElement>('#direction-select').value);

  return paramsArray.join(',');
}

function updatePosition(report: string) {
  enum rotation {
    'NORTH' = '-90deg',
    'EAST' = '0deg',
    'SOUTH' = '90deg',
    'WEST' = '180deg'
  }

  const [x, y, direction] = report.split(',');
  if (x === null || y === null || direction === null) return;

  const HTMLrobot = document.querySelector<HTMLElement>('#robot');
  HTMLrobot.style.display = 'block';

  document.querySelector<HTMLElement>(`table tr:nth-child(${Number(x) + 1}) td:nth-child(${Number(y) + 1})`)
    .appendChild(HTMLrobot);

  switch (direction) {
    case 'NORTH': HTMLrobot.style.transform = `rotate(${rotation.NORTH})`;
      break;
    case 'EAST': HTMLrobot.style.transform = `rotate(${rotation.EAST})`;
      break;
    case 'SOUTH': HTMLrobot.style.transform = `rotate(${rotation.SOUTH})`;
      break;
    case 'WEST': HTMLrobot.style.transform = `rotate(${rotation.WEST})`;
      break;
  }
}