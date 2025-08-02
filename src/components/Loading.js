// src/Loading.js

import React from 'react';
import loading from '../loading.gif'; // Make sure path is correct (relative to this file)

export default function Loading() {
  return (
    <div>
      <img src={loading} alt="Loading" />
    </div>
  );
}
