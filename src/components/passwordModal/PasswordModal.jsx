import React, { useState } from 'react';
import styles from './PasswordModal.module.css';
import { useNavigate } from 'react-router';
import { visible, invisible } from '@/assets/images/icons';
import Button from '@/components/button/button';
import { StudiesService } from '@/api/api';
import { util, session } from '@/utils';

const PasswordModal = (props) => {
  const { type, studyInfo, modalClose, onSuccess } = props; // onSuccess: focus 랜더링하기 위해 추가했습니다.
  const { id, password, title } = studyInfo;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVal, setPasswordVal] = useState('');
  const BTN_TEXT = {
    habit: '오늘의 습관으로 가기',
    focus: '오늘의 집중으로 가기',
    edit: '수정하러 가기',
    delete: '스터디 삭제',
  };

  const deleteStudyHandle = async (id) => {
    try {
      const res = await StudiesService.deleteStudy(id);

      console.log('res:', res.status); //에러 나서 백엔드 서버 체크 필요
    } catch (error) {
      console.log('delteStudy Error:', error);
    }
    modalClose();
  };

  const BTN_ACTIONS = {
    habit: () =>
      navigate('/study/habit', {
        state: {
          studyId: id,
        },
      }),
    focus: () =>
      navigate('/study/focus', {
        state: {
          studyId: id,
        },
      }),
    edit: () =>
      navigate('/study/edit', {
        state: {
          studyInfo: studyInfo,
        },
      }),
    delete: () => deleteStudyHandle(id),
  };

  const onInputHandler = (e) => {
    const { value } = e.target;
    setPasswordVal(value);
  };

  const userCheckHandle = async () => {
    try {
      const res = StudiesService.userCheck(id, { password: passwordVal });
      const { token } = res.data;
      if (res.success) {
        session.set('auth-token', token); //토큰 체크

        BTN_ACTIONS[type]?.();
      }
    } catch (err) {
      console.log('userCheckErr:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordVal) {
      await util.errorAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (type === 'focus') {
      onSuccess?.('focus');
      return;
    }
    userCheckHandle();
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBox}>
        <button onClick={modalClose} className={styles.btnClose}>
          나가기
        </button>
        <h1>{title}</h1>
        <p>권한이 필요해요!</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.formInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={passwordVal}
              onChange={onInputHandler}
              placeholder="비밀번호를 입력해 주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordBtn}
            >
              <img
                src={showPassword ? visible : invisible}
                alt="비밀번호 보이기"
              />
            </button>
          </div>

          <Button type="submit" disabled={false}>
            {BTN_TEXT[type]}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
