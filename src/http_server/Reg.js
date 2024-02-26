export const Reg = function(clients, message) {
    let answer = {};
    let data = {};
    const userData = JSON.parse(message.data);
    for (const client of clients) {
        if (userData.name === client.name) {
            data.error = true;
            data.errorText = 'User with same name already exist!';
            answer.id = 0;
            answer.type = 'reg';
            answer.data = JSON.stringify(data);
            return answer;
        }
    }
    const newIndex = generateUniqueId(clients);
    clients.push({index: newIndex, wins: 0, name: userData.name, password: userData.password});
    data.index = newIndex;
    data.name = userData.name;
    data.password = userData.password;
    data.error = false;
    answer.id = 0;
    answer.type = 'reg';
    answer.data = JSON.stringify(data);
    return answer;
}

function generateUniqueId(existingUsers) {
    if (existingUsers.length == 0) {
        return 0;
    }
    const maxId = Math.max(...existingUsers.map(user => user.index));
    const newId = maxId + 1;
    return newId;
}