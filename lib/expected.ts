export const EXPECTED_HASHES: Record<string, string> = {
  // 2a68741776e74f626c83254941a639ab7dcf6332
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/752615021
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/752615173
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/752615423
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/752615807
  // win: https://github.com/vercel/pkg-fetch/actions/runs/752615557
  'node-v10.24.1-alpine-arm64':
    'f6a59f1ace2ef1f4bf976ff85d9a74bdc71bda098e8aa018e2a089c590aeedea',
  'node-v10.24.1-alpine-x64':
    '24f862b22a59ac0adb746d5bd3f2226c8eb2f6e1565a1cb4d2418c9cb0f3769e',
  'node-v10.24.1-linux-arm64':
    '091144e7c7c1946130ebd98b9855e2ec80b23011398ceea303254a6d25592d6d',
  'node-v10.24.1-linux-x64':
    'c59574f4ea7b1423bd7ef586887ea41c43cfb2a63431126af0de20291a3a94db',
  'node-v10.24.1-linuxstatic-arm64':
    '01bc2cfbf7a7dd1a74201ae34a6cfafc1ad1c6d77039f587111738a81637bc5b',
  'node-v10.24.1-linuxstatic-x64':
    'a7bbd62b712b3a7ac54953b646f0802e84bc7ecadb0b8a0756323fcffe3310a5',
  'node-v10.24.1-macos-x64':
    'f1e3f50c55890ff238809d58c1b3a30b045e844770120fd69c867ea58d3fb0ec',
  'node-v10.24.1-win-x64':
    '958647af177a9089bb4f3495e352d5348a1b42858d0111004ca26c3a2ece3f73',
  'node-v12.22.1-alpine-arm64':
    'd4951df9ae437086cbb80c934249a24daaaaa71f67845a07b0c0a0af3cc48d56',
  'node-v12.22.1-alpine-x64':
    '19d2baad1d8b75221239c1fe5c2467b4ddb07fc4b02e0a034cedcb28f0d6e400',
  'node-v12.22.1-linux-arm64':
    'e642dcecaf6052aeca62943aa54c28464571232b753a27cb5698341760bf4234',
  'node-v12.22.1-linux-x64':
    '20911af9c855edc3e1e0f33032fcedc59487fc3d908ca78fc75a6d81d88ee8c7',
  'node-v12.22.1-linuxstatic-arm64':
    '2265d1d44a6715d10621cdbcf6880b1f3a7173950c027be9014b9eabd75ad6e4',
  'node-v12.22.1-linuxstatic-x64':
    '4fbec04273f3b3c2467baaaeec6cdca48cbc57fed07627872345583191dcbb11',
  'node-v12.22.1-macos-x64':
    'c7d11d7c427967778c2621870e45ac98b98350f44e992f152de55bf919a737e6',
  'node-v12.22.1-win-x64':
    '48637669a8418e33edbef50f7331e337dfd644783c9257a386dac846610c613c',
  'node-v14.16.1-alpine-arm64':
    'c074af7d4f4d5c520df9135bc556b2447843c5a469175a7c479f16d58cc073d2',
  'node-v14.16.1-alpine-x64':
    '0ea2a4f5edf3b9f4f3350fbb2db7d5f65cf6f433aa0da986cc1e5d99e422b78a',
  'node-v14.16.1-linux-arm64':
    'b459de37a899ced574e97a3d2977da6f91559dd3a0f6ecce59610ecafecfaf5b',
  'node-v14.16.1-linux-x64':
    '77ad9b663d6f4b5d8c327da2e25e2be5ec6749cc4107635ba854a0d3d3f489fd',
  'node-v14.16.1-linuxstatic-arm64':
    '3768d90c502883bf61041b7cbade37021d18c651b50ee597445311991c122e06',
  'node-v14.16.1-linuxstatic-x64':
    'a64ffe8250af74ff7bfd352d469a3c41930de6e13efdff37ca1b7524ab335053',
  'node-v14.16.1-macos-x64':
    'b13dfc538121a8e19ae6bd6201bdbeca88b6dfd7cb37f5835d8c9e28f9a662c2',
  'node-v14.16.1-win-arm64':
    'dac41cc2f5ffa90900939b325464e316c38c3b6514f6285c9bd2701c3c774a9a',
  'node-v14.16.1-win-x64':
    '67508e6c5d808887fdb623f21c52add1de531ebbb690971f6780c60dc32c3b8f',
  'node-v8.17.0-alpine-arm64':
    '807df81524ec8e1e266ac7fbed434c6b2281ae20b9fa7eaa524de90f3330c4d7',
  'node-v8.17.0-alpine-x64':
    '83a3914de57ee6be7d68ebaac8a10c1a2972d554800f1bee218cc4a23650e0fb',
  'node-v8.17.0-linux-arm64':
    'f06855896bfa10bead1f08fac080305fb6fbfb2cc691168a3f0f0e834e12bfba',
  'node-v8.17.0-linux-x64':
    '14d75d43de1ff86469d354bf42a83b9494e09502fa7bc23a975e2cb82b1608b0',
  'node-v8.17.0-linuxstatic-arm64':
    '84de8fe30b2bd1dcb3615cf1d1b538aa48e1fcf66620ef97dce6b7ae85b45025',
  'node-v8.17.0-linuxstatic-x64':
    '5206878079f160e75a02ad33b7559b4a869e8181ee03d51d7211b52995f9ca7b',
  'node-v8.17.0-macos-x64':
    'dffa71e39100f4daa57de73fda7b4debecd09f552b15cf11854c8475380d3817',
  'node-v8.17.0-win-x64':
    '4556a06dc59a0196453ba5962ea077ea71fe566e4de1c92f73f057446d422251',

  // 7c8ca68ade5d3d4c70f8e94c8064115c00281415
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/778165607
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/778165672
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/778165846
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/778166261
  // win: https://github.com/vercel/pkg-fetch/actions/runs/778166018
  'node-v16.0.0-alpine-arm64':
    '7353407ffab0782b999c4e40bcb017fb19d3c4b902d35adbbc7f9fa689c0c14a',
  'node-v16.0.0-alpine-x64':
    '3eb31a2cb4254429fb816611c4a3febccf1099a5f0e5ab765b71e28d861fe7f3',
  'node-v16.0.0-linux-arm64':
    '6105626809ac9bb48792f2c80fc69ebff2af2529754af32a5ba1516c9d853db9',
  'node-v16.0.0-linux-x64':
    '5dbb0905a83136dc3779aa74878bd818bea1aebbc0b3c6e2a6cbd793cd5f0473',
  'node-v16.0.0-linuxstatic-arm64':
    '882a2500d3096e7b6a344f98ddb060d57c71c60fe3adc86772fd687edfcfe437',
  'node-v16.0.0-linuxstatic-x64':
    '73c15f01629803eb53f3dc2fe5472f4a1bb3c1dd1918d2b7edb48d01c86fc837',
  'node-v16.0.0-macos-x64':
    '3e1d3c0d094e4e6d43e28c8117eaf0abab52cbb34b98ab343b633241c8b40ee0',
  'node-v16.0.0-win-arm64':
    '810e86c4f262f6f3e5d1155a59db6891f68a3ba4f312d262ca31444dc7ca1c86',
  'node-v16.0.0-win-x64':
    'e60ee56df4e3e9fdc3b04016f529f6fbc6dfeaf2741c387d3e2f1eb047d7da7f',
};
