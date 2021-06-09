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
  'node-v10.24.1-linux-x64':
    'c59574f4ea7b1423bd7ef586887ea41c43cfb2a63431126af0de20291a3a94db',
  'node-v10.24.1-linuxstatic-arm64':
    '01bc2cfbf7a7dd1a74201ae34a6cfafc1ad1c6d77039f587111738a81637bc5b',
  'node-v10.24.1-linuxstatic-x64':
    'a7bbd62b712b3a7ac54953b646f0802e84bc7ecadb0b8a0756323fcffe3310a5',
  'node-v10.24.1-win-x64':
    '958647af177a9089bb4f3495e352d5348a1b42858d0111004ca26c3a2ece3f73',
  'node-v12.22.1-alpine-arm64':
    'd4951df9ae437086cbb80c934249a24daaaaa71f67845a07b0c0a0af3cc48d56',
  'node-v12.22.1-alpine-x64':
    '19d2baad1d8b75221239c1fe5c2467b4ddb07fc4b02e0a034cedcb28f0d6e400',
  'node-v12.22.1-linux-x64':
    '20911af9c855edc3e1e0f33032fcedc59487fc3d908ca78fc75a6d81d88ee8c7',
  'node-v12.22.1-linuxstatic-arm64':
    '2265d1d44a6715d10621cdbcf6880b1f3a7173950c027be9014b9eabd75ad6e4',
  'node-v12.22.1-linuxstatic-x64':
    '4fbec04273f3b3c2467baaaeec6cdca48cbc57fed07627872345583191dcbb11',
  'node-v12.22.1-win-x64':
    '48637669a8418e33edbef50f7331e337dfd644783c9257a386dac846610c613c',
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

  // d9345e4ea58a51b5aecdf4ff929e6d74ad5b4127
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/838900430
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/838900527
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/838900585
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/838900726
  // win: https://github.com/vercel/pkg-fetch/actions/runs/838900655
  'node-v14.17.0-alpine-arm64':
    'be48a7f0594d1c86e469255313d9d8f0d701044fb310266e146fca9dc258768c',
  'node-v14.17.0-alpine-x64':
    '4816d449518ee55009a64d2029f91fabf6ab76386c690cfca6d742ff1d870721',
  'node-v14.17.0-linux-x64':
    '5494cebea7b448bb6498cbdedc9564fa66faa043dabf70723d6204d5dd3e7387',
  'node-v14.17.0-linuxstatic-arm64':
    'b9f427befbae96680e51f904814420dad17b11c45b277e091d8a52d7c7e36fc4',
  'node-v14.17.0-linuxstatic-x64':
    'eb2fff6b4122bc6bb6ed8da0e842590261955d687ea9169e6472ab1e199e2f6c',
  'node-v14.17.0-win-arm64':
    '7254797b23a35bb17f716e520eade00b7cbce01dade13894663d87bdf4f736ac',
  'node-v14.17.0-win-x64':
    '8cceb766ee9ab1d5b84d0aa1cf47642b4327dc2fa7345877604a8fe11b4d8e23',

  // 27e00d1d72ab4afda203edcd7a4f9601bc1d641c
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/888438143
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/888438190
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/888438236
  'node-v10.24.1-linux-arm64':
    'e3a3e5197e3f3d1063e3178786890b29493b8dfc31362f3417cce90ca7eb3e98',
  'node-v10.24.1-linuxstatic-armv7':
    '4933be03e394a82f5aa5fc4600b29392b2ce7eac24bd2ef8759f9a8e8c841990',
  'node-v12.22.1-linux-arm64':
    '807dff5881521042382a21044ea6fc1e53a602b553c6fee98d8f8e25e238bc3d',
  'node-v12.22.1-linuxstatic-armv7':
    '6cd4dfe6ddfaaa82633cc08e765dec8f6f20381687e2587c4625288c3d152af6',
  'node-v14.17.0-linux-arm64':
    '2bb3a8ef2128e1620ce80a675825e7bf63a0cb302a23019a51a80fa73cb0926c',
  'node-v14.17.0-linuxstatic-armv7':
    'd1044e25f148b47e8072cb738ae8619730e1c465b8ae6af29e7e3a9fbb39a969',

  // a55285e84b1f17b9bfe39e960ccb164d996c472a
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/905207727
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/903452752
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/903453017
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/903453464
  // win: https://github.com/vercel/pkg-fetch/actions/runs/903453334
  'node-v16.3.0-alpine-arm64':
    '6a19623bb949179ef37ddb5bf1a9d8f676af948a557da6e2a6fa6e4f02e9052b',
  'node-v16.3.0-alpine-x64':
    '026239a97a6163b2f5a2c008b5fe31f3d322245e9c9380618aa1e99e4d1f4c33',
  'node-v16.3.0-linux-arm64':
    'c504d18d650cffc9a81dcd787e7c05269766f9f952dfb087fa61975cdfe75ec3',
  'node-v16.3.0-linux-x64':
    '9978c59a63bd40bfa45a770b10becc9c9dfbaa98252344e77eabacbb0ed9acb1',
  'node-v16.3.0-linuxstatic-arm64':
    'b3ddc20ad4d45267573973b07753bbb81e431e1d5646701030e300123ba8c937',
  'node-v16.3.0-linuxstatic-armv7':
    '5174b7a995f84347f0e23f463a39935e10a121a970cfa885724d3aba2cf09a51',
  'node-v16.3.0-linuxstatic-x64':
    '81a78fe0b1b44ebd6ca452d1a9f0ef30f68e172db53b7ef64a8bc2017ee20818',
  'node-v16.3.0-win-arm64':
    '713336c34734cb6396c625ff23e78cc4cdd43bf6ead6b545534ad9dba4375f75',
  'node-v16.3.0-win-x64':
    'ba9e42efe4c35613259f73937043634a6082f3e9b9e10d1713f6792e76ab02b6',

  // 55a34ad0afe75749a14260c45d39cc9b265995ed
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/918633749
  'node-v10.24.1-macos-x64':
    'f2e4679262a1cc6f3213cc4f0453d662e48c021975b651534fcbf26d6fdab474',
  'node-v12.22.1-macos-x64':
    '0d8c60636224e5fc814a0ebf0f27fbe431c26ed45e99c34ba7914628ba243956',
  'node-v14.17.0-macos-x64':
    '074a517cbf9a5abd2faa976426eeea37fb7a0cf976e4441b757deac2b66beb8a',
  'node-v16.3.0-macos-x64':
    '812ee07837ccbdb8489262882ccf43e8f32e9192a5bcbe05703d1f4ca6008b79',

  // 55a34ad0afe75749a14260c45d39cc9b265995ed
  // manual
  'node-v14.17.0-macos-arm64':
    '6bf8b19a8ec278a801efd8177cb827a17c4da734a6867b8084babcf642f66a0e',
  'node-v16.3.0-macos-arm64':
    '0ec2d01a34f21a04c035400bb712beb57639a09e1bd75aa639f9277cdcf140ba',
};
