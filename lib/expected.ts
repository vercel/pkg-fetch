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

  // e34c57f612d4cf56646450f75fe38e029ff2b0d6
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/2068735040
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/2068735307
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/2068735697
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/2068736404
  // win: https://github.com/vercel/pkg-fetch/actions/runs/2068736093
  'node-v12.22.11-alpine-x64':
    '2ec8d7b761f03b2172bcf3b1b56c648e844116ab08a5484d7932138c374cf18c',
  'node-v12.22.11-linux-x64':
    '617d58e81711d3a1d34a737db39e751caa05040a1a586e6dd688241cfb3f3eed',
  'node-v12.22.11-linuxstatic-x64':
    '37714fc3ae8b1d0c92b124f8ab353c77e40494075646e43ce8e20bd4038b5b83',
  'node-v12.22.11-macos-x64':
    '5394093f0fd2bb5ea38ee2a5eaec9e00d3d1da9e3f7c3c99c68eecfe17354286',
  'node-v12.22.11-win-x64':
    '24bedd07eb0cad64d505ec731c438765370bbed32d8e1f47129fe3612fadfcdb',
  'node-v14.19.1-alpine-x64':
    '13732511df8abf1a1a5913237c636f14aec70c11815d1300ffa4eddf5ba7e385',
  'node-v14.19.1-linux-x64':
    'ea203f1ed907cb83b0db697f92e75db8514b244ef62850e4ef65617225c926c3',
  'node-v14.19.1-linuxstatic-x64':
    '348a118619a503e39a38517114c17cf52d14921494fdcbcbbc1720faeb0ac8e8',
  'node-v14.19.1-macos-x64':
    'fce3d06f48e23fe68953db8f14254a19bab26a289539e723604d61beeb8f0b27',
  'node-v14.19.1-win-x64':
    '1a047e0ed19e0e3c49c606b564f8251116ff7d931a6c7b71530795e4b035b2fa',
  'node-v16.14.2-alpine-x64':
    '7c511e15ff4fb3804e7efec840d1463fc2f097e730d8fde2ad10e461e4350c03',
  'node-v16.14.2-linux-x64':
    '8fe5316565d6fc759aed4eae650064273567bcfb30d841b75b18ffb396a4babc',
  'node-v16.14.2-linuxstatic-x64':
    '201d896cfdcd3b3c36ad4e870c5d50889c7e39b939817d8ff66947a149662e84',
  'node-v16.14.2-macos-x64':
    '5bb0e5fd25bdda12ef510df0a27d468c756535a8341c9f44764bb0bf01d907c3',
  'node-v16.14.2-win-x64':
    'f569a056424242da69e41987b418c3e2eff84a5e2b36601f4ea4babc1dca2eb0',
  'node-v17.8.0-alpine-x64':
    '20fb81ce9ef3720f778335ef00810689e7086da68b26f1f91d136c187a1dfcfd',
  'node-v17.8.0-linux-x64':
    'b90ff72a682fb4c6497d719d7106c26819ee1c856690f773af2a451f97544a5d',
  'node-v17.8.0-linuxstatic-x64':
    '010bc1a6521f29a2cfe66451c1f1590be06487598493e1dbee074e87c1a66086',
  'node-v17.8.0-macos-x64':
    '59d2fdc02f65368150ca7f85c8876739d439d251891d19fe522c1732e0246acb',
  'node-v17.8.0-win-arm64':
    'a8fcdcf963d753c94f651ae22440951a4642563fdfe7b9bc1fde867c457d68a4',
  'node-v17.8.0-win-x64':
    '72c3954289906138bb1cecaf9cbe2300ac79d8acbd696878dd6fdc668b42cc3c',

  // e34c57f612d4cf56646450f75fe38e029ff2b0d6
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/2068737927
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/2068738228
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/2068738548
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/2068742592
  'node-v12.22.11-alpine-arm64':
    '0933ab559bb34c720f0a7e0066f32608960a4d6290977c3af15529f7abfe7265',
  'node-v12.22.11-linux-arm64':
    '3a50d85ebd5ba7e1e62165b9df237925789ef9ed0ed92fd9d0f3a9df7503f751',
  'node-v12.22.11-linuxstatic-arm64':
    '0c5b03cbe32ce50f16dbb35769a2a897b30e8fdb2137c4799edb55898b475622',
  'node-v14.19.1-alpine-arm64':
    '7aedf308cbeea16ea53b9504a1f8e6a82df45715fd7d24825532c02ddc352600',
  'node-v14.19.1-linux-arm64':
    'e855878f41eef48090595666635b640a264bdbc9013337d81eae7b92dcf41799',
  'node-v14.19.1-linuxstatic-arm64':
    '37d37ffca8e5eeeecf4d913ecc878b0ea692e866c347999a035f8a6fd24ccb0d',
  'node-v14.19.1-macos-arm64':
    'b7e654b7342a88f7b3fcc95f0671b90ef4c886e0845892ef4cdd330f5e1ae465',
  'node-v14.19.1-win-arm64':
    'ac69e916ff2e685cf44d08738dab4d6b56aae61eb103a87dac4e43b1761b1069',
  'node-v16.14.2-alpine-arm64':
    '36883b255b409d3500c88941a79d4f2f6495c8ea22fe1a2e2ed6b27ed4cbe593',
  'node-v16.14.2-linux-arm64':
    '0e2c27ca543df3f6160255db873d60ea57b8741df5bb804cea53b1404b5cb6cd',
  'node-v16.14.2-linuxstatic-arm64':
    'da3c99a110b6e1f4eed8ef94572f24c8cddf62b2036b8c04d6a2825f915f3938',
  'node-v16.14.2-linuxstatic-armv7':
    '0058929c765808d3f63e63b8f2b4f5683f294cf748b3799862216de2aad3214d',
  'node-v16.14.2-macos-arm64':
    '44e50e83df71b88af22120170ef466fca6074bf493998769cd11bac315280317',
  'node-v16.14.2-win-arm64':
    '24ad32a8902a79e12367f6409accd61bcc55765bdbcaf1b56849a3d698fd155c',
  'node-v17.8.0-alpine-arm64':
    '8fefac033ae3658c759c7ee9e9a456cb4f2f79af572be221a67b569181372f4a',
  'node-v17.8.0-linux-arm64':
    'b12cac5e8f206d40dcce5df983a8ad3be31b96b102962dc98888f795c5f53904',
  'node-v17.8.0-linuxstatic-arm64':
    '334ec74f2ccb7945900b3159c3b1d17d5f516344594eee5e9fdc1f62264c2fb6',
  'node-v17.8.0-linuxstatic-armv7':
    '2ac8f8f3fa5247821ad206e53af114681ad3faa1fbe9e8bbcd18a72f4708ad23',
  'node-v17.8.0-macos-arm64':
    'd7feacab87bb946aa4199a894659e5ca35fc51cca64ecc4423d312896968ba95',
};
