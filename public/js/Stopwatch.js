export default class Stopwatch {
	constructor(display, results)
	{
		this.running = false;
		this.display = display;
		this.results = results;
		this.reset();
		this.print(this.times);
	}

	reset()
	{
		this.times = [0, 0, 0];
	}

	start()
	{
		if (!this.time) this.time = performance.now();
		if (!this.running)
		{
			this.running = true;
			requestAnimationFrame(this.step.bind(this));
		}
	}

	stop()
	{
		this.running = false;
		this.time = null;
	}

	restart()
	{
		if (!this.time) this.time = performance.now();
		if (!this.running)
		{
			this.running = true;
			requestAnimationFrame(this.step.bind(this));
		}
		this.reset();
	}

	step(timestamp)
	{
		if (!this.running) return;
		this.calculate(timestamp);
		this.time = timestamp;
		this.print();
		requestAnimationFrame(this.step.bind(this));
	}

	returnTime()
	{
		return this.format(this.times);
	}

	calculate(timestamp)
	{
		var diff = timestamp - this.time;
		this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
	}

	print()
	{
		this.display.innerText = "Time Elapsed: " + this.format(this.times);
	}

	format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}
