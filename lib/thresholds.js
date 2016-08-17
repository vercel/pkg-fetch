/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */

import assert from 'assert';

export default function thresholds (cmd, nodeVersion) {
  if (cmd === 'clone') {
    return {
      'ving objects:   0%':  0, 'ving objects:   1%':  1, 'ving objects:   6%':  5,
      'ving objects:  12%': 10, 'ving objects:  25%': 20, 'ving objects:  50%': 40,
      'ving objects:  75%': 60,       'deltas:   0%': 80,       'deltas:  50%': 90
    };
  } else
  if (cmd === 'vcbuild') {
    if (/^v?0/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1, 'openssl.vcxproj ->': 9,
        'v8_base.vcxproj ->': 55, 'mksnapshot.vcxproj ->': 76,
        'node\\Release\\node.exp': 90
      };
    } else
    if (/^v?4/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1, 'hydrogen-representation-changes.cc': 13,
        'openssl.vcxproj ->': 21, 'v8_base_0.vcxproj ->': 35,
        'build\\Release\\mksnapshot.lib': 57, 'mksnapshot.vcxproj ->': 67,
        'node\\Release\\node.exp': 85, 'cctest.vcxproj ->': 97
      };
    } else
    if (/^v?6/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1, 'openssl.vcxproj ->': 4,
        'icudata.vcxproj ->': 10, 'hydrogen-representation-changes.cc': 15,
        'interface-descriptors-x64.cc': 27, 'v8_base_0.vcxproj ->': 41,
        'build\\Release\\mksnapshot.lib': 55, 'mksnapshot.vcxproj ->': 66,
        'node\\Release\\node.exp': 82, 'cctest.vcxproj ->': 95
      };
    } else {
      return {};
    }
  } else
  if (cmd === 'make') {
    return {
      'v8_base/deps/v8/src/date.o.d.raw': 50
    };
  } else {
    assert(false);
  }
}
