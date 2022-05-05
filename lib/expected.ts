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

  // 882b49630f108374ad637506e1d38325037859ec
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/2272569195
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/2272569721
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/2272570046
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/2272570838
  // win: https://github.com/vercel/pkg-fetch/actions/runs/2272570360
  'node-v16.15.0-alpine-x64':
    '6669595d6c7d188f426ce9cfb41e091b5e41432e9db5a7c3dbaf39c5054f24fd',
  'node-v16.15.0-linux-x64':
    'b11f7c22761fb60c285cc53a23526df7e7e5566332d3a5dd8298bf95cb9d53d0',
  'node-v16.15.0-linuxstatic-x64':
    'ef959fa67f611047968db182eb11688614b54c3a5af0ad82d148b2b057880dea',
  'node-v16.15.0-macos-x64':
    '3e53acb241d1b9c1d73f3f48a7604c60da4947e4d37651bbec0d06301e2336db',
  'node-v16.15.0-win-arm64':
    '2a9b91485485cf801629e8a07ee9a9f6e44b9ea38e2adc81728c14840cd74dd1',
  'node-v16.15.0-win-x64':
    'b47e0bec43626816d554d6d50d289131ac86a6578da7dd6916208f34a885aa97',

  // 882b49630f108374ad637506e1d38325037859ec
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/2265963455
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/2265963863
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/2265964135
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/2265964580
  'node-v16.15.0-alpine-arm64':
    '5904f35c1a1ebada7ba8160a6a2c556495c429974aaebf6a67b5a93f9dee6da8',
  'node-v16.15.0-linux-arm64':
    'a1e97181839b72f033a837bb9b2772de9303414ec40bae721a4e320d3b904945',
  'node-v16.15.0-linuxstatic-arm64':
    'e7bec9a8aa5d4a96fe571acdfb08da73a29f428dbb8179d3c43454488b5dd594',
  'node-v16.15.0-linuxstatic-armv7':
    'c56d31fae993579ec531e02ef64482fc78dc8053e9f15eaeeb0a1fb2f954060c',
  'node-v16.15.0-macos-arm64':
    '54d08f2a33d08cb873c97f1dfc527f76f0d0700f46bfd619e967f611c0c20112',

  // f0e3aec71bdd9597d9e679a89ea16bc7fecf6e9e
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/2274321593
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/2274321798
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/2274322148
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/2274322529
  // win: https://github.com/vercel/pkg-fetch/actions/runs/2274322330
  'node-v14.19.2-alpine-x64':
    'b5de2317ec128125f8ba929fe83e128105ee2de5d5f5e1360e25745b681b67e4',
  'node-v14.19.2-linux-x64':
    'f77201b1bf2c5cf342c0ad1f954a7ab5a918c2d7a00f29a0b9593fc60eb89c22',
  'node-v14.19.2-linuxstatic-x64':
    '53cf028cd4aaccf6255219cfc9fa58580ed378d5664df2ba63e0b9b844e2f7b8',
  'node-v14.19.2-macos-x64':
    'abbb5293109726354cfb832436ebf4bd708ee3e14235bcd8e1bda7f6fc8354d0',
  'node-v14.19.2-win-arm64':
    '101ff4befbd9bee4fd937a4436dfccafb60c8c62c14b88580450deba1a036359',
  'node-v14.19.2-win-x64':
    'b18e4954fbd986472c2a1e47ba416fd8a2db47166cb482e5b08254abed03a499',
  'node-v18.1.0-alpine-x64':
    '24d51e141a8240185705261942389cc358d7a28baa9b99585d2776447201c0a0',
  'node-v18.1.0-linux-x64':
    '45a2a9eed355991c67ab5ee90c58b09ddaf4b029ab17ca7b92fca3dedeaa9987',
  'node-v18.1.0-linuxstatic-x64':
    'a645ae7501d6a6f7b5a01ef3ca88b54e89aeba2e1424e12cb6f7a28708b935c6',
  'node-v18.1.0-macos-x64':
    'd054a37e808996a3f8e02747be37d7f3b849494b336cef22312926db3d874032',
  'node-v18.1.0-win-arm64':
    '62fa643bab077f6019097b5523467e95eef5b9de9aee38cf542f9d5baf5a0906',
  'node-v18.1.0-win-x64':
    'f60ece45b5e77288d3698d9f15d705f835bce5508fb5a1f7bd8402fd5cacf263',

  // f0e3aec71bdd9597d9e679a89ea16bc7fecf6e9e
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/2265963455
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/2265963863
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/2265964135
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/2265964580
  'node-v14.19.2-alpine-arm64':
    '4fb52691247adb2cd272a70d378d71ce61f329c9be6a9d8b4ef9e0511128e23f',
  'node-v14.19.2-linux-arm64':
    'abf0167b8d8591b0e672a093483ab61c119ba13187e0cb07669bc2af922c59f7',
  'node-v14.19.2-linuxstatic-arm64':
    '06c65d143afb80ebee144943031dcc7a4436de3372e40495b9250afb958c9f0b',
  'node-v14.19.2-macos-arm64':
    'b2e44ef19486831fa7170dbfd7fa8c5ce6581dd998d5f0b31852c1d4d358797a',
  'node-v18.1.0-alpine-arm64':
    'f212a7388641ed5f6bc6e4a799796593f37bab816fd1c8a67d10a4a0a270c6fa',
  'node-v18.1.0-linux-arm64':
    '19220251dc81ee3b2a19985a7bc72a417ebbc6d00190a6ebfa7f81b6cf9763f0',
  'node-v18.1.0-linuxstatic-arm64':
    'c5e20ac95b97606cda429c44aee90c46e72fadb6318f11ce2ceb893590abd173',
  'node-v18.1.0-linuxstatic-armv7':
    '9bd0db13aaed57c07585b114fc702f099a6ac46437334b9c84d7ce1fa3d0f9b7',
  'node-v18.1.0-macos-arm64':
    '3ece077dde3eb5603355f5ae259956496b5b3b055bfda5cca35ce986bca7be1a',
};
