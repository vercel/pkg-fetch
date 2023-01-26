A utility to fetch or build patched Node binaries used by [pkg](https://github.com/vercel/pkg) to generate executables. This repo hosts prebuilt binaries in [Releases](https://github.com/vercel/pkg-fetch/releases).

## Binary Compatibility

| Node                                                                              | Platform    | Architectures             | Minimum OS version                                                                |
| --------------------------------------------------------------------------------- | ----------- | ------------------------- | --------------------------------------------------------------------------------- |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | alpine      | x64, arm64                | 3.7.3, other distros with musl libc >= 1.1.18                                     |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | linux       | x64                       | Enterprise Linux 7, Ubuntu 14.04, Debian jessie, other distros with glibc >= 2.17 |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | linux       | arm64                     | Enterprise Linux 8, Ubuntu 18.04, Debian buster, other distros with glibc >= 2.27 |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | linuxstatic | x64, arm64                | Any distro with Linux Kernel >= 2.6.32 (>= 3.10 strongly recommended)             |
| 16, 18                                                                            | linuxstatic | armv7<sup>[2](#fn2)</sup> | Any distro with Linux Kernel >= 2.6.32 (>= 3.10 strongly recommended)             |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | macos       | x64                       | 10.13                                                                             |
| 14, 16, 18                                                                        | macos       | arm64<sup>[3](#fn3)</sup> | 11.0                                                                              |
| 8<sup>[1](#fn1)</sup>, 10<sup>[1](#fn1)</sup>, 12<sup>[1](#fn1)</sup>, 14, 16, 18 | win         | x64                       | 8.1                                                                               |
| 14, 16, 18                                                                        | win         | arm64                     | 10                                                                                |

<em id="fn1">[1]</em>: end-of-life, may be removed in the next major release.

<em id="fn2">[2]</em>: best-effort basis, not semver-protected.

<em id="fn3">[3]</em>: [mandatory code signing](https://developer.apple.com/documentation/macos-release-notes/macos-big-sur-11_0_1-universal-apps-release-notes) is enforced by Apple.

## Security

We do not expect this project to have vulnerabilities of its own. Nonetheless, as this project distributes prebuilt Node.js binaries,

**Node.js security vulnerabilities affect binaries distributed by this project, as well.**

Like most of you, this project does not have access to advance/private disclosures of Node.js security vulnerabilities. We can only closely monitor the **public** security advisories from the Node.js team. It takes time to build and release a new set of binaries, once a new Node.js version has been released.

**It is possible for this project to fall victim to a supply chain attack.**

This project deploys multiple defense measures to ensure that the safe binaries are delivered to users:

- Binaries are compiled by [Github Actions](https://github.com/vercel/pkg-fetch/actions)
  - Workflows and build logs are transparent and auditable.
  - Artifacts are the source of truth. Even repository/organization administrators can't tamper them.
- Hashes of binaries are hardcoded in [source](https://github.com/vercel/pkg-fetch/blob/HEAD/lib/expected.ts)
  - Origins of the binaries are documented.
  - Changes to the binaries are logged by VCS (Git) and are publicly visible.
  - `pkg-fetch` rejects the binary if it does not match the hardcoded hash.
- GPG-signed hashes are available in [Releases](https://github.com/vercel/pkg-fetch/releases)
  - Easy to spot a compromise.
- `pkg-fetch` package on npm is strictly permission-controlled
  - Only authorized Vercel employees can push new revisions to npm.

## Contributing Updates to Patches

### Example workflow for applying patches to a new version of Node.js (18.13.0)

1. Clone Node.js as a sibling to your current `pkg-fetch` clone

- `git clone https://github.com/nodejs/node.git`
- `cd node`

2. Checkout the tag you wish to generate a patch for

- `git checkout v18.13.0`

3. Attempt to apply the closest patch (e.g. applying the existing patch for
   18.12.1 when trying to generate a new patch for 18.13.0)

- `git apply ..\pkg-fetch\patches\node.v18.12.1.cpp.patch --reject`

4. If no rejects, great! you are ready to make your new patch file.

- `git add -A`
- `git diff --staged --src-prefix=node/ --dst-prefix=node/ > ..\pkg-fetch\patches\node.v18.13.0.cpp.patch`

5. If rejects exist, resolve them yourself, and ensure all changes are saved,
   and repeat step 4 to export the patch file

#### Resolving Rejects

Usually when a patch is rejected, it's because the context around the changes
was refactored slightly since the last patched version. This is not usually
complicated to resolve, but requires a human to interpret the changes since the
last version `pkg` was patched against, compared with the version you wish to
create a patch for.

One method is to pull up the diff for the file where the rejects apply for the
changes between the last tag (e.g. v18.12.1 to use the previous example) and the
tag you want a patch for (e.g. v18.13.0 to use the previous example). Alongside
this, have the `.rej` file and go through each rejected hunk by hunk and use
your best judgement to determine how it should apply against the new tag.

Save you results, and export the overall git diff with the commands from the
example above.

### Checking that patches apply cleanly

The expectation is that a patch applies cleanly, with no delta or offsets from
the source repo.

When making a change to a patch file, it is possible to apply that patch without
building by running

`yarn applyPatches --node-range node18`

where the `--node-range` can be specified to apply patches for the version of
node for which you are updating patches. If unspecified, the latest node version
in [patches.json](./patches/patches.json) will be used.

Ultimately, the patch should result in fully functional node binary, but the
`applyPatches` script can be used to quickly iterate just the application of
the patches you are updating without needing to wait for the full build to
complete.

## Building a Binary Locally

You can use the `yarn start` script to build the binary locally, which is helpful
when updating patches to ensure functionality before pushing patch updates for
review.

For example:

`yarn start --node-range node18 --arch x64 --output dist`
