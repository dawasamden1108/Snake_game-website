
import { getLeaderboard } from './api.js';

/**
 * Render the leaderboard into a given container element
 * @param {HTMLElement} container
 */
export function renderLeaderboard(container) {
	const leaderboard = getLeaderboard().filter(entry => entry && typeof entry.name === 'string' && typeof entry.score === 'number');
	container.innerHTML = '';
	if (leaderboard.length === 0) {
		container.innerHTML += '<p>No scores yet.</p>';
		return;
	}
	const list = document.createElement('ol');
	leaderboard.forEach(entry => {
		const li = document.createElement('li');
		// Create a gap for score alignment
		const gap = '                          '; // 28 spaces (unicode non-breaking for HTML)
		li.textContent = `${entry.name}${gap}${entry.score}`;
		list.appendChild(li);
	});
	container.appendChild(list);
}
