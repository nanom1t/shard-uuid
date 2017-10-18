'use strict';
var shardUUID = require('./build/Release/shard-uuid.node');
var Long = require('long');

/**
 * UUID (64bits) = timestamp (32 bits) | shardId (22 bits) | localId (10 bits)
 */

function toLong(buffer) {
    return new Long(buffer.readInt32LE(0), buffer.readInt32LE(4), true);
}

var uuid = shardUUID.GetUUID(0, 1, false);
var time = shardUUID.GetTime(0);
var shardId = shardUUID.GetShardId(0);
var localId = shardUUID.GetLocalId(0);

console.log(toLong(uuid).toString());
console.log(toLong(time).toString());
console.log(toLong(shardId).toString());
console.log(toLong(localId).toString());
