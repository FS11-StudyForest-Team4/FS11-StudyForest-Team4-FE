import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getStudyList } from '../../api/studyService';
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

  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 💡 fetchStudies를 useEffect 밖으로 빼서 '더보기' 버튼에서도 쓸 수 있게 함
  const fetchStudies = async (isLoadMore = false) => {
    setIsLoading(true);
    try {
      const result = await getStudyList({
        orderBy: selectedSort.value,
        cursor: isLoadMore ? nextCursor : undefined,
        limit: 6,
      });

      const newData = result?.data || [];
      const newCursor = result?.nextCursor || null;

      if (isLoadMore) {
        setStudies((prev) => [...prev, ...newData]);
      } else {
        setStudies(newData.length > 0 ? newData : MOCK_STUDY_LIST);
      }
      setNextCursor(newCursor);
    } catch (error) {
      if (!isLoadMore) setStudies(MOCK_STUDY_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies(false);
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
        case 'MOST_POINTS':
          return (b.totalPoint || 0) - (a.totalPoint || 0);
        case 'LEAST_POINTS':
          return (a.totalPoint || 0) - (b.totalPoint || 0);
        case 'LATEST':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'OLDEST':
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
                    background={study.background}
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

            {nextCursor && (
              <div className={styles.moreButtonContainer}>
                <button
                  className={styles.moreButton}
                  onClick={() => fetchStudies(true)}
                  disabled={isLoading}
                >
                  {isLoading ? '로딩 중...' : '더보기'}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
