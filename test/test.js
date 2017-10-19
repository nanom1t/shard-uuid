'use strict';

const shardUUID = require('../index');
const should = require('should');
const Long = require('long');

// shardUUID.getUUID(8, 3, true).then((uuid) => {
//     //uuid = '18446744073709551615';
//
//     console.log('UUID: ' + uuid);
//
//     shardUUID.getTime(uuid).then((time) => {
//         console.log('Time: ' + time);
//
//         return shardUUID.getShardId(uuid);
//     }).then((shardId) => {
//         console.log('Shard ID: ' + shardId);
//
//         return shardUUID.getLocalId(uuid);
//     }).then((localId) => {
//         console.log('Local ID: ' + localId);
//
//         return shardUUID.getInfo(uuid);
//     }).then((info) => {
//         console.log(info);
//     }).catch((err) => {
//         throw err;
//     });
// }).catch((err) => {
//     console.log(err);
// });

describe('ShardUUID', function() {
    it('should not return null', function() {
        should.exist(shardUUID);
    });

    describe('#getUUID()', function() {
        it('should exists', function() {
            should.exist(shardUUID.getUUID);
        });

        it('should return promise', function() {
            (shardUUID.getUUID(0, 0, false)).should.be.a.Promise();
        });
    });

    describe('#getTime()', function() {
        it('should exists', function() {
            should.exist(shardUUID.getTime);
        });

        it('should return promise', function() {
            (shardUUID.getTime('1')).should.be.a.Promise();
        });
    });

    describe('#getShardId()', function() {
        it('should exists', function() {
            should.exist(shardUUID.getShardId);
        });

        it('should return promise', function() {
            (shardUUID.getShardId('1')).should.be.a.Promise();
        });
    });

    describe('#getLocalId()', function() {
        it('should exists', function() {
            should.exist(shardUUID.getLocalId);
        });

        it('should return promise', function() {
            (shardUUID.getLocalId('1')).should.be.a.Promise();
        });
    });

    describe('#getInfo()', function() {
        it('should exists', function() {
            should.exist(shardUUID.getInfo);
        });

        it('should return promise', function() {
            (shardUUID.getInfo('1')).should.be.a.Promise();
        });
    });

    //
    // it('should not return the same UUID when it called multiple times', function() {
    //     var uuid1 = instauuid();
    //     var uuid2 = instauuid();
    //     uuid1.should.not.be.equal(uuid2);
    // });
    //
    // it('should return string by default', function() {
    //     instauuid().should.be.String();
    // });
    //
    // it('should return buffer when buffer type is given', function() {
    //     var uuid = instauuid('buffer');
    //     uuid.should.be.instanceOf(Buffer);
    // });
    //
    // it('should return long when long type is given', function() {
    //     instauuid('long').should.be.instanceOf(Long);
    // });
});