import { useState } from 'react';
import { useNavigate } from 'react-router';
import style from './StudyCreate.module.css';
import { util } from '@/utils';
import { StudiesService } from '@/api/api';

import {
  Textarea,
  Input,
  BackgroundOption,
} from './components/componentsIndex';
import { Button } from '@/components';

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
    const { passwordCheck: _passwordCheck, ...submitData } = formData;

    if (formData.password.length < 4) {
      util.errorAlert('비밀번호를 4자리 이상 적어주세요!');
      return;
    }

    try {
      const res = await StudiesService.createStudy(submitData);
      const { id } = res.data;

      if (res.status === 201) {
        util.successAlert('스터디 등록이 성공하셨습니다!').then(() => {
          navigate(`/study/about/${id}`);
        });
      }
    } catch (error) {
      console.error('스터디 등록 실패:', error);
      util.errorAlert('스터디 등록 실패');
    }
  };

  return (
    <section className={style.createWrap}>
      <div className={style.container}>
        <h1>스터디 만들기</h1>
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

          <Button type="submit" className={'createBtn'}>
            만들기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default StudyCreate;
