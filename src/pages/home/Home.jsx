import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_STUDY_LIST } from '../../mock/studyData.js';
import StudyCard from './StudyCard';
import styles from './home.module.css';

const SORT_OPTIONS = [
  { label: '최근 순', value: 'LATEST' },
  { label: '오래된 순', value: 'OLDEST' },
  { label: '많은 포인트 순', value: 'MOST_POINTS' },
  { label: '적은 포인트 순', value: 'LEAST_POINTS' },
];

const Home = () => {
  const [studies, setStudies] = useState(MOCK_STUDY_LIST || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentStudies, setRecentStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch(
          `/api/studies?orderBy=${selectedSort.value}`,
        );
        if (response.ok) {
          const data = await response.json();
          setStudies(data || MOCK_STUDY_LIST);
        }
      } catch (error) {
        setStudies(MOCK_STUDY_LIST);
      }
    };
    fetchStudies();
  }, [selectedSort]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentStudies') || '[]');
    setRecentStudies(saved);
  }, []);

  const handleStudyClick = (study) => {
    const saved = JSON.parse(localStorage.getItem('recentStudies') || '[]');
    const updated = [study, ...saved.filter((s) => s.id !== study.id)].slice(
      0,
      4,
    );
    localStorage.setItem('recentStudies', JSON.stringify(updated));
    setRecentStudies(updated);
    navigate(`/study/${study.id}`);
  };

  const filteredList = [...(studies || [])]
    .filter((study) =>
      study.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (selectedSort.value) {
        case 'MOST_POINTS': // 많은 포인트 순 (내림차순)
          return (b.totalPoint || 0) - (a.totalPoint || 0);

        case 'LEAST_POINTS': // 적은 포인트 순 (오름차순)
          return (a.totalPoint || 0) - (b.totalPoint || 0);

        case 'LATEST': // 최근 순 (내림차순)
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case 'OLDEST': // 오래된 순 (오름차순)
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        default:
          return 0;
      }
    });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        {/* 최근 조회 섹션 */}
        <section className={styles.studySection}>
          <div className={`${styles.emptyStatusBox} ${styles.recentViewBox}`}>
            <h3 className={styles.sectionTitle}>최근 조회한 스터디</h3>
            <div className={styles.studyGrid}>
              {recentStudies.length > 0 ? (
                recentStudies.map((study) => (
                  <StudyCard
                    key={`recent-${study.id}`}
                    study={study}
                    background={study.background} // 💡 배경색 전달 확인
                    onClick={() => navigate(`/study/${study.id}`)}
                  />
                ))
              ) : (
                <div className={styles.emptyDisplay}>
                  <p className={styles.emptyMessage}>조회 기록이 없어요</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 스터디 둘러보기 섹션 */}
        <section className={styles.studySection}>
          <div className={`${styles.emptyStatusBox} ${styles.studyBrowseBox}`}>
            <div className={styles.sectionHeaderRow}>
              <h3 className={styles.sectionTitle}>스터디 둘러보기</h3>
              <div className={styles.filterControls}>
                <div className={styles.searchBarContainer}>
                  <input
                    type="text"
                    placeholder="검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className={styles.dropdownWrapper}>
                  <div
                    className={styles.sortDropdown}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedSort.label}
                  </div>
                  {isDropdownOpen && (
                    <ul className={styles.dropdownMenu}>
                      {SORT_OPTIONS.map((option) => (
                        <li
                          key={option.value}
                          className={`${styles.dropdownItem} ${selectedSort.value === option.value ? styles.selectedItem : ''}`}
                          onClick={() => {
                            setSelectedSort(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.studyGrid}>
              {filteredList.length > 0 ? (
                filteredList.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    background={study.background}
                    onClick={() => handleStudyClick(study)}
                  />
                ))
              ) : (
                <div className={styles.emptyDisplay}>
                  <p className={styles.emptyMessage}>스터디가 없어요</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
