/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */

import assert from 'assert';

export default function thresholds (cmd, nodeVersion) {
  if (cmd === 'clone') {
    return {
      'ving objects:   0%':  0, 'ving objects:   1%':  1, 'ving objects:   5%':  5,
      'ving objects:  10%': 10, 'ving objects:  20%': 20, 'ving objects:  40%': 40,
      'ving objects:  61%': 60, 'ving objects:  81%': 80,       'deltas:   0%': 98
    };
  } else
  if (cmd === 'vcbuild') {
    if (/^v?4/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1, 'openssl.vcxproj ->': 3,
        'icudata.vcxproj ->': 13, 'hydrogen-representation-changes.cc': 20,
        'interface-descriptors-x64.cc': 30, 'v8_base_0.vcxproj ->': 44,
        'build\\Release\\mksnapshot.lib': 57, 'mksnapshot.vcxproj ->': 69,
        'node\\Release\\node.exp': 85, 'cctest.vcxproj ->': 97
      };
    } else
    if (/^v?6/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1, 'openssl.vcxproj ->': 3,
        'icudata.vcxproj ->': 13, 'hydrogen-representation-changes.cc': 20,
        'interface-descriptors-x64.cc': 30, 'v8_base_0.vcxproj ->': 44,
        'build\\Release\\mksnapshot.lib': 57, 'mksnapshot.vcxproj ->': 69,
        'node\\Release\\node.exp': 85, 'cctest.vcxproj ->': 97
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
