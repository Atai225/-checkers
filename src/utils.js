export const QueensWay = (from, to) => {
  if (
    (from.x === to.x - 1 && from.y === to.y + 1) ||
    (from.x === to.x + 1 && from.y === to.y - 1) ||
    (from.x === to.x - 1 && from.y === to.y - 1) ||
    (from.x === to.x + 1 && from.y === to.y + 1) ||
    (from.x === to.x - 2 && from.y === to.y + 2) ||
    (from.x === to.x + 2 && from.y === to.y - 2) ||
    (from.x === to.x - 2 && from.y === to.y - 2) ||
    (from.x === to.x + 2 && from.y === to.y + 2) ||
    (from.x === to.x + 3 && from.y === to.y + 3) ||
    (from.x === to.x - 3 && from.y === to.y + 3) ||
    (from.x === to.x - 3 && from.y === to.y - 3) ||
    (from.x === to.x + 3 && from.y === to.y - 3) ||
    (from.x === to.x + 4 && from.y === to.y + 4) ||
    (from.x === to.x - 4 && from.y === to.y + 4) ||
    (from.x === to.x - 4 && from.y === to.y - 4) ||
    (from.x === to.x + 4 && from.y === to.y - 4) ||
    (from.x === to.x - 5 && from.y === to.y + 5) ||
    (from.x === to.x + 5 && from.y === to.y + 5) ||
    (from.x === to.x + 5 && from.y === to.y - 5) ||
    (from.x === to.x - 5 && from.y === to.y - 5) ||
    (from.x === to.x + 6 && from.y === to.y + 6) ||
    (from.x === to.x - 6 && from.y === to.y - 6) ||
    (from.x === to.x - 6 && from.y === to.y + 6) ||
    (from.x === to.x + 6 && from.y === to.y - 6) ||
    (from.x === to.x - 7 && from.y === to.y + 7) ||
    (from.x === to.x - 7 && from.y === to.y - 7) ||
    (from.x === to.x + 7 && from.y === to.y + 7) ||
    (from.x === to.x + 7 && from.y === to.y - 7) ||
    (from.x === to.x - 8 && from.y === to.y + 8) ||
    (from.x === to.x - 8 && from.y === to.y - 8) ||
    (from.x === to.x + 8 && from.y === to.y + 8) ||
    (from.x === to.x + 8 && from.y === to.y - 8)
  ) {
    return true;
  }
  return false;
};

export const canQueenEat = (from, to) => {
  let moveDirection = "";
  let counter = 0;

  for (let i = 1; i < 8; i++) {
    if (moveDirection) break;
    counter += 1;
    switch (true) {
      case from.x === to.x - i && from.y === to.y + i:
        moveDirection = "ld";
        break;
      case from.x === to.x + i && from.y === to.y + i:
        moveDirection = "rd";
        break;
      case from.x === to.x - i && from.y === to.y - i:
        moveDirection = "lt";
        break;
      case from.x === to.x + i && from.y === to.y - i:
        moveDirection = "rt";
        break;
      default:
        break;
    }
  }

    
  let array = [];
  for (let i = 1; i < counter; i++) {
    if (moveDirection === "ld") {
      array.push({ x: to.x - i, y: to.y + i });
    }
    if (moveDirection === "rd") {
      array.push({ x: to.x + i, y: to.y + i });
    }
    if (moveDirection === "lt") {
      array.push({ x: to.x - i, y: to.y - i });
    }
    if (moveDirection === "rt") {
      array.push({ x: to.x + i, y: to.y - i});
    }
  } 
  return array;

};



export const canCheckerEat = (from, to, item) => {
  const element = getChoppedCheckers(from, to, item);
  for (let i = 0; i < element.length; i++) {
    if (from.x === to.x - 2 && from.y === to.y - 2 && element[i].checkerColor !== 'none') {
      return true;
    } else if (from.x === to.x + 2 && from.y === to.y + 2 && element[i].checkerColor !== 'none') {
      return true;
    } else if (from.x === to.x + 2 && from.y === to.y - 2 && element[i].checkerColor !== 'none') {
      return true;
    } else if (from.x === to.x - 2 && from.y === to.y + 2 && element[i].checkerColor !== 'none') {
      return true;
    }
    return false;
  }
};

export const getChoppedCheckers = (from, to, item) => {
  let array = [];
  let element;
  if (from.x === to.x - 2 && from.y === to.y - 2) {
   element = item.find(item => item.x === to.x - 1 && item.y === to.y - 1);
  } else if (from.x === to.x + 2 && from.y === to.y + 2) {
     element = item.find(item => item.x === to.x + 1 && item.y === to.y + 1);
    
  } else if (from.x === to.x + 2 && from.y === to.y - 2) {
     element = item.find(item => item.x === to.x + 1 && item.y === to.y - 1);
   
  } else if (from.x === to.x - 2 && from.y === to.y + 2) {
     element = item.find(item => item.x === to.x - 1 && item.y === to.y + 1);
  }
  if(element !== undefined){
    array.push(element)
  }
  return array;
};

export const whiteCheckersWay = (from, to) => {
  if (
    (from.x === to.x - 1 && from.y === to.y + 1) ||
    (from.x === to.x + 1 && from.y === to.y + 1)
  ) {
    return true;
  }
  return false;
};

export const blackCheckersWay = (from, to) => {
  if (
    (from.x === to.x - 1 && from.y === to.y - 1) ||
    (from.x === to.x + 1 && from.y === to.y - 1)
  ) {
    return true;
  }
  return false;
};


