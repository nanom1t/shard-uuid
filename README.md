# ShardUUID

[![NPM Version][npm-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![NPM Downloads][downloads-image]][downloads-url]

Compact 64-bit UUID generator for database shards.

Generates 8-byte UUID that consists of:
- 32 bits for time in seconds (gives 136 years of IDs from start of epoch 2017-01-01 00:00:00);
- 22 bits that represent the logical shard ID;
- 10 bits that represent an auto-incrementing sequence (modulus 1024).

## Installation
```
$ npm install --save shard-uuid
```
#### License: MIT

[npm-image]: https://img.shields.io/npm/v/shard-uuid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/shard-uuid
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.6-brightgreen.svg?style=flat-square
[node-version-url]: http://nodejs.org/download/
[downloads-image]: http://img.shields.io/npm/dm/shard-uuid.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/shard-uuid