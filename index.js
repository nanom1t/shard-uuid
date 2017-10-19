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
function bufferToLong (buffer) {
    return buffer ? new Long(buffer.readInt32LE(0), buffer.readInt32LE(4), true) : undefined;
}

module.exports = {
    /**
     * Generate UUID
     * @param shardId
     * @param localId
     * @param timestamp
     * @returns {Promise}
     */
    getUUID (shardId, localId, timestamp) {
        return new Promise((resolve, reject) => {
            let buffer = shardUUID.getUUID(shardId, localId, timestamp);
            if (buffer) {
                let uuid = bufferToLong(buffer);
                if (uuid && Long.isLong(uuid)) {
                    resolve(uuid.toString());
                } else {
                    reject(new Error('UUID error: buffer conversion'));
                }
            } else {
                reject(new Error('UUID error: empty buffer'));
            }
        });
    },

    /**
     * Get time from UUID
     * @param uuid
     * @returns {Promise}
     */
    getTime (uuid) {
        return new Promise((resolve, reject) => {
            let time = shardUUID.getTime(uuid);
            if (time) {
                resolve(time);
            } else {
                reject(new Error('UUID error: time is undefined'));
            }
        });
    },

    /**
     * Get shard id from UUID
     * @param uuid
     * @returns {Promise}
     */
    getShardId (uuid) {
        return new Promise((resolve, reject) => {
            let shardId = shardUUID.getShardId(uuid);
            if (shardId) {
                resolve(shardId);
            } else {
                reject(new Error('UUID error: shard id is undefined'));
            }
        });
    },

    /**
     * Get local id from UUID
     * @param uuid
     * @returns {Promise}
     */
    getLocalId (uuid) {
        return new Promise((resolve, reject) => {
            let localId = shardUUID.getLocalId(uuid);
            if (localId) {
                resolve(localId);
            } else {
                reject(new Error('UUID error: local id is undefined'));
            }
        });
    },

    getInfo (uuid) {
        return new Promise((resolve, reject) => {
            let info = shardUUID.getInfo(uuid);
            if (info) {
                resolve(info);
            } else {
                reject(new Error('UUID error: invalid info'));
            }
        });
    }
};