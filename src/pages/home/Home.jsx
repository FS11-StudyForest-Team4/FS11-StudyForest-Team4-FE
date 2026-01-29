import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_STUDY_LIST } from '../../mock/ studyData.js';
import './home.css';

const SORT = {
  RECENT: 'recent',
  OLDEST: 'oldest',
  POINT_DESC: 'point_desc',
  POINT_ASC: 'point_asc',
};

const SORT_OPTIONS = [
  { label: '최근 순', value: SORT.RECENT },
  { label: '오래된 순', value: SORT.OLDEST },
  { label: '많은 포인트 순', value: SORT.POINT_DESC },
  { label: '적은 포인트 순', value: SORT.POINT_ASC },
];

const Home = () => {
  const [studyList, setStudyList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  const navigate = useNavigate();

  const isStudyEmpty = studyList.length === 0;

  useEffect(() => {
    if (MOCK_STUDY_LIST) {
      setStudyList(MOCK_STUDY_LIST);
    }
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <section className="study-section">
          <div className="empty-status-box recent-view-box">
            <h3 className="section-title">최근 조회한 스터디</h3>
            <div className="empty-display">
              <p className="empty-message">아직 조회한 스터디가 없어요</p>
            </div>
          </div>
        </section>

        <section className="study-section">
          <div className="empty-status-box study-browse-box">
            <div className="section-header-row">
              <h3 className="section-title">스터디 둘러보기</h3>
              <div className="filter-controls">
                <div className="search-bar-container">
                  <input
                    type="text"
                    placeholder="검색"
                    className="search-input"
                  />
                </div>
                <div className="dropdown-wrapper">
                  <div className="sort-dropdown" onClick={handleToggleDropdown}>
                    {selectedSort.label}
                  </div>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu">
                      {SORT_OPTIONS.map((option) => (
                        <li
                          key={option.value}
                          className={`dropdown-item ${selectedSort.value === option.value ? 'selected' : ''}`}
                          onClick={() => handleSortSelect(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* test 렌더링 */}
            {!isStudyEmpty ? (
              <div
                className="study-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                {studyList.map((study) => (
                  <div
                    key={study.id}
                    className="study-card"
                    onClick={() => navigate(`/study/${study.id}`)}
                    style={{
                      background: '#ffffff',
                      padding: '24px',
                      borderRadius: '15px',
                      border: '1px solid #e9e9e9',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className={`card-header ${study.background}`}
                      style={{
                        height: '100px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                        background: '#f5f5f5',
                      }}
                    ></div>
                    <h4
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        marginBottom: '8px',
                      }}
                    >
                      {study.title}
                    </h4>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#818181',
                        fontSize: '14px',
                      }}
                    >
                      <span>{study.nickName}</span>
                      <span style={{ color: '#3692ff', fontWeight: '600' }}>
                        {study.totalPoint.toLocaleString()} P
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-display">
                <p className="empty-message">아직 둘러 볼 스터디가 없어요</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
