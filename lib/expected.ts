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

  // 9a76f1652461486d3ac94061e00c070a7b4f6f4d
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/1680407977
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/1680408179
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/1680408430
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/1680409643
  // win: https://github.com/vercel/pkg-fetch/actions/runs/1680408990
  'node-v12.22.9-alpine-x64':
    '291a076551bb3bca02a438fc188452b35f3ee81a036c25ae0855c578bcdf6d3e',
  'node-v12.22.9-linux-x64':
    'c9fe47e1840556b0a8e4e2c936c8b391ca5ae0237ab99b626076b79de853e63a',
  'node-v12.22.9-linuxstatic-x64':
    'f579d3385657ac0eca971df47029501f6f487d9545737361fdecb92c716110c1',
  'node-v12.22.9-macos-x64':
    '955499cf45aa8b0a05e442781ee0fbb22505bfecae653814001933971dd3638e',
  'node-v12.22.9-win-x64':
    'b30a5da69aeb75f58a9087ca01dc7a74ffa903e16c3101d248e21dda19767a2d',
  'node-v14.18.3-alpine-x64':
    '9a580d6f69eec725702893c37e898041d9d688d5bff2e2d449f9ebe28b3ed14b',
  'node-v14.18.3-linux-x64':
    '63b0e96005077a6276e5641af324e5ca9d457c3a30a0b7652ff07acf02e5e8f2',
  'node-v14.18.3-linuxstatic-x64':
    '037a1a3c33ca0e2494a9fefb3e3ef6e2d2da4a09b1c1548b71f00c09a8c73019',
  'node-v14.18.3-macos-x64':
    '35ab3f2972385f1a3e824eedc84b1c8f92592d26cab5206cc762073a76a5e124',
  'node-v14.18.3-win-arm64':
    'c09258c4ed7b61de02a8dd386b78e9f0d5e9d68f2f65c0a8f7a95ba8010d2541',
  'node-v14.18.3-win-x64':
    'e170fc4a9e0d3346c777bf63c3b85c9d4c80a182a0915e73e81669bead567d80',
  'node-v16.13.2-alpine-x64':
    'c64751908fd1e4b681b31721f4d2243315343d9a810282bd88e574a44515ddd7',
  'node-v16.13.2-linux-x64':
    '086192ec9386033c120c8666910d00d1175c1cae83d68f0553499188358edb0c',
  'node-v16.13.2-linuxstatic-x64':
    'cc728f1e8dab3ec49afe260820b26d3883e02b7c39af203f7ae3c69b7e889f21',
  'node-v16.13.2-macos-x64':
    'f89155f77b43f76b47566eee9187a98be0cbd1b20ab1fa4f7f1649ef0631136e',
  'node-v16.13.2-win-arm64':
    'abb39d8203a9bada637643fa84fc0eb1dc2c47e71410186dc01889878f9d3dc2',
  'node-v16.13.2-win-x64':
    'adbd879f69b232813e7d44b6cba40f540e77cbf0ca0521d04a31e324aa0964df',
  'node-v17.3.1-alpine-x64':
    'f4a68467fb80f8c29dd946e4e487ec7dc03eb88ee75e3989dc2e39041efedf75',
  'node-v17.3.1-linux-x64':
    '8bf6c97ae3e5cadd1feaa5fbad4a926f99ba66c341cbaca708bbc260cd42d459',
  'node-v17.3.1-linuxstatic-x64':
    '21f83438f5a08353a51e1a3084c19926c489aef839fd22b995158c13bfed656d',
  'node-v17.3.1-macos-x64':
    '106f08e5ef9d3cedd33e6d9de50adc0ffe0b0923260bb197aa050ec1730aa668',
  'node-v17.3.1-win-x64':
    '4240a6c5648d3c4562e7162568fa0ec0cf8574314934e72e3795c4c05f83b7d2',

  // 9a76f1652461486d3ac94061e00c070a7b4f6f4d
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/1684079040
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/1684079686
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/1684080279
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/1684635719
  'node-v12.22.9-alpine-arm64':
    '16965f85597f27e0ac027b78bdce79d1eb92d3a6c078c49e9ed78157c3bd7d4a',
  'node-v12.22.9-linux-arm64':
    'ff6cf83f2deeab4862c04b7bd341f65fefe60f6eb6cc4872431b6bd5ae171052',
  'node-v12.22.9-linuxstatic-arm64':
    '8766fa6a13e4d66c49b577410cce8db6ff1de2aee6e45c23f3fa52a88d4c2571',
  'node-v14.18.3-alpine-arm64':
    '15cd60d2766e680af1171df61c61a571410877d77192bde04fa0df8c136ee6fe',
  'node-v14.18.3-linux-arm64':
    'e8418dd77420ce40ad9348dca8332be293d74ed91811a0bb64fcfbcbc5a27809',
  'node-v14.18.3-linuxstatic-arm64':
    '33f8067aa8fd4491e02cef9d1ef2f970043dd7f196b608e568c073afb19a899b',
  'node-v14.18.3-macos-arm64':
    '27b0596440c679ef318a716a0523bdf2b6492cfe1c890d3378f0c8eef84e51b6',
  'node-v16.13.2-alpine-arm64':
    '6ddf561eaf318845966c7329635374e4f25fb8417f1eb12a7940dd7fda4a556e',
  'node-v16.13.2-linux-arm64':
    'f2c1fb8dee09bc76ccc95d1aae39c8ecc557cef4197bb232882e792fdf83634f',
  'node-v16.13.2-linuxstatic-arm64':
    '20d35797afba788144e123a5983f7c2402c48af84384b351f425b4c264b54945',
  'node-v16.13.2-linuxstatic-armv7':
    '9b9b88d26e7cf39e659240c5ff5bcbf55fb5b9909be36dde5acde6607261f6ee',
  'node-v16.13.2-macos-arm64':
    '5d95628393d8217da695d1a14d49138f6624f4e98b32de06f036390617e1c2ab',
  'node-v17.3.1-alpine-arm64':
    '9b3e27becae0d26d0668f9f08d8f735a56ea3e68fa824b4988f46646b2f270c0',
  'node-v17.3.1-linux-arm64':
    '29a8ef43083f95de3acb15e8c14948cc04c00004fdf4e1b4fc64d3054d6cdfa1',
  'node-v17.3.1-linuxstatic-arm64':
    '41d782aa9945f5aa7a77f3243898b7769e78207761be3c8373514e518c5b8da5',
  'node-v17.3.1-linuxstatic-armv7':
    '2f660ba5c5ec405e3f31e0a1188f2bacec3fe217f72083283ae132ec842b2c67',
  'node-v17.3.1-macos-arm64':
    '605f654f7589051cb0fef67ac907469f5102a006335230af7a03ed6cd9a3fd92',
  'node-v17.3.1-win-arm64':
    '8fc32b574a3e574a3fdb9660bc0ac3e8a6b9d993182f33e29477693677a17f4c',
};
