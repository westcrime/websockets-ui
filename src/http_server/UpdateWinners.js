export const UpdateWinners = function(clients) {
    let answer = {};
    answer.type = 'update_winners';
    answer.id = 0;
    answer.data = [];
    for (const client of clients) {
        answer.data.push({name: client.name, wins: client.wins});
    }
    answer.data = JSON.stringify(answer.data);
    return answer;
}