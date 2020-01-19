// import axios from 'axios';
import Tinode from 'tinode-sdk';

let tinode;

async function connect() {
  let host = window.location.hostname;
  let secure = window.location.protocol === 'https:';
  if (process.env.TINODE_SERVER) {
    const s = process.env.TINODE_SERVER;
    host = s.substr(s.indexOf('://') + 3);
    secure = s.startsWith('wss:');
  }
  const apiKey = process.env.API_KEY;
  const transport = secure ? 'wss' : 'ws';
  tinode = new Tinode('chat-frontend', host, apiKey, transport, secure, 'web');

  if (process.env.NODE_ENV === 'development') {
    tinode.enableLogging(true);
  }

  await tinode.connect();
}

const connected = connect();

const postLogin = () => ({
  token: tinode.getAuthToken(),
  id: tinode.getCurrentUserID(),
});

export async function relogin(token) {
  await connected;
  await tinode.loginToken(token);
  return postLogin();
}

export async function login(un, pw) {
  await connected;
  await tinode.loginBasic(un, pw);
  return postLogin();
}

const b64EncodeUnicode = (str) => btoa(
  encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(`0x${p1}`),
  ),
);

export async function register(un, pw) {
  await connected;
  await tinode.createAccount(
    'basic',
    b64EncodeUnicode(`${un}:${pw}`),
    false,
  );
}

export function getTopic(topic) {
  return tinode.getTopic(topic);
}

export function publish(topic, data) {
  if (typeof data !== 'string') {
    // eslint-disable-next-line no-console
    console.error(data);
    return undefined;
  }

  const pkt = tinode.initPacket('pub', topic);
  pkt.pub.noEcho = false;
  pkt.pub.content = data;

  return tinode.publishMessage(pkt.pub);
}
