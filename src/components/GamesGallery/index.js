import React, { useState, useEffect } from 'react';
// Import Chart components:
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Register Chart.js components so charts render properly.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * Helper function to robustly fetch and parse JSON with detailed logging.
 */
async function fetchJSON(url) {
  console.log(`Fetching JSON from: ${url}`);
  let response;
  try {
    response = await fetch(url);
  } catch (networkErr) {
    console.error(`Network error fetching ${url}:`, networkErr);
    throw new Error(`Network error: ${networkErr.message}`);
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`Fetch failed for ${url} (status: ${response.status}):\n`, text);
    throw new Error(`HTTP error ${response.status} for ${url}`);
  }

  try {
    const data = await response.json();
    console.log(`Successfully fetched JSON from ${url}:`, data);
    return data;
  } catch (parseErr) {
    console.error(`Error parsing JSON from ${url}:`, parseErr);
    throw new Error(`JSON parse error for ${url}`);
  }
}

/**
 * Calculate yearly statistics for each year:
 * - totalGames: # of items
 * - completedCount: # with completed === true
 * - totalHours: sum of hours_played (skipping "missing")
 */
function getYearStats(games) {
  const totalGames = games.length;
  let completedCount = 0;
  let totalHours = 0;

  for (const g of games) {
    // Only increment if strictly true (multiplayer won't count as completed)
    if (g.completed === true) {
      completedCount++;
    }
    if (g.hours_played && g.hours_played !== 'missing') {
      const parsed = parseFloat(g.hours_played);
      if (!isNaN(parsed)) {
        totalHours += parsed;
      }
    }
  }

  return { totalGames, completedCount, totalHours };
}

function GamesGallery() {
  const [gamesData, setGamesData] = useState({});
  const [yearsOrder, setYearsOrder] = useState([]); // store the years in the order from years.json
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base paths
  const baseDataUrl = useBaseUrl('/data/games-gallery');
  const baseImgUrl = useBaseUrl('/img/games-gallery');

  // We will store aggregated stats per year in a single object, e.g.:
  // statsPerYear = {
  //   '2025': { totalGames: X, completedCount: Y, totalHours: Z },
  //   '2024': {...},
  //   ...
  // }
  const [statsPerYear, setStatsPerYear] = useState({});

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        // 1) Fetch the array of years
        const yearsJsonUrl = `${baseDataUrl}/years.json`;
        const fetchedYears = await fetchJSON(yearsJsonUrl);
        setYearsOrder(fetchedYears);

        // 2) Fetch each year's games
        const promises = fetchedYears.map(async (year) => {
          const yearJsonUrl = `${baseDataUrl}/games_${year}.json`;
          try {
            const data = await fetchJSON(yearJsonUrl);
            return { year, data };
          } catch (yearErr) {
            console.error(`Error fetching data for year ${year}:`, yearErr);
            return { year, data: null };
          }
        });

        const results = await Promise.all(promises);
        const collectedGames = {};
        const statsObj = {};

        // 3) Build a final object { '2025': [...games], ... }
        //    Also compute stats for each year
        results.forEach(({ year, data }) => {
          if (data) {
            collectedGames[year] = data;
            statsObj[year] = getYearStats(data);
          }
        });

        setGamesData(collectedGames);
        setStatsPerYear(statsObj);
        setLoading(false);
      } catch (err) {
        console.error('Fatal error in fetchGamesData:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGamesData();
  }, [baseDataUrl]);

  // Error/Loading
  if (error) {
    return <div className={styles.error}>Error loading games data: {error}</div>;
  }
  if (loading) {
    return <div className={styles.loading}>Loading games data...</div>;
  }

  //--------------------------------------------
  // Prepare data for the 2 charts
  //--------------------------------------------
  // We rely on 'yearsOrder' to preserve the same year ordering in both charts
  const chartLabels = [...yearsOrder].reverse();
  const totalGamesData = chartLabels.map((year) =>
    statsPerYear[year] ? statsPerYear[year].totalGames : 0
  );
  const completedData = chartLabels.map((year) =>
    statsPerYear[year] ? statsPerYear[year].completedCount : 0
  );
  const hoursData = chartLabels.map((year) =>
    statsPerYear[year] ? statsPerYear[year].totalHours : 0
  );

  // Chart 1: Games played vs. completed
  const dataGamesCompleted = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Played',
        data: totalGamesData,
        backgroundColor: '#85B4FF',
      },
      {
        label: 'Completed',
        data: completedData,
        backgroundColor: '#B4E4CA',
      },
    ],
  };

  const optionsGamesCompleted = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Games Played vs. Completed',
      },
      legend: {
        display: true,
      },
    },
    // Additional styling can go in here
  };

  // Chart 2: Total Hours
  const dataHours = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Total Hours',
        data: hoursData,
        backgroundColor: '#EED2AA',
        // You can add styling, e.g. backgroundColor, if you like
      },
    ],
  };

  const optionsHours = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Hours by Year',
      },
      legend: {
        display: true,
      },
    },
  };

  //--------------------------------------------
  // Render
  //--------------------------------------------
  return (
    <div className={styles.galleryContainer}>
      {/* 
        1) Data Visualization Section 
           Two Bar charts at the top
      */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Data Visualization</h2>
        <div style={{ marginBottom: '2rem' }}>
          <Bar data={dataGamesCompleted} options={optionsGamesCompleted} />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <Bar data={dataHours} options={optionsHours} />
        </div>
      </div>

      {/* 
        2) Original per-year <details> 
      */}
      {yearsOrder.map((year) => {
        const games = gamesData[year];
        if (!games) {
          return null;
        }

        // Calculate stats for this year
        const { totalGames, completedCount, totalHours } = getYearStats(games);

        // We can still do the previous logic for "multiplayer" vs "completed"
        return (
          <details key={year} className={styles.yearSection}>
            <summary className={styles.yearSummary}>
              {year}
              <div className={styles.yearStats}>
                Games Played: {totalGames}
                <br />
                Games Completed: {completedCount}
                <br />
                Total Hours: {totalHours}
              </div>
            </summary>

            <div className={styles.gamesGrid}>
              {games.map((game) => {
                let cardClass = styles.gameCardIncomplete;
                if (game.completed === true) {
                  cardClass = styles.gameCardComplete;
                } else if (
                  typeof game.completed === 'string' &&
                  game.completed.toLowerCase() === 'multiplayer'
                ) {
                  cardClass = styles.gameCardMultiplayer;
                }

                let completedLabel = '✗';
                if (game.completed === true) {
                  completedLabel = '✓';
                } else if (
                  typeof game.completed === 'string' &&
                  game.completed.toLowerCase() === 'multiplayer'
                ) {
                  completedLabel = 'Multiplayer';
                }

                const imagePath = `${baseImgUrl}/${year}/${game.id}.png`;

                return (
                  <article key={game.id} className={`${styles.gameCard} ${cardClass}`}>
                    <img
                      src={imagePath}
                      alt={game.name}
                      className={styles.gameImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn(
                          `Image not found for game id=${game.id} year=${year}`
                        );
                      }}
                    />
                    <div className={styles.gameDetails}>
                      <h3 className={styles.gameTitle}>{game.name}</h3>
                      <p>
                        <strong>Hours Played:</strong>{' '}
                        {game.hours_played === 'missing'
                          ? 'N/A'
                          : `${game.hours_played}h`}
                      </p>
                      <p>
                        <strong>Completed:</strong> {completedLabel}
                      </p>
                      {game.notes && (
                        <p>
                          <strong>Notes:</strong> {game.notes}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export default GamesGallery;
