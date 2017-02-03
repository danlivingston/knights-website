"use strict";
const reqAccess = require('../reqAccess');
const responseDict = require('../responseDict');
const roles = require('../../roles');

module.exports = new ModeratorRoles();

function ModeratorRoles() {

    this.exec = msg => {
        let msgSplit = msg.content.split(" ");
        let command = msgSplit[1].toLowerCase();

        if (this[command]) {
            this[command](msg, msgSplit)
        } else {
            msg.channel.sendMessage("Unknown command");
        }
    }

    this.add = (msg, msgSplit) => {
        reqAccess(msg.guild, msg.member, 3)
            .then(() => {
                let moderatorRoleID = msgSplit[2];
                let thisGuild = msg.guild;
                return roles.moderators.add(moderatorRoleID, thisGuild);
            })
            .then(() => msg.channel.sendMessage(responseDict.success()))
            .catch(err => {
                console.log(err);
                msg.channel.sendMessage(responseDict.fail());
            })
    }

    this.remove = (msg, msgSplit) => {
        reqAccess(msg.guild, msg.member, 3)
            .then(() => {
                let moderatorRoleID = msgSplit[2];
                let thisGuild = msg.guild;
                return roles.moderators.remove(moderatorRoleID, thisGuild);
            })
            .then(() => msg.channel.sendMessage(responseDict.success()))
            .catch(err => {
                console.log(err);
                msg.channel.sendMessage(responseDict.fail());
            })

    }


    this.list = msg => {
        reqAccess(msg.guild, msg.member, 3)
            .then(() => roles.moderators.list(msg.guild.id))
            .then(res => {
                if (res) {
                    msg.channel.sendMessage(res)
                        .catch(err => console.log(err));
                } else {
                    msg.channel.sendMessage(responseDict.fail())
                        .catch(err => console.log(err));
                }
            })
            .catch(err => {
                console.log(err);
                msg.channel.sendMessage(responseDict.fail())
                    .catch(err => console.log(err));
            })
    }

}