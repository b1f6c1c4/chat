import React from 'react';

export default function Avatar({ enabled }) {
  if (!enabled) return <div />;

  return (
    <div className="avatar" />
  );
}
