import aws from 'aws-sdk';
import fs from 'fs';

export default function upload (local, remote) {
  return new Promise((resolve, reject) => {
    // aws credentials are taken from:
    // AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN
    const s3 = new aws.S3();
    const rs = fs.createReadStream(local);
  });
}
