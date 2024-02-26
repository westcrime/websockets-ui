class BattleshipGame {
    constructor(ships1, ships2, player1, player2) {
        this.boardSize = 10;
        this.ships = [ships1, ships2];
        this.players = [player1, player2];
        this.attacks = [[], []];
    }

    attack(x, y, currentPlayer) {
        const indexPlayer = this.players.findIndex(player => player.index === currentPlayer);
        const playerAttacks = this.attacks[indexPlayer];

        if (playerAttacks.some(attack => attack.x === x && attack.y === y)) {
            return { type: "attack", data: { position: { x, y }, currentPlayer, status: "alreadyAttacked" }, id: 0 };
        }

        for (let ship of this.ships[indexPlayer]) {
            if (ship.direction === true && ship.position.x <= x && x < ship.position.x + ship.length && ship.position.y === y) {
                ship.length--;
                if (ship.length === 0) {
                    return { type: "attack", data: { position: { x, y }, currentPlayer, status: "killed" }, id: 0 };
                } else {
                    return { type: "attack", data: { position: { x, y }, currentPlayer, status: "shot" }, id: 0 };
                }
            } else if (ship.direction === false && ship.position.y <= y && y < ship.position.y + ship.length && ship.position.x === x) {
                ship.length--;
                if (ship.length === 0) {
                    return { type: "attack", data: { position: { x, y }, currentPlayer, status: "killed" }, id: 0 };
                } else {
                    return { type: "attack", data: { position: { x, y }, currentPlayer, status: "shot" }, id: 0 };
                }
            }
        }
        playerAttacks.push({ x, y });
        return { type: "attack", data: { position: { x, y }, currentPlayer, status: "miss" }, id: 0 };
    }

    randomAttack(indexPlayer) {
        let answer = this.attack(Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize), indexPlayer);
        while (answer.data.status === 'alreadyAttacked') {
            answer = this.attack(Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize), indexPlayer);
        }
        return answer;
    }
}


const players = ["Player 1", "Player 2"];
const game = new BattleshipGame(players);
const attackResult = game.attack(3, 4, "Player 1");
console.log(attackResult);
const randomAttackResult = game.randomAttack(123456, 1);
console.log(randomAttackResult);
