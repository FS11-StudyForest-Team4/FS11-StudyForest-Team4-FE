import React, { useState } from 'react';
import styles from './PasswordModal.module.css';
import { visible, invisible } from '@/assets/images/icons';
import Button from '@/components/button/Button.jsx';
import { authService } from '@/api/';
import { session } from '@/utils';

const PasswordModal = ({
  modalType,
  studyInfo,
  modalClose,
  BTN_ACTIONS,
  userIdUpdate,
}) => {
  // onSuccess: focus 랜더링하기 위해 추가했습니다.
  const { id, title } = studyInfo;
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVal, setPasswordVal] = useState('');
  const BTN_TEXT = {
    habit: '오늘의 습관으로 가기',
    focus: '오늘의 집중으로 가기',
    edit: '수정하러 가기',
    delete: '스터디 삭제',
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setPasswordVal(value);
  };

  const fetchUserCheck = async (id) => {
    const res = await authService.createUserCheck(id, {
      password: passwordVal,
    });
    session.set('userId', res.data?.id);
    userIdUpdate(res.data?.id);
    modalClose();
    BTN_ACTIONS[modalType]?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchUserCheck(id);
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
              onChange={handleInputChange}
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
            {BTN_TEXT[modalType]}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
