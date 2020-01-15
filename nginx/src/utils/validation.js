import _ from 'lodash';

export const required = () => (value) => {
  if (value) return undefined;
  return 'Required.';
};

export const minChar = (m) => (value) => {
  if (value.length >= m) return undefined;
  return `Minimum ${m} characters needed.`;
};

export const maxChar = (m) => (value) => {
  if (value.length <= m) return undefined;
  return `Maximum ${m} characters needed.`;
};

export const alphanumericDash = () => (value) => {
  if (/^[-a-zA-Z0-9]*$/.test(value)) return undefined;
  return 'Only a-z A-Z 0-9 or dash allowed.';
};

export const properLines = () => (value) => {
  const lines = value.split('\n');
  if (!lines.every(_.identity)) return 'No empty lines allowed.';
  if (_.uniq(lines).length !== lines.length) return 'No duplicated lines allowed.';
  return undefined;
};

export const hexChar = () => (value) => {
  if (!value) return undefined;
  if (/^[0-9a-fA-F]*$/.test(value)) return undefined;
  return 'Only 0-9 a-f A-F allowed.';
};

export default (...os) => os.map((o) => (v) => o(v));
