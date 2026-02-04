
import { useEffect, useState } from 'react';
//컴포넌트, 스타일 import
import style from './StudyCreate.module.css';
import { util } from '@/utils';
import { StudiesService } from '@/api/api';
import {
  Textarea,
  Input,
  BackgroundOption,
} from './components/componentsIndex';
import { Button } from '@/components';

import Textarea from './components/Textarea/Textarea';
import { useNavigate, useParams } from 'react-router';
import Input from './components/Input/Input';
import BackgroundOption from './components/BackgroundOption/BackgroundOption';
import { createStudy, getStudy, updateStudy } from '@/api/studyService';

const StudyCreate = () => {
  const { id } = useParams(); // 있으면 수정
  const isEdit = Boolean(id);

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

  // 수정시 input 채워넣기
  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchStudy = async () => {
      try {
        const data = await getStudy(id);
        setFormData({
          nickName: data.nickName,
          title: data.title,
          description: data.description,
          background: data.background,
          password: '', // 수정 시 비밀번호는 비워두기
          passwordCheck: '', // 확인 필드도 비워두기
        });
      } catch (error) {
        console.error('스터디 상세 조회 실패:', error);
        alert('스터디 정보를 불러오는데 실패했습니다.');
      }
    };
    fetchStudy();
  }, [id, isEdit]);

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
      // API 호출 삼항연산자로 api 호출
      const result = isEdit
        ? await updateStudy(id, dataToSend)
        : await createStudy(dataToSend);

      console.log(isEdit ? '스터디 수정 성공:' : '스터디 등록 성공:', result);
      navigate(`/study/About/${result.id}`);
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
      console.error(isEdit ? '스터디 수정 실패' : '스터디 등록 실패', error);
      alert(isEdit ? '스터디 수정 실패' : '스터디 등록 실패');
    }
  };

  return (
    <section className={style.createWrap}>
      <div className={style.container}>
        <div className={style.createPageTitle}>{isEdit ? '스터디 수정하기' : '스터디 만들기'}</div>
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

          {/* 임시 제출 버튼 */}
          <button type="submit" className={style.submitButton}>
            {isEdit ? '수정하기' : '만들기'}
          </button>
          <Button type="submit" className={'createBtn'}>
            만들기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default StudyCreate;
