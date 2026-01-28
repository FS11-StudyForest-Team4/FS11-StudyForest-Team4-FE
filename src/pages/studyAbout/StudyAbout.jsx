/*
 * 스터디 상세 (/studyAbout)
 */
import React from 'react';
import styles from './StudyAbout.module.css';
import StudyInfo from './studyInfo/StudyInfo';
import Habitlog from './habitLog/Habitlog';

const StudyAbout = () => {
  return (
    <div className={styles['studyAbout-wrap']}>
      <StudyInfo />
      <Habitlog />
    </div>
  );
};

export default StudyAbout;
