import { useEffect, useState } from 'react';
//컴포넌트, 스타일 import
import style from './StudyCreate.module.css';
import { util } from '@/utils';
import { studyService } from '@/api';
import {
  Textarea,
  Input,
  BackgroundOption,
} from './components/componentsIndex';
import { Button } from '@/components';
import { useNavigate, useLocation } from 'react-router';

const StudyCreate = () => {
  const location = useLocation();
  const id = location.pathname.split('/').filter(Boolean).pop();
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
    if (!isEdit) return;

    const fetchStudy = async () => {
      try {
        const data = await studyService.getStudyId(id);
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
        util.errorAlert('스터디 정보를 불러오는데 실패했습니다.').then(() => {
          navigate('/');
        });
      }
    };
    fetchStudy();
  }, [isEdit]);

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

    console.log('handle change is nickName?', name);
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
        ? await studyService.updateStudy(id, submitData)
        : await studyService.createStudy(submitData);

      util
        .successAlert(
          isEdit
            ? '스터디 수정이 완료되었습니다!'
            : '스터디 등록이 성공하셨습니다!',
        )
        .then(() => {
          navigate(`/study/about/${result.id}`);
        });
    } catch (error) {
      console.error('studyService Error:', error);
      util.errorAlert(
        isEdit
          ? '스터디 수정이 실패하였습니다.'
          : '스터디 등록이 실패하였습니다.',
      );
    }
  };

  return (
    <section className={style.createWrap}>
      <div className={style.container}>
        <h1>
          {isEdit ? `${formData.title} 스터디 수정하기` : '스터디 만들기'}
        </h1>
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
            {isEdit ? '수정하기' : '만들기'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default StudyCreate;
