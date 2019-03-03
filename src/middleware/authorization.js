const checkIfAdmin = (msg, command) => {
    const allowedRole = msg.guild.roles.find(role => role.name === "Admin");

    if (allowedRole && msg.member.roles.has(allowedRole.id)) {
        command()
    } else {
        msg.channel.send(':exclamation:You do not have authroization to use that command.')
    }
}

module.exports = checkIfAdmin