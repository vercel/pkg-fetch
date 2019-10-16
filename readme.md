# pkg-fetch

Github Releases page of this project contains base binaries,
used by `pkg` to create executables. `pkg-fetch` npm package
downloads base binaries or compiles them from source.

# Usage

## Program Arguments

Argument | Description | Example Value
-------- | ----------- | -------------
f  | Forces a fetch
b | Forces a build
s | Use fully static linking
n | Node range | `node10`
p | Platform | `macos`
a  | Architecture | `x64`
