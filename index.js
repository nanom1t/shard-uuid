'use strict';
var shardUUID = require('./build/Release/shard-uuid.node');
var Long = require('long');

/**
 * UUID (64bits) = timestamp (32 bits) + shardId (16 bits) + localId (16 bits)
 *
 */

function paramDefault(param, defaultValue) {
    return param == undefined ? defaultValue : param;
}

function unLittleEndian(buf) {
    for (var i=0;i<4;i++) {
        buf[i] ^= buf[7-i];
        buf[7-i] ^= buf[i];
        buf[i] ^= buf[7-i];
    }
    return buf;
}

function toLong(buf) {
    return new Long(buf.readInt32LE(0), buf.readInt32LE(4), true);
}

var uuid = shardUUID.GetUUID();
var time = shardUUID.GetTime();
var shardId = shardUUID.GetShardId();
var localId = shardUUID.GetLocalId();

console.log(toLong(uuid).toString());
console.log(toLong(time).toString());
console.log(toLong(shardId).toString());
console.log(toLong(localId).toString());
