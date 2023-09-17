//const members = require("./members");

exports.getUniqueID = (members) => {
    const membersIds = members.map(member => member.id );
    const maxId = membersIds.reduce((max, memberId) => Math.max(max, memberId))
    const uniqueId = maxId+1
    return uniqueId ;
}
