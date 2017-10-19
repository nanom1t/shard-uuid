const shardUUID = require('./');

shardUUID.getUUID(8, 3, true).then((uuid) => {
    //uuid = '18446744073709551615';

    console.log('UUID: ' + uuid);

    shardUUID.getTime(uuid).then((time) => {
        console.log('Time: ' + time);

        return shardUUID.getShardId(uuid);
    }).then((shardId) => {
        console.log('Shard ID: ' + shardId);

        return shardUUID.getLocalId(uuid);
    }).then((localId) => {
        console.log('Local ID: ' + localId);

        return shardUUID.getInfo(uuid);
    }).then((info) => {
        console.log(info);
    }).catch((err) => {
        throw err;
    });
}).catch((err) => {
    console.log(err);
});
