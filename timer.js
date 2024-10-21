export function timerFunction(hr = 0, min = 0, second = 0) {
	const timerElement = document.querySelector('.timer');
	let [hour, minutes, seconds] = timerElement.textContent.split(':');
	let timer = setInterval(function () {
		seconds = second % 60;

		timerElement.textContent = hour + ':' + minutes + ':' + seconds;
		second++;
		if (second > 60) {
			second = 0;
			min++;
			minutes = min % 60;
		}
		if (minutes > 60) {
			hr++;
			hour = hr % 60;
		}
		if (minutes < 10) {
			minutes = '0' + (min % 60);
		}
	}, 1000);
	return timer;
}
