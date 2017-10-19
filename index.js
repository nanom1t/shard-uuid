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
            let buffer = shardUUID.GetUUID(shardId, localId, timestamp);
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
            let buffer = shardUUID.GetTime(uuid);
            if (buffer) {
                let time = bufferToLong(buffer);
                if (time && Long.isLong(time)) {
                    resolve(time.toString());
                } else {
                    reject(new Error('UUID error: buffer conversion'));
                }
            } else {
                reject(new Error('UUID error: empty buffer'));
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
            let buffer = shardUUID.GetShardId(uuid);
            if (buffer) {
                let shardId = bufferToLong(buffer);
                if (shardId && Long.isLong(shardId)) {
                    resolve(shardId.toString());
                } else {
                    reject(new Error('UUID error: buffer conversion'));
                }
            } else {
                reject(new Error('UUID error: empty buffer'));
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
            let buffer = shardUUID.GetLocalId(uuid);
            if (buffer) {
                let localId = bufferToLong(buffer);
                if (localId && Long.isLong(localId)) {
                    resolve(localId.toString());
                } else {
                    reject(new Error('UUID error: buffer conversion'));
                }
            } else {
                reject(new Error('UUID error: empty buffer'));
            }
        });
    }
};