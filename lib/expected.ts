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

  // 8452744e8d796fc1198f5315c1c92cc1cdb04f8f
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/831966090
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/831966252
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/831966501
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/831967031
  // win: https://github.com/vercel/pkg-fetch/actions/runs/834758544
  'node-v10.24.1-macos-x64':
    '8e11ce7982190252f5f39deac7b12997e21e0a24ef328510cb7fc9fc6a4ff86c',
  'node-v12.22.1-macos-x64':
    'aef181cbb6e7acc4129d70e8d34cf26f2d647ee7f11a44fe5e9052088cda7775',

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
  'node-v14.17.0-linux-arm64':
    '96e368d7f5cd38e7ea9e3935ce46ae1165d898900a1c3f3b9a5a9ad6695bccab',
  'node-v14.17.0-linux-x64':
    '5494cebea7b448bb6498cbdedc9564fa66faa043dabf70723d6204d5dd3e7387',
  'node-v14.17.0-linuxstatic-arm64':
    'b9f427befbae96680e51f904814420dad17b11c45b277e091d8a52d7c7e36fc4',
  'node-v14.17.0-linuxstatic-x64':
    'eb2fff6b4122bc6bb6ed8da0e842590261955d687ea9169e6472ab1e199e2f6c',
  'node-v14.17.0-macos-x64':
    '0713a1b2beff0b3c66e60f339dedff7d9b94362c46ddc589acf8786e8c368a53',
  'node-v14.17.0-win-arm64':
    '7254797b23a35bb17f716e520eade00b7cbce01dade13894663d87bdf4f736ac',
  'node-v14.17.0-win-x64':
    '8cceb766ee9ab1d5b84d0aa1cf47642b4327dc2fa7345877604a8fe11b4d8e23',

  // d9345e4ea58a51b5aecdf4ff929e6d74ad5b4127
  // manual
  'node-v14.17.0-macos-arm64':
    'bf2070a4286e3a48f7a98c2fc31ff510df97f55a8c169edd6b4c6d6e4a1d3f95',

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
  'node-v16.2.0-linux-arm64':
    'd2c20e515470b150759d45e81ea58091b13d6a2e9265e3a76ec542beff503e43',
  'node-v16.2.0-linux-x64':
    'e98de2aadd4ab420fdab4c0ee0ab153c499a46ae7cf5d345dc499040911598c5',
  'node-v16.2.0-linuxstatic-arm64':
    'b0e6090fe831017be09705e750601d056f9769102e8a55e3bad62542fb5f034d',
  'node-v16.2.0-linuxstatic-x64':
    'eb7922452d5243a2ef146030fdd4d88fe5b545c8809dc7c137c49fc19e516088',
  'node-v16.2.0-macos-x64':
    '94e396bd46fbdd965bd13194845ab54e3a4afe838ef906f9b5c543b6a87dc945',
  'node-v16.2.0-win-arm64':
    'db3c13b5ee9f825e92c69b481287709c7eb485bef2b73fb7793554dfc57ccb78',
  'node-v16.2.0-win-x64':
    'b088dfadc072496941390b34faedfeeedabc80d2cf1d6cb033ea6b7c611e1033',

  // 4e3c59d1388cd46b56f32eda2f43aa1bf27a28ff
  // manual
  'node-v16.2.0-macos-arm64':
    '4b50f82cba06c587cb257620751b76ea6c0121dd94aa1718111c772e5ea2f99e',
};
