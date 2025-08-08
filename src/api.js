
// Leaderboard API using localStorage
const LEADERBOARD_KEY = 'snakeLeaderboard';

/**
 * Get the top 5 leaderboard entries from localStorage
 * @returns {Array<{name: string, score: number}>}
 */
export function getLeaderboard() {
	const data = localStorage.getItem(LEADERBOARD_KEY);
	if (!data) return [];
	try {
		// Filter out invalid entries
		return JSON.parse(data).filter(entry => entry && typeof entry.name === 'string' && typeof entry.score === 'number');
	} catch {
		return [];
	}
}

/**
 * Try to add a new score to the leaderboard
 * @param {string} name
 * @param {number} score
 * @returns {boolean} true if added to leaderboard, false otherwise
 */
export function addScoreToLeaderboard(name, score) {
	let leaderboard = getLeaderboard();
	leaderboard.push({ name, score });
	leaderboard = leaderboard.filter(entry => entry && typeof entry.name === 'string' && typeof entry.score === 'number');
	leaderboard.sort((a, b) => b.score - a.score);
	leaderboard = leaderboard.slice(0, 5);
	localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
	// Return true if the new score is in the top 5
	return leaderboard.some(entry => entry.name === name && entry.score === score);
}
