/**
 * Shard UUID generator
 */
#include <v8.h>
#include <nan.h>
#include <cstdlib>
#include <chrono>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Number;
using v8::Exception;
using Nan::CopyBuffer;

#define EPOCH 1483228800L // 2017-01-01 00:00:00

typedef unsigned long long UINT64;
typedef unsigned int UINT32;

UINT64 GetTimestamp() {
    auto now = std::chrono::system_clock::now().time_since_epoch().count() / 1000;
    UINT64 timestamp = (UINT64)(now / 1000);

    return timestamp;
}

void GetUUID(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 3 || !args[0]->IsNumber() || !args[1]->IsNumber() || !args[2]->IsBoolean()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid params")));
        return;
    }

    UINT32 shardId = (UINT32) args[0]->Uint32Value();
    UINT32 localId = (UINT32) args[1]->Uint32Value();
    bool timestamp = (bool) args[2]->BooleanValue();
    UINT64 uuid = 0;

    // append timestamp (32 bits)
    if (timestamp) {
        uuid |= (GetTimestamp() - EPOCH) << 32;
    }

    // append shard id (22 bits)
    uuid |= shardId << 10;

    // append local id (10 bits)
    uuid |= localId % 1024;

    auto buffer = CopyBuffer((char*)(&uuid), 8);
    args.GetReturnValue().Set(buffer.ToLocalChecked());
}

void GetTime(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid UUID")));
        return;
    }

    String::Utf8Value uuidString(args[0]);
    UINT64 uuid = std::strtoull(*uuidString, NULL, 0);
    Local<Number> time = Number::New(isolate, ((uuid >> 32) & 0xFFFFFFFF));

    args.GetReturnValue().Set(time);
}

void GetShardId(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid UUID")));
        return;
    }

    String::Utf8Value uuidString(args[0]);
    UINT64 uuid = std::strtoull(*uuidString, NULL, 0);
    Local<Number> shardId = Number::New(isolate, ((uuid >> 10) & 0x3FFFFF));

    args.GetReturnValue().Set(shardId);
}

void GetLocalId(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid UUID")));
        return;
    }

    String::Utf8Value uuidString(args[0]);
    UINT64 uuid = std::strtoull(*uuidString, NULL, 0);
    Local<Number> localId = Number::New(isolate, (uuid & 0x3FF));

    args.GetReturnValue().Set(localId);
}

void GetInfo(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() < 1 || !args[0]->IsString()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid UUID")));
        return;
    }

    String::Utf8Value uuidString(args[0]);
    UINT64 uuid = std::strtoull(*uuidString, NULL, 0);
    Local<Object> info = Object::New(isolate);
    info->Set(String::NewFromUtf8(isolate, "time"), Number::New(isolate, (uuid >> 32) & 0xFFFFFFFF));
    info->Set(String::NewFromUtf8(isolate, "shardId"), Number::New(isolate, (uuid >> 10) & 0x3FFFFF));
    info->Set(String::NewFromUtf8(isolate, "localId"), Number::New(isolate, (uuid & 0x3FF)));

    args.GetReturnValue().Set(info);
}

/**
 * Initialize node module
 */
void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "getUUID", GetUUID);
    NODE_SET_METHOD(exports, "getTime", GetTime);
    NODE_SET_METHOD(exports, "getShardId", GetShardId);
    NODE_SET_METHOD(exports, "getLocalId", GetLocalId);
    NODE_SET_METHOD(exports, "getInfo", GetInfo);
}

NODE_MODULE(shard_uuid, init)