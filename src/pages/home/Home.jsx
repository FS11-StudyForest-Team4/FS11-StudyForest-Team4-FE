import React, { useState, useEffect, useCallback } from 'react';
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
  const [displayStudies, setDisplayStudies] = useState([]); // 목록 데이터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]); // 정렬
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentStudies, setRecentStudies] = useState([]); // 최근 조회 스터디
  const [isLoading, setIsLoading] = useState(false);

  // 💡 가연님 기존 로직 그대로 유지
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // 💡 [추가] 프론트에서 6개씩 끊어 보여주기 위한 상태
  const [visibleCount, setVisibleCount] = useState(6);

  const navigate = useNavigate();

  // 1. 🚀 데이터 호출 함수 (기존 구조 100% 유지)
  const fetchStudies = useCallback(
    async (isLoadMore = false) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const params = {
          q: searchTerm,
          orderBy: selectedSort.value,
          cursor: isLoadMore ? nextCursor : null,
          limit: 100, // 백엔드가 검색을 안해주니 일단 많이 가져옴
        };

        const result = await getStudyList(params);
        let data = result?.data || (Array.isArray(result) ? result : []);

        // 🔍 [검색 필터링] 서버가 못한 걸 프론트에서 수행
        if (searchTerm.trim()) {
          const keyword = searchTerm.toLowerCase();
          data = data.filter(
            (s) =>
              (s.title || '').toLowerCase().includes(keyword) ||
              (s.nickName || '').toLowerCase().includes(keyword),
          );
        }

        // 💡 [핵심] 가연님이 원하시는 '6개씩' 보여주기 로직
        const currentCount = isLoadMore ? visibleCount + 6 : 6;
        const slicedData = data.slice(0, currentCount);

        setDisplayStudies(slicedData);
        setVisibleCount(currentCount);

        // 💡 더 보여줄 데이터가 남았을 때만 버튼 노출
        setHasNextPage(data.length > slicedData.length);
        setNextCursor(result?.nextCursor);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, selectedSort, nextCursor, isLoading, visibleCount],
  );

  // 2. 🔍 검색어 혹은 정렬이 바뀔 때 실행 (기존 코드)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCount(6); // 검색 시 다시 6개부터
      fetchStudies(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedSort]);

  // 3. ➕ 더보기 버튼 클릭 (기존 코드)
  const handleLoadMore = () => {
    fetchStudies(true);
  };

  // 4. 🖱️ 카드 클릭 시 이동 (기존 코드)
  const handleStudyClick = (study) => {
    const studyId = study.id;
    const saved = JSON.parse(localStorage.getItem('recentStudies') || '[]');
    if (studyId) {
      const updated = [studyId, ...saved.filter((id) => id !== studyId)].slice(
        0,
        10,
      );
      localStorage.setItem('recentStudies', JSON.stringify(updated));
    }
    navigate(`/study/about/${studyId}`);
  };

  // 5. 🕒 최근 조회한 스터디 (기존 코드)
  useEffect(() => {
    const fetchRecent = async () => {
      const ids = JSON.parse(localStorage.getItem('recentStudies') || '[]');
      const picked = [];
      for (const id of ids.slice(0, 3)) {
        try {
          const res = await getStudyId(id);
          if (res) picked.push(res);
        } catch (e) {}
      }
      setRecentStudies(picked);
    };
    fetchRecent();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        {/* 최근 조회 섹션 */}
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
                    onClick={() => handleStudyClick(s)}
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
              <>
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

                {/* 💡 검색 결과가 현재 보이는 것보다 많을 때만 버튼이 나옵니다! */}
                {hasNextPage && (
                  <div className={styles.moreButtonContainer}>
                    <button
                      className={styles.moreButton}
                      onClick={handleLoadMore}
                      disabled={isLoading}
                    >
                      {isLoading ? '로딩 중...' : '더보기'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.emptyDisplay}>
                <p className={styles.emptyMessage}>
                  {isLoading ? '로딩 중...' : '검색 결과가 없어요'}
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
