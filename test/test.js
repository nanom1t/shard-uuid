'use strict';

const shardUUID = require('../index');
const should = require('should');

describe('ShardUUID', () => {
    it('should exists', () => {
        should.exist(shardUUID);
    });

    describe('#getUUID()', () => {
        it('should exists', () => {
            should.exist(shardUUID.getUUID);
        });

        it('should return promise', () => {
            (shardUUID.getUUID(0, 0, false)).should.be.Promise();
        });

        it('should reject if undefined or null', () => {
            shardUUID.getUUID().should.be.rejected();
        });

        it('should resolve string', () => {
            shardUUID.getUUID(0, 0, false).then((uuid) => {
                uuid.should.be.String();
            });
        });

        describe('#validation', () => {
            it('(0, 1, false) should return 1', () => {
                return shardUUID.getUUID(0, 1, false).should.be.fulfilledWith('1');
            });

            it('(1, 1, false) should return 1 025', () => {
                return shardUUID.getUUID(1, 1, false).should.be.fulfilledWith('1025');
            });

            it('(1, 1023, false) should return 2 047', () => {
                return shardUUID.getUUID(1, 1023, false).should.be.fulfilledWith('2047');
            });

            it('(1024, 1, false) should return 1 048 577', () => {
                return shardUUID.getUUID(1024, 1, false).should.be.fulfilledWith('1048577');
            });

            it('(65536, 1, false) should return 67 108 865', () => {
                return shardUUID.getUUID(65536, 1, false).should.be.fulfilledWith('67108865');
            });

            it('(4194303, 1, false) should return 4 294 966 273', () => {
                return shardUUID.getUUID(4194303, 1, false).should.be.fulfilledWith('4294966273');
            });

            it('(4194303, 1023, false) should return 4 294 967 295', () => {
                return shardUUID.getUUID(4194303, 1023, false).should.be.fulfilledWith('4294967295');
            });
        });
    });

    describe('#getTime()', () => {
        it('should exists', () => {
            should.exist(shardUUID.getTime);
        });

        it('should return promise', () => {
            (shardUUID.getTime('0')).should.be.Promise();
        });

        it('should reject if undefined or null', () => {
            shardUUID.getTime(undefined).should.be.rejected();
        });

        it('should resolve number gte 0', () => {
            shardUUID.getTime('0').then((time) => {
                time.should.be.Number().and.be.greaterThanOrEqual(0);
            });
        });

        describe('#validation', () => {
            it('(1) should return 0', () => {
                return shardUUID.getTime('1').should.be.fulfilledWith(0);
            });

            it('(1025) should return 0', () => {
                return shardUUID.getTime('1025').should.be.fulfilledWith(0);
            });

            it('(2047) should return 0', () => {
                return shardUUID.getTime('2047').should.be.fulfilledWith(0);
            });

            it('(1048577) should return 0', () => {
                return shardUUID.getTime('1048577').should.be.fulfilledWith(0);
            });

            it('(67108865) should return 0', () => {
                return shardUUID.getTime('67108865').should.be.fulfilledWith(0);
            });

            it('(4294966273) should return 0', () => {
                return shardUUID.getTime('4294966273').should.be.fulfilledWith(0);
            });

            it('(4294967295) should return 0', () => {
                return shardUUID.getTime('4294967295').should.be.fulfilledWith(0);
            });
        });
    });

    describe('#getShardId()', () => {
        it('should exists', () => {
            should.exist(shardUUID.getShardId);
        });

        it('should return promise', () => {
            (shardUUID.getShardId('0')).should.be.Promise();
        });

        it('should reject if undefined or null', () => {
            shardUUID.getShardId(undefined).should.be.rejected();
        });

        it('should resolve number gte 0', () => {
            shardUUID.getShardId('0').then((shardId) => {
                shardId.should.be.Number().and.be.greaterThanOrEqual(0);
            });
        });

        describe('#validation', () => {
            it('(1) should return 0', () => {
                return shardUUID.getShardId('1').should.be.fulfilledWith(0);
            });

            it('(1025) should return 1', () => {
                return shardUUID.getShardId('1025').should.be.fulfilledWith(1);
            });

            it('(2047) should return 1', () => {
                return shardUUID.getShardId('2047').should.be.fulfilledWith(1);
            });

            it('(1048577) should return 1024', () => {
                return shardUUID.getShardId('1048577').should.be.fulfilledWith(1024);
            });

            it('(67108865) should return 65536', () => {
                return shardUUID.getShardId('67108865').should.be.fulfilledWith(65536);
            });

            it('(4294966273) should return 4194303', () => {
                return shardUUID.getShardId('4294966273').should.be.fulfilledWith(4194303);
            });

            it('(4294967295) should return 4194303', () => {
                return shardUUID.getShardId('4294967295').should.be.fulfilledWith(4194303);
            });
        });
    });

    describe('#getLocalId()', () => {
        it('should exists', () => {
            should.exist(shardUUID.getLocalId);
        });

        it('should return promise', () => {
            (shardUUID.getLocalId('0')).should.be.Promise();
        });

        it('should reject if undefined or null', () => {
            shardUUID.getLocalId(undefined).should.be.rejected();
        });

        it('should resolve number gte 0', () => {
            shardUUID.getLocalId('0').then((localId) => {
                localId.should.be.Number().and.be.greaterThanOrEqual(0);
            });
        });

        describe('#validation', () => {
            it('(1) should return 1', () => {
                return shardUUID.getLocalId('1').should.be.fulfilledWith(1);
            });

            it('(1025) should return 1', () => {
                return shardUUID.getLocalId('1025').should.be.fulfilledWith(1);
            });

            it('(2047) should return 1023', () => {
                return shardUUID.getLocalId('2047').should.be.fulfilledWith(1023);
            });

            it('(1048577) should return 1', () => {
                return shardUUID.getLocalId('1048577').should.be.fulfilledWith(1);
            });

            it('(67108865) should return 1', () => {
                return shardUUID.getLocalId('67108865').should.be.fulfilledWith(1);
            });

            it('(4294966273) should return 1', () => {
                return shardUUID.getLocalId('4294966273').should.be.fulfilledWith(1);
            });

            it('(4294967295) should return 1023', () => {
                return shardUUID.getLocalId('4294967295').should.be.fulfilledWith(1023);
            });
        });
    });

    describe('#getInfo()', () => {
        it('should exists', () => {
            should.exist(shardUUID.getInfo);
        });

        it('should return promise', () => {
            (shardUUID.getInfo('0')).should.be.Promise();
        });

        it('should reject if undefined or null', () => {
            shardUUID.getInfo(undefined).should.be.rejected();
        });

        it('should resolve object', () => {
            shardUUID.getInfo('0').then((info) => {
                info.should.be.Object().and.has.properties(['time', 'shardId', 'localId']);
            });
        });

        describe('#validation', () => {
            it('(1) should return { time: 0, shardId: 0, localId: 1 }', () => {
                return shardUUID.getInfo('1').should.be.fulfilledWith({ time: 0, shardId: 0, localId: 1 });
            });

            it('(1025) should return { time: 0, shardId: 1, localId: 1 }', () => {
                return shardUUID.getInfo('1025').should.be.fulfilledWith({ time: 0, shardId: 1, localId: 1 });
            });

            it('(2047) should return { time: 0, shardId: 1, localId: 1023 }', () => {
                return shardUUID.getInfo('2047').should.be.fulfilledWith({ time: 0, shardId: 1, localId: 1023 });
            });

            it('(1048577) should return { time: 0, shardId: 1024, localId: 1 }', () => {
                return shardUUID.getInfo('1048577').should.be.fulfilledWith({ time: 0, shardId: 1024, localId: 1 });
            });

            it('(67108865) should return { time: 0, shardId: 65536, localId: 1 }', () => {
                return shardUUID.getInfo('67108865').should.be.fulfilledWith({ time: 0, shardId: 65536, localId: 1 });
            });

            it('(4294966273) should return { time: 0, shardId: 4194303, localId: 1 }', () => {
                return shardUUID.getInfo('4294966273').should.be.fulfilledWith({ time: 0, shardId: 4194303, localId: 1 });
            });

            it('(4294967295) should return { time: 0, shardId: 4194303, localId: 1023 }', () => {
                return shardUUID.getInfo('4294967295').should.be.fulfilledWith({ time: 0, shardId: 4194303, localId: 1023 });
            });
        });
    });
});