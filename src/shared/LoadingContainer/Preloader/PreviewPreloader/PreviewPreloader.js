import React from 'react';

import roller from './circle.svg';

import style from './PreviewPreloader.module.scss';

const PreviewPreloader = () => (
  <div className={style.previewPreloader}>
    <img src={roller} alt="previewPreloder" width="500" height="450" />
    <h2 className={style.previewText}>Our minions are painting walls, it can take few seconds...</h2>
  </div>
);

export default PreviewPreloader;
