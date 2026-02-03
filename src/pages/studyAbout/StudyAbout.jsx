/*
 * 스터디 상세 (/studyAbout)
 */
import React, { useEffect, useState } from 'react';
import styles from './StudyAbout.module.css';
import StudyInfo from './studyInfo/StudyInfo';
import Habitlog from './habitLog/Habitlog';
import { StudiesService } from '@/api/api';
import { Spinner } from '@/components/index';
import { useLocation, useNavigate } from 'react-router';
import { util } from '@/utils';

const StudyAbout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/').filter(Boolean).pop();

  const studyId = location.search.slice(1) || id;

  const [studyInfo, setStudyInfo] = useState([]);

  useEffect(() => {
    if (!studyId) {
      util.errorAlert('스터디 정보가 확인되지 않습니다.').then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }

    const getStudyId = async (studyId) => {
      try {
        const res = await StudiesService.getStudy(studyId);
        if (res.status == 200) setStudyInfo(res.data);
      } catch (err) {
        console.log('err:', err);
      }
    };

    getStudyId(studyId);
  }, [studyId, navigate]);

  return (
    <div className={styles.studyAboutWrap}>
      {studyInfo ? (
        <>
          <StudyInfo studyInfo={studyInfo} />
          <Habitlog studyId={studyId} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default StudyAbout;
