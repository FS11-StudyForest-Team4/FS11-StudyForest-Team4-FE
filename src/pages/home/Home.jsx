import React, { useState } from 'react';
import './home.css';

//실제 BE API 가 들어오면  배열에 데이터가 담길 예정
const Home = () => {
  const [studyList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최근 순');

  const sortOptions = [
    '최근 순',
    '오래된 순',
    '많은 포인트 순',
    '적은 포인트 순',
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="homeContainer">
      <main className="mainContent">
        <section className="studySection">
          <div className="emptyStatusBox fixed-small">
            <h3 className="sectionTitle">최근 조회한 스터디</h3>
            <div className="emptyDisplay">
              <p className="emptyMessage">아직 조회한 스터디가 없어요</p>
            </div>
          </div>
        </section>

        <section className="studySection">
          <div className="emptyStatusBox fixed-large">
            <div className="sectionHeaderRow">
              <h3 className="sectionTitle">스터디 둘러보기</h3>

              <div className="filterControls">
                <div className="searchBarContainer">
                  <input
                    type="text"
                    placeholder="검색"
                    className="searchInput"
                  />
                </div>

                <div className="dropdownWrapper">
                  <div className="sortDropdown" onClick={toggleDropdown}>
                    {selectedSort}
                  </div>

                  {isDropdownOpen && (
                    <ul className="dropdownMenu">
                      {sortOptions.map((option) => (
                        <li
                          key={option}
                          className={`dropdownItem ${selectedSort === option ? 'selected' : ''}`}
                          onClick={() => handleSortSelect(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {!studyList.length && (
              <div className="emptyDisplay">
                <p className="emptyMessage">아직 둘러 볼 스터디가 없어요</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
