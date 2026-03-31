module.exports = {
	eleventyComputed: {
		hasCode(data) {
			const raw = data.page.rawInput;
			return raw ? /```\w/m.test(raw) : false;
		},
	},
};
