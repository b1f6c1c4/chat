// import axios from 'axios';
import Tinode from 'tinode-sdk';

let tinode;

function connect() {
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

  tinode.connect();
}

connect();

export async function login(un, pw) {
  await tinode.loginBasic(un, pw);
  const me = tinode.getMeTopic();
  me.subscribe({ get: { desc: {}, sub: {} } });
}

const b64EncodeUnicode = (str) => btoa(
  encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(`0x${p1}`),
  ),
);

export async function register(un, pw) {
  await tinode.createAccount(
    'basic',
    b64EncodeUnicode(`${un}:${pw}`),
    false,
  );
}

export function getTopic(topic) {
  return tinode.getTopic(topic);
}
