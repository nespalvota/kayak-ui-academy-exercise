import { hot } from 'react-hot-loader/root';

import React from 'react';

import Autocomplete from '../autocomplete';

import styles from './app.css';

const App = () => (
  <div className={styles.container}>
    <div className={styles.header}>
        <Autocomplete/> 
    </div>
  </div>
);

export default hot(App);