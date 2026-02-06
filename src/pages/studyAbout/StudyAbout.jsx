/*
 * 스터디 상세 (/studyAbout)
 */
import React, { useCallback, useEffect, useState } from 'react';
import styles from './StudyAbout.module.css';
import StudyInfo from './studyInfo/StudyInfo';
import Habitlog from './habitLog/Habitlog';
import Focus from '@/pages/focus/Focus';
import Habit from '../habit/Habit';
import { PasswordModal } from '@/components';
import { studyService } from '@/api';
import { Spinner } from '@/components/index';
import { useLocation, useNavigate } from 'react-router';
import { util, session } from '@/utils';

const StudyAbout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/').filter(Boolean).pop();
  const studyId = location.search.slice(1) || id;
  const [studyInfo, setStudyInfo] = useState(null);
  const [studyTab, setStypeTab] = useState('habitLog');
  const [modalType, setModalType] = useState(null);
  const [userId, setUserId] = useState(session.get('userId'));
  const studyCheck = studyId === userId ? true : false;
  const passwordCheck = (!studyCheck && modalType) || modalType === 'delete';

  const refreshStudyInfo = useCallback(async () => {
    try {
      const res = await studyService.getStudyId(studyId);
      setStudyInfo(res);
    } catch (err) {
      console.log('getStudyId err:', err);
    }
  }, [studyId]); 

  useEffect(() => {
    if (!studyId) {
      util.errorAlert('스터디 정보가 확인되지 않습니다.').then((result) => {
        if (result.isConfirmed) navigate('/');
      });
      return;
    }

    refreshStudyInfo();
  }, [studyId, navigate, refreshStudyInfo]);

  const STUDY_TAB_COMPONENTS = {
    habitLog: Habitlog,
    focus: Focus,
    habit: Habit,
  };

  const StudyComponent = STUDY_TAB_COMPONENTS[studyTab];

  const BTN_ACTIONS = {
    habitLog: () => setStypeTab('habitLog'),
    habit: () => setStypeTab('habit'),
    focus: () => setStypeTab('focus'),
    edit: () => navigate(`/study/edit/${id}`),
    delete: () => deleteStudyHandle(id),
  };

  const handleModalType = (type) => {
    setModalType(type);
    if (studyCheck && type !== 'delete') BTN_ACTIONS[type]?.();
  };

  // 스터디 삭제 시 localStorage에 있는 recentStudies도 정리
  // null 방지, localStorage 비어있을 때
  const removeStudyFromRecent = (studyId) => {
    const recents = JSON.parse(localStorage.getItem('recentStudies') || '[]');
    const filtered = recents.filter((elem) => elem.id !== studyId);
    localStorage.setItem('recentStudies', JSON.stringify(filtered));
  };

  const deleteStudyHandle = async (id) => {
    try {
      const res = await studyService.deleteStudy(id);
      util.successAlert(res.message).then(() => {
        if (studyCheck) session.remove(userId);
        navigate(`/`);
      });
      removeStudyFromRecent(id);
    } catch (error) {
      console.log('delteStudy Error:', error);
    }
    setModalType(null);
  };

  if (!studyInfo) {
    return <Spinner />;
  }

  return (
    <div className={styles.studyAboutWrap}>
      <div className={styles.content}>
        <StudyInfo
          studyInfo={studyInfo}
          onModalType={handleModalType}
          studyTab={studyTab}
        />

        {studyTab === 'focus' ? (
          <Focus studyId={studyId} onCompleted={refreshStudyInfo} />
        ) : (
          StudyComponent && <StudyComponent studyId={studyId} />
        )}
        {passwordCheck && (
          <PasswordModal
            modalType={modalType}
            studyInfo={studyInfo}
            modalClose={() => setModalType(null)}
            BTN_ACTIONS={BTN_ACTIONS}
            userIdUpdate={setUserId}
          />
        )}
      </div>
    </div>
  );
};

export default StudyAbout;
