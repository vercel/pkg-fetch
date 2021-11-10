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

  // 64b8302a3a97dd522f8eda15f32eaeca5e2ad390
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/1371209280
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/1371209445
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/1371209665
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/1371209867
  // win: https://github.com/vercel/pkg-fetch/actions/runs/1371209769
  'node-v12.22.7-alpine-x64':
    'aa8ada4bc891c32451d80291b19d9136291892276e964bb114e8d247b05eaaf4',
  'node-v12.22.7-linux-x64':
    'a3ab3c660bc66d145e97568d7b3b7294102b1e73e11c7c3d4c739b6b31de3a7f',
  'node-v12.22.7-macos-x64':
    '38b3ad6e1eeca977ac9bc3f84887a1af622aa5e00e33a608f9380f724a89ce47',
  'node-v12.22.7-win-x64':
    '1e42e8fbe2e3f03465339b7ce7e4d46ff2b07a033ef4033d7b4bf1a756193323',
  'node-v14.18.1-alpine-x64':
    '1fd4f4c88499a163c1f3a03e9f90d9c184c0cedf3a0c76afa5d8d696aa6704f7',
  'node-v14.18.1-linux-x64':
    'ed52e9a85cc67d21ca76de8a0cfc244a6e2d022674901826d068890f735ec035',
  'node-v14.18.1-macos-x64':
    '048691176a4f0ab36b6cf0db6f26da821cc75c16eab83b8f37523ce7c9315db9',
  'node-v14.18.1-win-arm64':
    'adfb3fa7537cf8660bdbb24a1141ae37331de0062361422ed6a45a267610dd34',
  'node-v14.18.1-win-x64':
    '09247d60d315179a5459da62d854cc96e0d6089843ba890324fd366663d0250a',
  'node-v16.12.0-alpine-x64':
    'b09714a76669a9163bbe7243f755df2cfa68f226f279ac9a6ae59a7bfd0f392a',
  'node-v16.12.0-linux-x64':
    '8ea070c546b1ba0ab1f2c6c0a0d9782348234b9c6be9c1a0e5c947ce27ffabdd',
  'node-v16.12.0-linuxstatic-x64':
    'dad5370e286b5892660f736e62ac6bf4c01ad6edc0f2ecfb3e5d4b82eb72f0eb',
  'node-v16.12.0-macos-x64':
    'e94ca55fe4a1e06dcae99c52f34d66f6aa432b1642c9cce9ab0279f82f53f4dc',
  'node-v16.12.0-win-arm64':
    'e366712bff4451dbfc6c9e98526d86a74d21c8f8690fa40acf048054bd923d72',
  'node-v16.12.0-win-x64':
    '556ba382013915c59c9c52e377d8d6c3dee8af1be7ed0ab3627c24d389b36d86',

  // 64b8302a3a97dd522f8eda15f32eaeca5e2ad390
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/1371211070
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/1371211270
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/1371211351
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/1371553582
  'node-v12.22.7-alpine-arm64':
    '598b34a8cd9c4795e3aa08c4fc10019dfa8f0c8d91823cf4facb61159e35364b',
  'node-v12.22.7-linux-arm64':
    '74da0f664484514654b1d91f1aad4c452861a328f9246899fc378f859aeafe02',
  'node-v14.18.1-alpine-arm64':
    'bed4249f0c69230501c89e8f567184cc34a356953c8b41bee6b495cdaa40be33',
  'node-v14.18.1-linux-arm64':
    '228212891160ed37141968740eaa200f6f4c5680ee93a32f82ac69b770cda12c',
  'node-v14.18.1-macos-arm64':
    '376929e46d170ccb915b390206df94acd3356768d5ad60a68afe0f92303e312f',

  // da210e4c6f564f5b14f9c39d56b36018a27311eb
  // alpine: https://github.com/vercel/pkg-fetch/actions/runs/1431923424
  // linux: https://github.com/vercel/pkg-fetch/actions/runs/1431923492
  // linuxstatic: https://github.com/vercel/pkg-fetch/actions/runs/1431923687
  // macos: https://github.com/vercel/pkg-fetch/actions/runs/1431923825
  // win: https://github.com/vercel/pkg-fetch/actions/runs/1431923755
  'node-v12.22.7-linuxstatic-x64':
    '7ab19859ef5c3d5e1a139e2737cf7a0cdd824bf176a87f3d33686b9c5334599b',
  'node-v14.18.1-linuxstatic-x64':
    '856038cbdb5b708f2b5c8fbd2b3d208f05f9d190cd8c4a90a5bef853d36570ca',
  'node-v16.13.0-alpine-x64':
    'bca99d5335ac56935efcbf78a369ab36e6debc65f3ae6198d6fdcf12139da068',
  'node-v16.13.0-linux-x64':
    '89003cde2f27810a37df3d692babe335bc1db017f590da6126265a3edbd4c92a',
  'node-v16.13.0-linuxstatic-x64':
    'b457d8f54938873ef018e64174bd60b7a056b9a9bb92c985053c4c056aac61b8',
  'node-v16.13.0-macos-x64':
    '426b05baecf10cd08c030c679ed18c9b463d2d8ee68692482ec5e711373d8519',
  'node-v16.13.0-win-arm64':
    '121ec553a714c2345ef739e5c89a44bcb059f1dd773f6c7d8a655bab89c1c3e9',
  'node-v16.13.0-win-x64':
    '3a37c3f454e422e5245997b1d1d95a754f2d669ae5b3e2edbb5263a2dee562e7',

  // da210e4c6f564f5b14f9c39d56b36018a27311eb
  // alpine: https://github.com/jesec/pkg-fetch/actions/runs/1431928866
  // linux: https://github.com/jesec/pkg-fetch/actions/runs/1431928926
  // linuxstatic: https://github.com/jesec/pkg-fetch/actions/runs/1431929001
  // macos: https://github.com/jesec/pkg-fetch/actions/runs/1431929158
  'node-v12.22.7-linuxstatic-arm64':
    '9c1f85534fa7daeb13b52cd3c98bf86f1419a56a522ab0a31bef608fa28280a4',
  'node-v14.18.1-linuxstatic-arm64':
    '690e09e5e2f7e18706932c327265c85b9d67084f167fa8f61e93984cfa9a4279',
  'node-v16.13.0-alpine-arm64':
    'e1c687c1b9ab9b022d114a652ce665018536b4d9368aa0cf2df9bd696ce00f96',
  'node-v16.13.0-linux-arm64':
    '3c7e6f0c726c16285a5987fa9292bdd1ff249eaeddd603756fbab7c9ea71998e',
  'node-v16.13.0-linuxstatic-arm64':
    '158dcd4c917e3bbcf0dfebe45ec098ae913cd6c59d92d33ccdfa24a1776bfea4',
  'node-v16.13.0-linuxstatic-armv7':
    'c79b43932593fd49c4260ed08e5ac320b49a2bbed136e0dbe8e43cd013c2d2cb',
  'node-v16.13.0-macos-arm64':
    '3089c39eb48746d20903ea1f16710161e2c2b2f180dd18e8134c47a171f71e8d',
};
