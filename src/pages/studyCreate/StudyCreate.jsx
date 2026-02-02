import { useState } from 'react';
//컴포넌트, 스타일 import
import { BackgroundTile } from './components/BackgroundTile/BackgroundTile';
import { InputField } from './components/InputField';
import style from './StudyCreate.module.css';

import Textarea from './components/Textarea/Textarea';
import { Navigate } from 'react-router';
import Input from './components/Input/Input';
import BackgroundOption from './components/BackgroundOption/BackgroundOption';

const StudyCreate = () => {
  //입력값 관리
  const [formData, setFormData] = useState({
    nickname: '',
    title: '',
    description: '',
    background: 'GREEN', // 기본값
    password: '',
    passwordCheck: '',
  });

  //생각을 잘못해서 아래 비동기랑 엮여서 원하는 기능이 안 나옴.. 좀 더 고민해보고 수정하겠습니다
  const [errors, setErrors] = useState({});
  //입력값 반영
  const inputHandle = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
    if (errors[name]) setErrors((data) => ({ ...data, [name]: '' }));
  };

  //form 제출 (다시 작성하기)
  const submit = async (formData) => {
    const data = Object.fromEntries(formData.entries());
    try {
      await postStudy({
        ...data,
      });
      Navigate('/studies');
    } catch (error) {
      console.error(error);
      alert('스터디 등록 실패');
    }
  };

  // //request 전 확인
  // const submitHandle = async () => {
  //   const newErrors = {};
  //   if (!formData.nickname.trim()) newErrors.nickname = '닉네임을 입력해주세요';
  //   if (!formData.title.trim()) newErrors.title = '스터디 이름을 입력해주세요';
  //   if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
  //   if (formData.password !== formData.passwordCheck) {
  //     newErrors.passwordCheck = '*비밀번호가 일치하지 않습니다';
  //   }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     try {
  //       await axios.post('/api/studies', {
  //         nickname: formData.nickname,
  //         title: formData.title,
  //         description: formData.description,
  //         password: formData.password,
  //         background: formData.background,
  //       });
  //       alert('스터디가 생성되었습니다.');
  //     } catch {
  //       alert('스터디 생성에 실패했습니다.');
  //     }
  //   }
  // };

  return (
    <section>
      <div className={style.container}>
        <div className={style.createPageTitle}>스터디 만들기</div>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // 새로고침 방지
            submit(new FormData(event.target));
          }}
        >
          <Input
            label="닉네임"
            name="nickName"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickname}
            onChange={(error) => inputHandle('nickname', error.target.value)}
            errorMessage={errors.nickname}
          />
          <Input
            label="스터디 이름"
            name="title"
            type="text"
            placeholder="스터디 이름을 입력해주세요"
            value={formData.title}
            onChange={(error) => inputHandle('title', error.target.value)}
            errorMessage={errors.title}
          />
          <Textarea
            label="소개"
            name="description"
            type="text"
            placeholder="소개 멘트를 작성해주세요"
            value={formData.description}
            onChange={(error) => inputHandle('description', error.target.value)}
            errorMessage={errors.description}
          />

          <BackgroundOption
            value={formData.background}
            onChange={(bg) =>
              setFormData((prev) => ({
                ...prev,
                background: bg,
              }))
            }
          />

          {/* //수정필요
          <InputField type={'text'} inputTitle={'배경을 선택해주세요'}>
            {BACKGROUND_OPTIONS.map((bg) => (
              <BackgroundTile
                key={bg.id}
                background={bg}
                isSelected={formData.background === bg.id}
                onSelect={(id) => inputHandle('background', id)}
              />
            ))}
          </InputField> */}

          <Input
            label="비밀번호"
            name="password "
            type="password"
            placeholder={'비밀번호를 입력해주세요'}
            value={formData.password}
            onChange={(error) => inputHandle('password', error.target.value)}
            errorMessage={errors.password}
          />
          <Input
            label="비밀번호 확인"
            name=""
            type={'password'}
            placeholder={'비밀번호를 다시 한 번 입력해주세요'}
            value={formData.passwordCheck}
            onChange={(error) =>
              inputHandle('passwordCheck', error.target.value)
            }
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
