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

UINT64 getTimestamp() {
    auto now = std::chrono::system_clock::now().time_since_epoch().count() / 1000;
    UINT64 time = (UINT64)(now / 1000);

    return time;
}

UINT64 getTime(UINT64 uuid) {
    return 0;
}

UINT64 getShardId(UINT64 uuid) {
    return 0;
}

UINT64 getLocalId(UINT64 uuid) {
    return 0;
}

UINT64 getUUID(UINT64 shardId, UINT64 localId, bool timestamp) {
    UINT64 uuid = 0;

    // append timestamp (32 bits)
    if (timestamp) {
        uuid |= (getTimestamp() - EPOCH) << 32;
    }

    // append shard id (22 bits)
    uuid |= shardId << 10;

    // append local id (10 bits)
    uuid |= localId % 1024;

    return uuid;
}

/**
 * Method wrapping for node export
 */
NAN_METHOD(GetUUID) {
    if (info.Length() < 3 || !info[0]->IsNumber() || !info[1]->IsNumber() || !info[2]->IsBoolean()) {
        return;
    }

    int shardId = (int) info[0]->NumberValue();
    int localId = (int) info[1]->NumberValue();
    bool timestamp = (bool) info[2]->BooleanValue();

    UINT64 uuid = getUUID(shardId, localId, timestamp);

    auto buffer = CopyBuffer((char*)(&uuid), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetTime) {
    if (info.Length() < 1 || !info[0]->IsNumber()) {
        return;
    }

    UINT64 time = getTime(0);

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&time), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetShardId) {
    if (info.Length() < 1 || !info[0]->IsNumber()) {
        return;
    }

    UINT64 shardId = getShardId(0);

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&shardId), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_METHOD(GetLocalId) {
    if (info.Length() < 1 || !info[0]->IsNumber()) {
        return;
    }

    UINT64 localId = getLocalId(0);

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