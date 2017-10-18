/**
 * Shard UUID generator
 */
#include <chrono>
#include <v8.h>
#include <nan.h>

using v8::String;
using v8::FunctionTemplate;
using Nan::GetFunction;
using Nan::CopyBuffer;
using Nan::New;
using Nan::Set;

#define EPOCH 1483228800L // 2017-01-01 00:00:00

typedef unsigned long long UINT64;
typedef unsigned long UINT32;

UINT64 getTime() {
    auto now = std::chrono::system_clock::now().time_since_epoch().count() / 1000;
    UINT64 time = (UINT64)(now / 1000);

    return time;
}

UINT64 getShardId() {
    return sizeof(UINT64);
}

UINT64 getLocalId() {
    return getTime() - EPOCH;
}

UINT64 getUUID(UINT32 shardId, UINT32 localId) {
    UINT64 id = 0;//getTime();// << (64-41);

    // aditional number (13 bit : 0~8191) - use microseconds if not exist
    //id |= (additional != 0 ? additional : now % 1000) << (64-41-13);

    // counter number (10 bit : 0~1023)
    //id |= counter % 1024;

    return id;
}

/**
 * Method wrapping for node export
 */

NAN_METHOD(GetUUID) {
    UINT64 uuid = getUUID(0, 0);

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&uuid), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetTime) {
    UINT64 time = getTime();

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&time), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetShardId) {
    UINT64 shardId = getShardId();

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&shardId), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetLocalId) {
    UINT64 localId = getLocalId();

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&localId), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

/**
 * Initialize node module
 */
NAN_MODULE_INIT(Initialize) {
    NAN_EXPORT(target, GetUUID);
    NAN_EXPORT(target, GetTime);
    NAN_EXPORT(target, GetShardId);
    NAN_EXPORT(target, GetLocalId);
}

NODE_MODULE(shard_uuid, Initialize);