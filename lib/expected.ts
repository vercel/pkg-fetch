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

  // 27e00d1d72ab4afda203edcd7a4f9601bc1d641c
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/888438143
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/888438190
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/888438236
  'node-v10.24.1-linux-arm64':
    'e3a3e5197e3f3d1063e3178786890b29493b8dfc31362f3417cce90ca7eb3e98',
  'node-v10.24.1-linuxstatic-armv7':
    '4933be03e394a82f5aa5fc4600b29392b2ce7eac24bd2ef8759f9a8e8c841990',

  // 55a34ad0afe75749a14260c45d39cc9b265995ed
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/918633749
  'node-v10.24.1-macos-x64':
    'f2e4679262a1cc6f3213cc4f0453d662e48c021975b651534fcbf26d6fdab474',

  // 159bce969c61ad7364534b7b89702c857c5108a3
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/990918235
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/990918537
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/990918728
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/990919084
  // win: https://github.com/vercel/pkg-fetch/actions/runs/990918906
  'node-v12.22.2-alpine-arm64':
    '145d377ac20b3be49a29e6ee4176357a3534595c00b67c3fed9d116850b86d2a',
  'node-v12.22.2-alpine-x64':
    '0f52771e9452d082acf6d84a8eba01c21c478e382588a219455134b4c279741e',
  'node-v12.22.2-linux-arm64':
    '7e32396abf45703a71d7f74c129fe054551d81acf1697987b2d63544803966a1',
  'node-v12.22.2-linux-x64':
    'edadbdf12301914a67eaa0f9898ad21006c9e27417249aa98a8245c253088e5e',
  'node-v12.22.2-linuxstatic-arm64':
    '219f4e2defd41a108018b1bdb282791ac647d8a5c67eab07f9d1f37dda1219a1',
  'node-v12.22.2-linuxstatic-armv7':
    '714e12bf4a9748df87ed97fe750ddcfc7d66018ba710fef675237a055b1dbb72',
  'node-v12.22.2-linuxstatic-x64':
    'ec012dc0271103cac7f1cc191d8bccab2dbe842a5e1ffd03334d316632943307',
  'node-v12.22.2-macos-x64':
    'e0919c9a518e9693c57722cad91998dfc6e86b4dac787012c5ae4dbd720bb870',
  'node-v12.22.2-win-x64':
    'e3bb6089a2334241b604e3e62d3c1106dacd8652571fc9809b3f469c5f74b4b4',
  'node-v14.17.2-alpine-arm64':
    'a352e40e627dfb8825a64eaa215e63ea4043af17f1fb7ac819906855d835fc41',
  'node-v14.17.2-alpine-x64':
    'c007bcdc457622bb70d6ededc807c793da620a125e23963bef6b7fa29c40679b',
  'node-v14.17.2-linux-arm64':
    '549f5aa57f2e9acba0b570a17a6ef9edeacee578068af9e7bbd05bb105096438',
  'node-v14.17.2-linux-x64':
    'b0d2ca9851229d7b0383b1932630d7527a4e586ae2484f2b6abe416fb42dae44',
  'node-v14.17.2-linuxstatic-arm64':
    '0f8e599be7b667df4c1013ac361c00d06ada53023a386f418f599b09059d62bd',
  'node-v14.17.2-linuxstatic-armv7':
    '4949950b10184dcc6e033d8e92f66710fc872214ac17a29905303be6c81882f7',
  'node-v14.17.2-linuxstatic-x64':
    'ffcc954675682b0eb6549c2ca9d5890563b256994c3dd6a4baf98f968687e716',
  'node-v14.17.2-macos-x64':
    '644a69cfedaccd1734848f65f6337a38cc303c5ffcba6efec7add76b65c1b87e',
  'node-v14.17.2-win-arm64':
    '375bca77ddffcd7f572511bd31ea6987861ec3b58c04657bb961fdc4aada378b',
  'node-v14.17.2-win-x64':
    '8f37f9b968ffb34eee2173bab1d809d6489715a4e316f32b71c52b2fd99ff09b',
  'node-v16.4.1-alpine-arm64':
    '8dcd45eab0cd63c001276c93902709e774a5600113d9963e69d29f228ba8cfea',
  'node-v16.4.1-alpine-x64':
    '127ab4d0bc04b721560a14a8c028cc82bc8182a2a0fcb7b7cca1ca4c0534b6fa',
  'node-v16.4.1-linux-arm64':
    '43ae18ae5abf978c41f8f588abd7353da4d24761a0d990f578e9f02f4b2104d7',
  'node-v16.4.1-linux-x64':
    '42a4d2196330716ed0341e06836e39193d36f0cae94dde28745da523c480def1',
  'node-v16.4.1-linuxstatic-arm64':
    '3ac8e2a437299eefd5ef7ee7ae1e8b96675e468e11255b226f436c46969b11ba',
  'node-v16.4.1-linuxstatic-armv7':
    'd1508fbdca642ece9678456ed1c0dc61e2a41fdae7ef8db1e58933d0e87e2f01',
  'node-v16.4.1-linuxstatic-x64':
    'bba59a5619a991e485510e529285f52837e575f23b339b7293e9b33cf934a5ec',
  'node-v16.4.1-macos-x64':
    'e2a9f6ccebab429422203575560a2413cd8e4eddb605c851bbbb4a0deff11a7b',
  'node-v16.4.1-win-arm64':
    'ba3b430c63c36e42f6b61ad5c8fe5bb28e0c31ef9b3df3f55ccdbb742fd2ca55',
  'node-v16.4.1-win-x64':
    '508fe4ed6c59460562da077983cea55e7dcaf764a39c2239ad837aee17de034c',

  // 159bce969c61ad7364534b7b89702c857c5108a3
  // manual
  'node-v14.17.2-macos-arm64':
    'd850dc2a4bb315df497498812b43885ff5d05b2943128687ed4f95510aca44e1',
  'node-v16.4.1-macos-arm64':
    '86dd0d3dd1b8ce3b233ba70c887bd120577660b00b097c59db454d307595bc3b',
};
