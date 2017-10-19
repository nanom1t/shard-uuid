const shardUUID = require('./');

shardUUID.getUUID(0, 3, true).then((uuid) => {
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
    }).catch((err) => {
        throw err;
    });
}).catch((err) => {
    console.log(err);
});
