import { useState } from 'react';
//컴포넌트, 스타일 import
import style from './StudyCreate.module.css';

import Textarea from './components/Textarea/Textarea';
import { Navigate, useNavigate } from 'react-router';
import Input from './components/Input/Input';
import BackgroundOption from './components/BackgroundOption/BackgroundOption';
import { createStudy } from '@/api/studyService';

const StudyCreate = () => {
  //입력값 관리
  const [formData, setFormData] = useState({
    nickName: '',
    title: '',
    description: '',
    background: 'GREEN', // 기본값
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 검증 목록
  const validators = {
    nickName: (value) => (value.trim() ? '' : '*닉네임을 입력해주세요'),
    title: (value) => (value.trim() ? '' : '*스터디 이름을 입력해주세요'),
    password: (value) => (value ? '' : '*비밀번호를 입력해주세요'),
    passwordCheck: (value, formData) =>
      value === formData.password ? '' : '*비밀번호가 일치하지 않습니다',
  };
  // 개별 필드 검증
  const validateField = (name, value) => {
    const validator = validators[name];
    if (!validator) return;

    setErrors((prev) => ({
      ...prev,
      [name]: validator(value, formData) || undefined,
    }));
  };

  // 모든 필드 검증 (submit 시)
  const validateAll = () => {
    const newErrors = {};
    Object.keys(validators).forEach((name) => {
      const error = validators[name](formData[name], formData);
      newErrors[name] = error || undefined;
    });
    setErrors(newErrors);

    // 모든 필드 유효하면 true 반환
    return Object.values(newErrors).every((err) => !err);
  };

  //handleChange (Input에서 사용)
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // BackgroundOption 전용 handler
  const handleBackgroundChange = (selectedId) => {
    setFormData((prev) => ({ ...prev, background: selectedId }));
  };
  
  // submit 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 새로고침 방지

    const isValid = validateAll(); //전체검증
    if (!isValid) return;

    // passwordCheck만 제외하고 전송
    const { _passwordCheck, ...dataToSend } = formData;
     console.log('createStudy 데이터:', dataToSend);
    try {
      const result = await createStudy(dataToSend); // API 호출
      console.log('스터디 등록 성공:', result);
      navigate(`/study/About/${result.id}`);
    } catch (error) {
      console.error('스터디 등록 실패:', error);
      alert('스터디 등록 실패');
    }
  };

  return (
    <section>
      <div className={style.container}>
        <div className={style.createPageTitle}>스터디 만들기</div>
        <form onSubmit={handleSubmit}>
          <Input
            name="nickName"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickName}
            onChange={handleChange}
            errorMessage={errors.nickName}
          />
          <Input
            label="스터디 이름"
            name="title"
            type="text"
            placeholder="스터디 이름을 입력해주세요"
            value={formData.title}
            onChange={handleChange}
            errorMessage={errors.title}
          />
          <Textarea
            label="소개"
            name="description"
            type="text"
            placeholder="소개 멘트를 작성해주세요"
            value={formData.description}
            onChange={handleChange}
            errorMessage={errors.description}
          />
          <BackgroundOption
            label="배경을 선택해주세요"
            name="background"
            value={formData.background}
            onChange={handleBackgroundChange}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
          />
          <Input
            label="비밀번호 확인"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={formData.passwordCheck}
            onChange={handleChange}
            errorMessage={errors.passwordCheck}
          />

          {/* 임시 제출 버튼 */}
          <button type="submit" className={style.submitButton}>
            만들기
          </button>
        </form>
      </div>
    </section>
  );
};

export default StudyCreate;
