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

NAN_METHOD(Hello) {
    // Create an instance of V8's String type
    auto message = Nan::New("Hello from C++!").ToLocalChecked();

    info.GetReturnValue().Set(message);
}

NAN_MODULE_INIT(Initialize) {
    NAN_EXPORT(target, Hello);
}

NODE_MODULE(shard_uuid, Initialize);