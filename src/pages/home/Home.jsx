import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getStudyList, getStudyId } from '../../api/studyService';
import StudyCard from './StudyCard';
import styles from './home.module.css';

const SORT_OPTIONS = [
  { label: '최근 순', value: 'LATEST' },
  { label: '오래된 순', value: 'OLDEST' },
  { label: '많은 포인트 순', value: 'MOST_POINTS' },
  { label: '적은 포인트 순', value: 'LEAST_POINTS' },
];

const Home = () => {
  const [allStudies, setAllStudies] = useState([]);
  const [displayStudies, setDisplayStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentStudies, setRecentStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchInitialStudies = async () => {
    setIsLoading(true);
    try {
      const result = await getStudyList();
      const data = Array.isArray(result) ? result : result?.data || [];
      setAllStudies(data);
      setDisplayStudies(data);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialStudies();
  }, []);

  useEffect(() => {
    let filtered = [...allStudies];

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (study) =>
          study.title?.toLowerCase().includes(keyword) ||
          study.nickName?.toLowerCase().includes(keyword),
      );
    }

    if (selectedSort.value === 'LATEST') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort.value === 'OLDEST') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (selectedSort.value === 'MOST_POINTS') {
      filtered.sort((a, b) => (b.point || 0) - (a.point || 0));
    } else if (selectedSort.value === 'LEAST_POINTS') {
      filtered.sort((a, b) => (a.point || 0) - (b.point || 0));
    }

    setDisplayStudies(filtered);
  }, [searchTerm, selectedSort, allStudies]);

  const handleStudyClick = (study) => {
    const studyId = study.id;
    const saved = JSON.parse(localStorage.getItem('recentStudies') || '[]');
    if (typeof studyId === 'string' && studyId !== '[object Object]') {
      const updated = [studyId, ...saved.filter((id) => id !== studyId)].slice(
        0,
        10,
      );
      localStorage.setItem('recentStudies', JSON.stringify(updated));
    }
    navigate(`/study/about/${studyId}`);
  };

  useEffect(() => {
    const fetchRecent = async () => {
      const ids = JSON.parse(localStorage.getItem('recentStudies') || '[]');
      const picked = [];
      for (const id of ids.slice(0, 3)) {
        if (id && typeof id === 'string' && id !== '[object Object]') {
          try {
            const res = await getStudyId(id);
            if (res) picked.push(res);
          } catch (e) {}
        }
      }
      setRecentStudies(picked);
    };
    fetchRecent();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        {/* 최근 조회한 스터디 섹션 */}
        <section className={styles.studySection}>
          <div className={`${styles.emptyStatusBox} ${styles.recentViewBox}`}>
            <h3 className={styles.sectionTitle}>최근 조회한 스터디</h3>
            {recentStudies.length > 0 ? (
              <div className={styles.studyGrid}>
                {recentStudies.map((s) => (
                  <StudyCard
                    key={`recent-${s.id}`}
                    study={s}
                    background={s.background}
                    onClick={() => navigate(`/study/about/${s.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyDisplay}>
                <p className={styles.emptyMessage}>
                  아직 조회한 스터디가 없어요
                </p>
              </div>
            )}
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
                      {SORT_OPTIONS.map((opt) => (
                        <li
                          key={opt.value}
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSelectedSort(opt);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {displayStudies.length > 0 ? (
              <div className={styles.studyGrid}>
                {displayStudies.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    background={study.background}
                    onClick={() => handleStudyClick(study)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyDisplay}>
                <p className={styles.emptyMessage}>
                  {isLoading ? '로딩 중...' : '아직 둘러 볼 스터디가 없어요'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
