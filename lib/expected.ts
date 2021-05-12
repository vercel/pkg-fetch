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
  'node-v14.16.1-macos-x64':
    '6993621377c6dcabda8c26f90d47d1c306dea304d9546f4cf13302677765b06c',
  'node-v16.1.0-alpine-arm64':
    'fb31488afc70d395c4b56ea98387f4563e87c97564a979c0a03cd32c2cf730b5',
  'node-v16.1.0-alpine-x64':
    'd80ab87bc7e199fd74e8829c8299cf917adb7a87f4bf3680ca90d6d770039dab',
  'node-v16.1.0-linux-arm64':
    'bc95bc393caf727ecc378956aa8fbd0a67ea037c289ca39be1fcfc148df43694',
  'node-v16.1.0-linux-x64':
    '086797b9dd53fc1663315639573723ab576b86e73824760813a5319c88c7102e',
  'node-v16.1.0-linuxstatic-arm64':
    '36a96827fb4d7ba539667ba78baee5bac97b37e1fea36a4d2ec6fa16ac09af82',
  'node-v16.1.0-linuxstatic-x64':
    'c7a4a4c88e10717d1a5ada3a013f807a1464e8281de1ed7394df18c0d448e13a',
  'node-v16.1.0-macos-x64':
    '8c84791d7059e406666097c1cbbecba52b788ba237cc9db83c53bb8f82c9ff53',
  'node-v16.1.0-win-arm64':
    'a006c626b3e076d222588508c2a4c8f154d20de4dc9db0f97709344f9fe67288',
  'node-v16.1.0-win-x64':
    '9097c09a830d13d3399ee89fe9f5647c150bf7a1729b99e4935df4664e7e41ab',

  // 8452744e8d796fc1198f5315c1c92cc1cdb04f8f
  // manual
  'node-v14.16.1-macos-arm64':
    'c15fbe6ba630b952c322ae74f05bf6ce2cf7431f09151c27914d4c04d4ba4260',
  'node-v16.1.0-macos-arm64':
    '8aca0cad786cb411678763dbb1a86a225758441761e1f638c17fb03e6b309d67',
};
