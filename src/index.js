const player1 = {
  name: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  name: "Browser",
  velocidade: 5,
  manobrabilidade: 2,
  poder: 5,
  pontos: 0,
};

//Use-cases

async function rollDice() {
  //"Joga" os dados e retornar um número entre 1 e 6
  var min = Math.ceil(1);
  var max = Math.floor(6);

  const numberDice = Math.floor(Math.random() * (max - min) + min);

  return numberDice;
}

function getRandomBlock() {
  //Retorna um tipo de bloco aleatório
  const blocks = ["CURVA", "CONFRONTO", "MOBILIDADE"];

  return blocks[Math.floor(Math.random() * blocks.length)];
}

function sumPoint(player) {
  //Soma pontos para o vencedor
  player.pontos++;
}

function removePoint(player) {
  //Remove pontos para o perdedor
  if (player.pontos) player.pontos--;
}

const pistCondition = async (pistBlock) => {
  //Cria uma jogada referente a condição da pista
  let ResultRollDicePlayer1 = await rollDice();
  let ResultRollDicePlayer2 = await rollDice();

  totalPointRoundPlayer1 = player1.manobrabilidade + ResultRollDicePlayer1;
  totalPointRoundPlayer2 = player2.manobrabilidade + ResultRollDicePlayer2;

  console.log(
    `${player1.name} tirou ${ResultRollDicePlayer1} no dado: ${ResultRollDicePlayer1} + ${player1.poder} = ${totalPointRoundPlayer1}`
  );
  console.log(
    `${player2.name} tirou ${ResultRollDicePlayer2} no dado: ${ResultRollDicePlayer2} + ${player2.poder} = ${totalPointRoundPlayer2}`
  );

  let winer =
    totalPointRoundPlayer1 > totalPointRoundPlayer2 ? player1 : player2;

  if (pistBlock === "CONFRONTO") {
    let loser =
      totalPointRoundPlayer1 > totalPointRoundPlayer2 ? player2 : player1;
    removePoint(loser);
  } else {
    sumPoint(winer);
  }

  return winer;
};

const playNewRound = async (pistBlock) => {
  const winerRound = await pistCondition(pistBlock);

  console.log(`Vencedor da rodada ${winerRound.name}`);
};

async function playRaceEngine(player1, player2) {
  for (round = 1; round <= 5; round++) {
    const pistBlock = getRandomBlock();

    console.log(`\n-_-_-_-_-_-_-_-_-_-_-_-_-\n`);

    console.log(`Inicinou round ${round}:`);
    console.log(`Tipo de pista: ${pistBlock}`);

    await playNewRound(pistBlock);
  }

  console.log(`\n-_-_-_-_-_-_-_-_-_-_-_-_-\n`);

  player1.pontos === player2.pontos
    ? console.log(`Houve um empate!!`)
    : player1.pontos > player2.pontos
    ? console.log(`${player1.name} ganhou!!`)
    : console.log(`${player2.name} ganhou!!`);

  console.log(`\n-_-_-_-_-_-_-_-_-_-_-_-_-\n`);
}

(async function main() {
  console.log(`Corrida entre ${player1.name} e ${player2.name}`);

  await playRaceEngine(player1, player2);
})();
