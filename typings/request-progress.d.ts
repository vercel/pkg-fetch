declare module 'request-progress' {
  import request from 'request';

  function progress(req: request.Request): request.Request;

  export default progress;
}
