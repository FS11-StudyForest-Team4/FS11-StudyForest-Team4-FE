import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getStudyList } from '../../api/studyService';
import StudyCard from './StudyCard';
import styles from './Home.module.css';

const SORT_OPTIONS = [
  { label: '최근 순', value: 'LATEST' },
  { label: '오래된 순', value: 'OLDEST' },
  { label: '많은 포인트 순', value: 'MOST_POINTS' },
  { label: '적은 포인트 순', value: 'LEAST_POINTS' },
];

const Home = () => {
  const [studies, setStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentStudies, setRecentStudies] = useState([]);

  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchStudies = async (isLoadMore = false) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await getStudyList({
        q: searchTerm || undefined, //
        orderBy: selectedSort.value, //
        limit: 6,
        cursor: isLoadMore ? nextCursor : undefined,
      });

      const newData = result?.data || [];
      const cursor = result?.nextCursor || null;

      if (isLoadMore) {
        setStudies((prev) => [...prev, ...newData]);
      } else {
        setStudies(newData);
      }
      setNextCursor(cursor);
    } catch (error) {
      console.error('데이터 로드 실패');
      setStudies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies(false);
  }, [selectedSort, searchTerm]);

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
    navigate(`/study/about/${study.id}`);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        {/* 최근 조회 섹션 (기존과 동일) */}
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
                    onClick={() => navigate(`/study/about/${study.id}`)}
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
              {studies.length > 0 ? (
                studies.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    background={study.background}
                    onClick={() => handleStudyClick(study)}
                  />
                ))
              ) : (
                <div className={styles.emptyDisplay}>
                  <p className={styles.emptyMessage}>
                    {isLoading ? '로딩 중...' : '스터디가 없어요'}
                  </p>
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
