'use strict';

const shardUUID = require('./');

let start = new Date().getTime();

// shardUUID.getUUID(65536, 1023, false).then((uuid) => {
//     console.log((new Date().getTime() - start) + ' ms');
//     console.log(uuid);
// }).catch((err) => {});

// getUUID(65536, 1023).then((uuid) => {
//     console.log((new Date().getTime() - start) + ' ms');
//     console.log(uuid);
// });


shardUUID.getInfo('67109887').then((info) => {
    console.log((new Date().getTime() - start) + ' ms');
    console.log(info);
}).catch((err) => {});


function getUUID(shardId, localId) {
    return new Promise((resolve, reject) => {
        let uuid = 0;
        uuid |= (shardId << 10);
        uuid |= (localId);

        resolve(uuid);
    });
}