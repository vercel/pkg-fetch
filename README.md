A utility to fetch or build patched Node binaries used by [pkg](https://github.com/vercel/pkg) to generate executables. This repo hosts prebuilt binaries in [Releases](https://github.com/vercel/pkg-fetch/releases).

## Binary Compatibility

| Node                                                          | Platform    | Architectures               | Minimum OS version                                                                |
| ------------------------------------------------------------- | ----------- | --------------------------- | --------------------------------------------------------------------------------- |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | alpine      | x64, arm64                  | 3.7.3, other distros with musl libc >= 1.1.18                                     |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | linux       | x64                         | Enterprise Linux 7, Ubuntu 14.04, Debian jessie, other distros with glibc >= 2.17 |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | linux       | arm64                       | Enterprise Linux 8, Ubuntu 18.04, Debian buster, other distros with glibc >= 2.27 |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | linuxstatic | x64, arm64                  | Any disto with Linux Kernel >= 2.6.32 (>= 3.10 strongly recommended)              |
| 10<sup>[[1]](#fn1)</sup>, 12, 14, 16                          | linuxstatic | armv7<sup>[[2]](#fn2)</sup> | Any disto with Linux Kernel >= 2.6.32 (>= 3.10 strongly recommended)              |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | macos       | x64                         | 10.13                                                                             |
| 14, 16                                                        | macos       | arm64<sup>[[3]](#fn3)</sup> | 11.0                                                                              |
| 8<sup>[[1]](#fn1)</sup>, 10<sup>[[1]](#fn1)</sup>, 12, 14, 16 | win         | x64                         | 8.1                                                                               |
| 14, 16                                                        | win         | arm64                       | 10                                                                                |

<em id="fn1">[1]</em>: end-of-life, may be removed in the next major release.

<em id="fn2">[2]</em>: best-effort basis, not semver-protected.

<em id="fn3">[3]</em>: [mandatory code signing](https://developer.apple.com/documentation/macos-release-notes/macos-big-sur-11_0_1-universal-apps-release-notes) is enforced by Apple.
