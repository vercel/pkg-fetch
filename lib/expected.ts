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

  // 4e3c59d1388cd46b56f32eda2f43aa1bf27a28ff
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/860350085
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/860350291
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/860350586
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/860351248
  // win: https://github.com/vercel/pkg-fetch/actions/runs/862290894
  'node-v16.2.0-alpine-arm64':
    '42d71dec87a3820b904a13c88265f75977cd7c75f354989e536315e733672031',
  'node-v16.2.0-alpine-x64':
    '5123f53637fd95c3e151802db509c4cbe378f39c70c93ad756618528866943b3',
  'node-v16.2.0-linux-x64':
    'e98de2aadd4ab420fdab4c0ee0ab153c499a46ae7cf5d345dc499040911598c5',
  'node-v16.2.0-linuxstatic-arm64':
    'b0e6090fe831017be09705e750601d056f9769102e8a55e3bad62542fb5f034d',
  'node-v16.2.0-linuxstatic-x64':
    'eb7922452d5243a2ef146030fdd4d88fe5b545c8809dc7c137c49fc19e516088',
  'node-v16.2.0-win-arm64':
    'db3c13b5ee9f825e92c69b481287709c7eb485bef2b73fb7793554dfc57ccb78',
  'node-v16.2.0-win-x64':
    'b088dfadc072496941390b34faedfeeedabc80d2cf1d6cb033ea6b7c611e1033',

  // 27e00d1d72ab4afda203edcd7a4f9601bc1d641c
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/888438143
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/888438190
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/888438236
  'node-v10.24.1-linux-arm64':
    'e3a3e5197e3f3d1063e3178786890b29493b8dfc31362f3417cce90ca7eb3e98',
  'node-v10.24.1-linuxstatic-armv7':
    '4933be03e394a82f5aa5fc4600b29392b2ce7eac24bd2ef8759f9a8e8c841990',
  'node-v10.24.1-macos-x64':
    '545833cab0688ba25f6285d3a99ab4b911a0474aa950b36a0ba05227b077d553',
  'node-v12.22.1-linux-arm64':
    '807dff5881521042382a21044ea6fc1e53a602b553c6fee98d8f8e25e238bc3d',
  'node-v12.22.1-linuxstatic-armv7':
    '6cd4dfe6ddfaaa82633cc08e765dec8f6f20381687e2587c4625288c3d152af6',
  'node-v12.22.1-macos-x64':
    '69e6cb84c0c7fa5218650174432bc050bc40c4720df37118b72d8b0fda5f67c8',
  'node-v14.17.0-linux-arm64':
    '2bb3a8ef2128e1620ce80a675825e7bf63a0cb302a23019a51a80fa73cb0926c',
  'node-v14.17.0-linuxstatic-armv7':
    'd1044e25f148b47e8072cb738ae8619730e1c465b8ae6af29e7e3a9fbb39a969',
  'node-v14.17.0-macos-x64':
    '58e720297a71466e80878de789e491af130deb0f4fd6f3eeab44fc09de65dcb4',
  'node-v16.2.0-linux-arm64':
    'ca3a2976342037b712ac616f5527417cf3a31963c49fd73ec2b1d47ce12a16a2',
  'node-v16.2.0-linuxstatic-armv7':
    'f7ddcace69bb06c8f40d4acd76c7111a568a3e05f868f8449c473ed7bfdd208c',
  'node-v16.2.0-macos-x64':
    'b19805ceb4b16218759f1e04943090df1a3c26e2f7b75d03459faa11f2624ee9',

  // 27e00d1d72ab4afda203edcd7a4f9601bc1d641c
  // manual
  'node-v14.17.0-macos-arm64':
    'e975bdae85b9a1f10dca97c4db0639f5cea39c2b9e99e43f754b74acf4b20f2b',
  'node-v16.2.0-macos-arm64':
    '6da62bbda278bc5913127ffc7a0c391d3cb2c5c16d9473b3c65af6dd090073cc',
};
