const makeField = (n, m, k) => {
  const makeMines = (n, m, k) => {
    const mines = [];
    const getRandomCoord = (max) => Math.floor(1 + Math.random() * max);
    if (k < m * n) {
      for (let i = 0; i < k; i++) {
        let mine = [getRandomCoord(n), getRandomCoord(m)];
        while (JSON.stringify(mines).includes(JSON.stringify(mine))) {
          mine = [getRandomCoord(n), getRandomCoord(m)];
        }
        mines.push(mine);
      }
    } else {
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          mines.push([i, j]);
        }
      }
    }
    console.log(mines);
    return mines;
  };

  const mines = makeMines(n, m, k);

  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  const field = Array(n + 2).fill().map(() => Array(m + 2).fill(0));

  for (let i = 0; i < mines.length; i++) {
    for (let k = 0; k < dx.length; k++) {
      field[mines[i][0] + dx[k]][mines[i][1] + dy[k]] += 1;
    }
  }

  for (let i = 0; i < mines.length; i++) {
    field[mines[i][0]][mines[i][1]] = '*';
  }
  return field;
};

export default makeField;
