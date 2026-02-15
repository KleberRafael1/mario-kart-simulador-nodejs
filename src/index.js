//O Computador deve receber dois personagens para disputar a corrida em um objeto cada

const player1 = {
NOME: "Mario",
VELOCIDADE: 4,
MANOBRABILIDADE: 3,
PODER: 3,
PONTOS: 0,
}

const player2 = {
NOME: "Luigi",
VELOCIDADE: 3,
MANOBRABILIDADE: 4,
PODER: 4,
PONTOS: 0,
}

//Criar uma função para simular uma jogada de dado com 6 lados (Async Functions)
async function rollDice() {
    return Math.floor(Math.random() * 6 + 1);
}

// 🎲 Sortear item do confronto (CASCO ou BOMBA)
async function getRandomItem() {
    let random = Math.random();

    if (random < 0.5) {
        return { nome: "CASCO", dano: 1, emoji: "🐢💥" };
    } else {
        return { nome: "BOMBA", dano: 2, emoji: "💣🔥" };
    }
}

// 🎲 Sorteia se ganhou turbo após vencer confronto
async function tryTurbo() {
    let random = Math.random();

    if (random < 0.5) {
        return true; // ganhou turbo (50% de chance)
    }

    return false;
}


//Os personagens irão correr em uma pista aleatória de 5 rodadas
async function getRandomBlock (){
    let random = Math.random();
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = 
    ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    
    for (let round = 1; round <= 5; round++) {
        console.log (`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`🚨 Bloco ${block}`);
        
        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);    
        }    

        else if(block === "CURVA"){        
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;    

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);    
        }

        else if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);        

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 === powerResult2){
                console.log("Confronto empatado! Nenhum item foi usado!");
            } else {

                const item = await getRandomItem();

                if(powerResult1 > powerResult2){
                    console.log(`${character1.NOME} venceu o confronto e usou ${item.nome}! ${item.emoji}`);
                    character2.PONTOS = Math.max(0, character2.PONTOS - item.dano);
                    console.log(`${character2.NOME} perdeu ${item.dano} ponto(s)!`);

                // tentativa de turbo
                if(await tryTurbo()){
                    character1.PONTOS++;
                    console.log(`🏎️\u200A TURBO! ${character1.NOME} ganhou +1 ponto de impulso!`);
                }
                }

                else {
                    console.log(`${character2.NOME} venceu o confronto e usou ${item.nome}! ${item.emoji}`);
                    character1.PONTOS = Math.max(0, character1.PONTOS - item.dano);
                    console.log(`${character1.NOME} perdeu ${item.dano} ponto(s)!`);

                // tentativa de turbo
                if(await tryTurbo()){
                    character1.PONTOS++;
                    console.log(`🏎️\u200A  TURBO! ${character1.NOME} ganhou +1 ponto de impulso!`);
                }

                }
                
            }
            

            console.log("----------------------------------------------");
            continue; // confronto não pontua rodada
        }

        // vencedor da rodada
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        } else {
            console.log("Rodada empatada! Ninguém pontuou.");
        }

        console.log("----------------------------------------------");
    }
}

//declarar o vencedor
async function declareWinner(character1, character2) {
    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} Ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} Ponto(s)`);

    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns!!🏆🏆🏆`);    
     else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns!!🏆🏆🏆`);    
    else
        console.log(`A corrida terminou em empate!!`);    
}

(async function main() {
    console.log(`🏁🚦 Corrida entre ${player1.NOME} e ${player2.NOME} Começando... \n`);             

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();
