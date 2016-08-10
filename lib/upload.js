import aws from 'aws-sdk';
import fs from 'fs';
import url from 'url';

function remoteToAwsOpts (remote) {
  const { host, pathname } = url.parse(remote);
  if (!(/.amazonaws.com$/.test(host))) {
    throw new Error('Currently only AWS is supported');
  }
  const bucket = host.split('.')[0];
  return { bucket, key: pathname };
}

export default function upload (local, remote) {
  return new Promise((resolve, reject) => {
    // aws credentials are taken from:
    // AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
    const s3 = new aws.S3();
    const { bucket, key } = remoteToAwsOpts(remote);
    const rs = fs.createReadStream(local);
    s3.upload({
      Bucket: bucket,
      Key: key,
      ACL: 'public-read',
      StorageClass: 'REDUCED_REDUNDANCY',
      ContentType: 'binary/octet-stream',
      Body: rs
    }, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}
