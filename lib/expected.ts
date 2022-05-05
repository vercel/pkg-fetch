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
  'node-v14.19.1-alpine-x64':
    '231b80664b2ec1076a29ad4d9fd932bfb94a2e78bf84d013b5db0d22c7b0c504',
  'node-v14.19.1-linux-x64':
    'e1c80ae6277b1239beb5b1a4af0bac435cab9923776862c404c6be4ed73ae142',
  'node-v14.19.1-linuxstatic-x64':
    '7bccffffc09c92776570dab589dfbe0b7ef4da93fcaa132bf1e36660bf1cd9f4',
  'node-v14.19.1-macos-x64':
    '07f57b5fc5f6af0ebbe01a7f084f3c6ebaebf696c3453eda097dd6a3e8e3f4a0',
  'node-v14.19.1-win-arm64':
    'd562823c660d27b352d82afd8b48c32e2dc53ecf058603f854c36dfd465843ba',
  'node-v14.19.1-win-x64':
    '48579c04062b3a3a17aa2d618635435aaf1a8806146ac2070fc73f19cb938762',
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
  'node-v18.1.0-alpine-x64':
    'bace90577bd3e02c013299966eedb60621b653a3b8161d9215b7c9bab8372279',
  'node-v18.1.0-linux-x64':
    'd3fd1bdcbc9bbe7c5cd0bfba489bfff0f8aeeb86a4ca2582096438245ec7bfd3',
  'node-v18.1.0-linuxstatic-x64':
    'bf26b8da30faa7bf22447ab02dd04742bfb8d5a976ff8dd249ac959b5a02cd3d',
  'node-v18.1.0-macos-x64':
    '796d4b1938b81e07012e7de35c731dc23185687802c2ab11c629e96d886d0b73',
  'node-v18.1.0-win-arm64':
    '712befcc81bd84874206ff53570154cea3cdbd1664159c7b8b253b1afbc057e6',
  'node-v18.1.0-win-x64':
    '083cf10d7925755aaca9d7ba1f03e9c55ce5f868ec49f690a8084d6fcc11d1cd',

  // 882b49630f108374ad637506e1d38325037859ec
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/2265963455
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/2265963863
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/2265964135
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/2265964580
  'node-v14.19.1-alpine-arm64':
    '65c10d66d38c13ab5e5c6b97b17eddaa7e72be0fc8bb3be668e82437e100c436',
  'node-v14.19.1-linux-arm64':
    'ea272282922f1903d5acdae5d8b07cc2c849c34ce82d96199930ce212826cc70',
  'node-v14.19.1-linuxstatic-arm64':
    'c306684bd5273b0928cb6e7846c21ea4f0f2ce88abf39062aa2ae009d24f1a6c',
  'node-v14.19.1-macos-arm64':
    'caae3267ea62267e9c688441b2b82d4635d5c28bc2b9e6f496814edcb37363ae',
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
  'node-v18.1.0-alpine-arm64':
    '3bfb4bf09931893896be3ef408591bf66a8289755e139310d180157d2c9b747f',
  'node-v18.1.0-linux-arm64':
    '2eedb7d6c7610822ffc0aeedf4041d8757a3a1548672af457d50aeac1b80ce0b',
  'node-v18.1.0-linuxstatic-arm64':
    '9c2c0d3aed80b92f805095c859c00cba208313eb1fa1f50f8170bd5e04841d3d',
  'node-v18.1.0-linuxstatic-armv7':
    'fb7557aa7b66a03cd3b6ab73b4c41f538d779fc5f2954bd285cad3f87b237a40',
  'node-v18.1.0-macos-arm64':
    '5b8b14e634201513e855edf3e2d5093dc4f14cdb3fccef2526c228fe87a52c53',
};
