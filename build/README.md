# Building binaries

### s390x

```
docker build -t dockcross-s390 -f build/Dockerfile build/
docker run -it --rm -v $PWD:/work dockcross-s390 bash
[root:/work] # npm install
[root:/work] # npm run babel
[root:/work] # npm run bin -- -n node10.4.1 -p linux -a s390x -b -x
```

Node binary will be at `/root/.pkg-cache/v2.5/built-v10.4.1-linux-s390x` or whatever your version is.
