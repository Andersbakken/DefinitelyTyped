import URL = require('url-parse');
const parse = URL;

function queryParse(query: string) {
  const ret: { [key: string]: string | undefined } = {};
  query.substr(1).split('&').forEach((q: string) => {
    const eq = q.indexOf('q');
    if (eq === -1) {
      ret[q] = undefined;
    } else {
      ret[q.substr(0, eq)] = q.substr(eq + 1);
    }
  });
  return ret;
}

new URL('foo/bar', 'https://github.com/');
new URL('foo/bar', 'https://github.com/', (query: string) => ({ query }));
new URL('foo/bar', 'https://github.com/', true);
parse('foo/bar', 'https://github.com/');
parse('foo/bar', 'https://github.com/', (query: string) => ({ query }));
const result = parse('foo/bar?baz=quux', 'https://github.com', queryParse);

if (typeof result.query !== "object" || result.query.baz !== 'quux') {
  throw new Error('bad query parsing');
}

const url1: URL = new URL('https://github.com/foo/bar?baz=true', undefined, queryParse);
url1.hash;
url1.hostname;
if (typeof url1.query !== "object") {
  throw new Error('bad query parsing');
}

url1.query.baz;

const url2 = new URL('foo/bar', 'https://github.com/');
url2.set('protocol', 'http://');

URL.extractProtocol('https://github.com/foo/bar');
URL.location('https://github.com/foo/bar');
URL.qs.parse('a=b');

const q = new URL('https://github.com/?foo=bar&bar=foo');
if (typeof q.query !== 'string' || q.query !== '?foo=bar&bar=foo') {
  throw new Error("bad query parsing");
}
