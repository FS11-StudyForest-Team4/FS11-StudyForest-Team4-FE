import { useState } from 'react';
import axios from 'axios';

//컴포넌트, 스타일 import
import { BackgroundTile } from './components/BackgroundTile/BackgroundTile';
import { InputField } from './components/InputField';
import style from './Create.module.css';

//배경 이미지 import
import Design from '/src/assets/images/backgrounds/bgDesign.jpg';
import Leaf from '/src/assets/images/backgrounds/bgLeaf.jpg';
import Study from '/src/assets/images/backgrounds/bgStudy.jpg';
import Tile from '/src/assets/images/backgrounds/bgTile.jpg';
//배경 상수
const BACKGROUND_OPTIONS = [
  { id: 'GREEN', color: '#E1EDDE' },
  { id: 'YELLOW', color: '#FFF1CC' },
  { id: 'BLUE', color: '#E0F1F5' },
  { id: 'PINK', color: '#FDE0E9' },
  { id: 'DESIGN', img: Design },
  { id: 'LEAF', img: Leaf },
  { id: 'STUDY', img: Study },
  { id: 'TILE', img: Tile },
];

export function Create() {
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

  //request 전 확인
  const submitHandle = async () => {
    const newErrors = {};
    if (!formData.nickname.trim()) newErrors.nickname = '닉네임을 입력해주세요';
    if (!formData.title.trim()) newErrors.title = '스터디 이름을 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '*비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('/api/studies', {
          nickname: formData.nickname,
          title: formData.title,
          description: formData.description,
          password: formData.password,
          background: formData.background,
        });
        alert('스터디가 생성되었습니다.');
      } catch {
        alert('스터디 생성에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <section>
        <div className={style.container}>
          <div className={style.createPageTitle}>스터디 만들기</div>
          <>
            <InputField
              type={'text'}
              inputTitle={'닉네임'}
              placeholderText={'닉네임을 입력해주세요'}
              value={formData.nickname}
              onChange={(error) => inputHandle('nickname', error.target.value)}
              errorMessage={errors.nickname}
            />
            <InputField
              type={'text'}
              inputTitle={'스터디 이름'}
              placeholderText={'스터디 이름을 입력해주세요'}
              value={formData.title}
              onChange={(error) => inputHandle('title', error.target.value)}
              errorMessage={errors.title}
            />
            <InputField
              type={'text'}
              inputTitle={'소개'}
              placeholderText={'소개 멘트를 작성해주세요'}
              value={formData.description}
              onChange={(error) =>
                inputHandle('description', error.target.value)
              }
              errorMessage={errors.description}
            />
          </>
          <>
            <InputField type={'text'} inputTitle={'배경을 선택해주세요'}>
              {BACKGROUND_OPTIONS.map((bg) => (
                <BackgroundTile
                  key={bg.id}
                  background={bg}
                  isSelected={formData.background === bg.id}
                  onSelect={(id) => inputHandle('background', id)}
                />
              ))}
            </InputField>
          </>
          <>
            <InputField
              type={'password'}
              inputTitle={'비밀번호'}
              placeholderText={'비밀번호를 입력해주세요'}
              value={formData.password}
              onChange={(error) => inputHandle('password', error.target.value)}
              errorMessage={errors.password}
            />
            <InputField
              type={'password'}
              inputTitle={'비밀번호 확인'}
              placeholderText={'비밀번호를 다시 한 번 입력해주세요'}
              value={formData.passwordCheck}
              onChange={(error) =>
                inputHandle('passwordCheck', error.target.value)
              }
              errorMessage={errors.passwordCheck}
            />
          </>
          {/* 임시 제출 버튼 */}
          <button className={style.submitButton} onClick={submitHandle}>
            만들기
          </button>
        </div>
      </section>
    </>
  );
}
