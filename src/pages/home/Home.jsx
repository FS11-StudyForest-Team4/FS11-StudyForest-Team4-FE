/* src/pages/home/Home.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_STUDY_LIST } from '../../mock/ studyData.js';
import StudyCard from './StudyCard';
import styles from './home.module.css';

const SORT_OPTIONS = [
  { label: '최근 순', value: 'recent' },
  { label: '오래된 순', value: 'oldest' },
  { label: '많은 포인트 순', value: 'point_desc' },
  { label: '적은 포인트 순', value: 'point_asc' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 1. 검색 및 정렬 로직 (useEffect 없이 직접 처리하여 성능 최적화)
  const filteredAndSortedList = (MOCK_STUDY_LIST || [])
    .filter((study) =>
      study.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (selectedSort.value === 'point_desc')
        return b.totalPoint - a.totalPoint;
      if (selectedSort.value === 'point_asc')
        return a.totalPoint - b.totalPoint;
      return 0;
    });

  return (
    <div className={styles.homeContainer}>
      <main className={styles.mainContent}>
        <section className={styles.studySection}>
          <div className={`${styles.emptyStatusBox} ${styles.recentViewBox}`}>
            <h3 className={styles.sectionTitle}>최근 조회한 스터디</h3>
            <div className={styles.emptyDisplay}>
              <p className={styles.emptyMessage}>아직 조회한 스터디가 없어요</p>
            </div>
          </div>
        </section>

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
                          className={`${styles.dropdownItem} ${selectedSort.value === option.value ? styles.selected : ''}`}
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

            {filteredAndSortedList.length > 0 ? (
              <div className={styles.studyGrid}>
                {filteredAndSortedList.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    onClick={() => navigate(`/study/${study.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyDisplay}>
                <p className={styles.emptyMessage}>
                  아직 둘러 볼 스터디가 없어요
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
