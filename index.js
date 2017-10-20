'use strict';

const shardUUID = require('./build/Release/shard-uuid.node');
const Long = require('long');
const is = require('is_js');

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
            if (is.existy(buffer)) {
                let uuid = bufferToLong(buffer);
                if (is.existy(uuid) && Long.isLong(uuid)) {
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
            if (is.existy(time) && is.number(time)) {
                resolve(time);
            } else {
                reject(new Error('UUID error: invalid time'));
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
            if (is.existy(shardId) && is.number(shardId)) {
                resolve(shardId);
            } else {
                reject(new Error('UUID error: invalid shard id'));
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
            if (is.existy(localId) && is.number(localId)) {
                resolve(localId);
            } else {
                reject(new Error('UUID error: invalid local id'));
            }
        });
    },

    getInfo (uuid) {
        return new Promise((resolve, reject) => {
            let info = shardUUID.getInfo(uuid);
            if (is.existy(info) && is.object(info)) {
                resolve(info);
            } else {
                reject(new Error('UUID error: invalid info'));
            }
        });
    }
};