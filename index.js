'use strict';

const shardUUID = require('./build/Release/shard-uuid.node');
const Long = require('long');

/**
 * UUID (64bits) = timestamp (32 bits) | shardId (22 bits) | localId (10 bits)
 */

/**
 * Convert buffer to Long
 * @param buffer
 * @returns {Long|undefined}
 */
function toLong (buffer) {
    return buffer ? new Long(buffer.readInt32LE(0), buffer.readInt32LE(4), true) : undefined;
}

//let uuid = Long.fromString('18446744073709551615', true);
let uuid = toLong(shardUUID.GetUUID(0, 3, true));
let time = toLong(shardUUID.GetTime(uuid.toString()));
let shardId = toLong(shardUUID.GetShardId(uuid.toString()));
let localId = toLong(shardUUID.GetLocalId(uuid.toString()));

console.log('UUID: ' + uuid.toString());
console.log('Time: ' + time.toString());
console.log('ShardId: ' + shardId.toString());
console.log('LocalId: ' + localId.toString());

module.exports = {

};