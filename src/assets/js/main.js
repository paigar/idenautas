(() => {
	"use strict";

	// ── Theme Toggle ───────────────────────────────────────────
	document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const current = document.documentElement.dataset.theme || "dark";
			const next = current === "dark" ? "light" : "dark";
			document.documentElement.dataset.theme = next;
			localStorage.setItem("theme", next);
		});
	});

	// ── Navigation ──────────────────────────────────────────────
	const header = document.querySelector("[data-header]");
	const navToggle = document.querySelector("[data-nav-toggle]");
	const navLinks = document.querySelectorAll("[data-nav-link]");

	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
		document.body.classList.toggle("nav-open", isNavOpen);
		navToggle.setAttribute("aria-expanded", isNavOpen);
		navToggle.setAttribute(
			"aria-label",
			isNavOpen ? "Cerrar menu" : "Abrir menu",
		);
	}

	navToggle.addEventListener("click", toggleNav);
	navLinks.forEach((link) =>
		link.addEventListener("click", () => {
			if (isNavOpen) toggleNav();
		}),
	);

	// ── Accessible Dropdown ────────────────────────────────────
	document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
		const trigger = dropdown.querySelector("[aria-haspopup]");
		const submenu = dropdown.querySelector(".nav-desktop__submenu");
		if (!trigger || !submenu) return;

		function open() {
			trigger.setAttribute("aria-expanded", "true");
		}
		function close() {
			trigger.setAttribute("aria-expanded", "false");
		}

		dropdown.addEventListener("mouseenter", open);
		dropdown.addEventListener("mouseleave", close);
		dropdown.addEventListener("focusin", open);
		dropdown.addEventListener("focusout", (e) => {
			if (!dropdown.contains(e.relatedTarget)) close();
		});

		dropdown.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				close();
				trigger.focus();
			}
		});
	});

	// ── Unified scroll handler ─────────────────────────────────
	const backBtn = document.querySelector("[data-back-to-top]");
	let backBtnVisible = false;
	let scrollTicking = false;

	function onScroll() {
		const y = window.scrollY;
		header.classList.toggle("scrolled", y > 80);
		if (backBtn) {
			const show = y > 600;
			if (show !== backBtnVisible) {
				backBtnVisible = show;
				backBtn.classList.toggle("is-visible", show);
			}
		}
		scrollTicking = false;
	}

	window.addEventListener(
		"scroll",
		() => {
			if (!scrollTicking) {
				requestAnimationFrame(onScroll);
				scrollTicking = true;
			}
		},
		{ passive: true },
	);
	onScroll();

	// ── Scroll Animations (single IntersectionObserver) ────────
	const splitElements = document.querySelectorAll("[data-split]");

	splitElements.forEach((el) => {
		const originalText = el.textContent.trim();
		const words = originalText.split(/\s+/).filter(Boolean);
		el.innerHTML =
			`<span class="sr-only">${originalText}</span>` +
			words
				.map(
					(word, i) =>
						`<span class="word" style="--word-i:${i}" aria-hidden="true"><span class="word__inner">${word}</span></span>`,
				)
				.join(" ");
	});

	const scrollObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const el = entry.target;

				if (el.hasAttribute("data-reveal")) {
					const delay = el.dataset.revealDelay || 0;
					setTimeout(() => el.classList.add("revealed"), delay * 1000);
				} else if (el.hasAttribute("data-stagger")) {
					el.querySelectorAll("[data-stagger-child]").forEach((child, i) => {
						setTimeout(() => child.classList.add("revealed"), i * 180);
					});
				} else if (el.hasAttribute("data-split")) {
					el.classList.add("split-revealed");
				} else if (el.hasAttribute("data-count-to")) {
					const target = parseInt(el.dataset.countTo, 10);
					const duration = 2000;
					const start = performance.now();
					(function step(now) {
						const progress = Math.min((now - start) / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						el.textContent = Math.floor(eased * target);
						if (progress < 1) requestAnimationFrame(step);
						else el.classList.add("counter-done");
					})(performance.now());
				}

				scrollObserver.unobserve(el);
			});
		},
		{ threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
	);

	document
		.querySelectorAll(
			"[data-reveal], [data-stagger], [data-split], [data-count-to]",
		)
		.forEach((el) => scrollObserver.observe(el));

	// ── Parallax ────────────────────────────────────────────────
	const parallaxElements = document.querySelectorAll("[data-parallax]");

	if (
		parallaxElements.length &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		let pTicking = false;

		function updateParallax() {
			const scrollY = window.scrollY;
			parallaxElements.forEach((el) => {
				const speed = parseFloat(el.dataset.parallax) || 0.15;
				const rect = el.getBoundingClientRect();
				const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
				el.style.transform = `translate3d(0, ${offset}px, 0)`;
			});
			pTicking = false;
		}

		window.addEventListener(
			"scroll",
			() => {
				if (!pTicking) {
					requestAnimationFrame(updateParallax);
					pTicking = true;
				}
			},
			{ passive: true },
		);
	}

	// ── Magnetic hover on buttons ───────────────────────────────
	const magneticElements = document.querySelectorAll("[data-magnetic]");

	magneticElements.forEach((el) => {
		el.addEventListener("mousemove", (e) => {
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;
			const strength = parseFloat(el.dataset.magnetic) || 0.3;
			el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
		});

		el.addEventListener("mouseleave", () => {
			el.style.transform = "";
			el.style.transition =
				"transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
			setTimeout(() => (el.style.transition = ""), 400);
		});
	});

	// ── Horizontal marquee pause on hover ───────────────────────
	const marquees = document.querySelectorAll(".marquee");
	marquees.forEach((m) => {
		m.addEventListener(
			"mouseenter",
			() => (m.style.animationPlayState = "paused"),
		);
		m.addEventListener(
			"mouseleave",
			() => (m.style.animationPlayState = "running"),
		);
	});

	// ── Jackpot / slot-machine rotating text ──────────────────
	document.querySelectorAll("[data-rotate]").forEach((el) => {
		const words = JSON.parse(el.dataset.rotate).map((w) =>
			w.replace(/ /g, "\u00A0"),
		);
		if (words.length < 2) return;

		let index = 0;
		const maxLen = Math.max(...words.map((w) => w.length));

		el.textContent = "";
		el.style.display = "inline-flex";
		el.style.justifyContent = "center";
		el.style.width = maxLen + "ch";

		function padCenter(word) {
			const diff = maxLen - word.length;
			const left = Math.floor(diff / 2);
			const right = diff - left;
			return "\u00A0".repeat(left) + word + "\u00A0".repeat(right);
		}

		function buildSlots(word) {
			const padded = padCenter(word);
			return [...padded].map((char, i) => {
				const slot = document.createElement("span");
				slot.className = "slot";
				slot.style.setProperty("--slot-i", i);

				const inner = document.createElement("span");
				inner.className = "slot__char slot__char--active";
				inner.textContent = char;
				slot.appendChild(inner);

				return slot;
			});
		}

		const slots = buildSlots(words[0]);
		slots.forEach((s) => el.appendChild(s));

		let intervalId = null;

		function tick() {
			index = (index + 1) % words.length;
			const nextWord = padCenter(words[index]);

			slots.forEach((slot, i) => {
				const current = slot.querySelector(".slot__char--active");
				const nextChar = nextWord[i];

				if (current && current.textContent === nextChar) return;

				const next = document.createElement("span");
				next.className = "slot__char slot__char--entering";
				next.textContent = nextChar;
				slot.appendChild(next);

				requestAnimationFrame(() => {
					if (current) current.className = "slot__char slot__char--leaving";
					next.className = "slot__char slot__char--active";
				});

				setTimeout(() => {
					if (current && current.parentNode) current.remove();
				}, 600);
			});
		}

		new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (!intervalId) intervalId = setInterval(tick, 2500);
				} else {
					clearInterval(intervalId);
					intervalId = null;
				}
			},
			{ threshold: 0 },
		).observe(el);
	});

	// ── Blog Search ─────────────────────────────────────────────
	const blogSearchInput = document.querySelector("#blog-search-input");
	if (blogSearchInput) {
		const cards = document.querySelectorAll("[data-search]");
		const clearBtn = document.querySelector(".blog-search__clear");
		const searchCount = document.querySelector(".blog-search-count");

		function normalize(str) {
			return str
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
		}

		function filterBlog() {
			const query = normalize(blogSearchInput.value.trim());
			let visible = 0;
			cards.forEach((card) => {
				const matches =
					!query || normalize(card.dataset.search).includes(query);
				card.hidden = !matches;
				if (matches) visible++;
			});
			if (clearBtn) clearBtn.hidden = !blogSearchInput.value;
			if (searchCount) {
				searchCount.hidden = !query;
				if (query)
					searchCount.textContent =
						visible === 0
							? "Sin resultados"
							: visible === 1
								? "1 artículo encontrado"
								: `${visible} artículos encontrados`;
			}
		}

		blogSearchInput.addEventListener("input", filterBlog);

		if (clearBtn) {
			clearBtn.addEventListener("click", () => {
				blogSearchInput.value = "";
				filterBlog();
				blogSearchInput.focus();
			});
		}
	}

	// ── External Links ──────────────────────────────────────────
	document.querySelectorAll('a[href^="http"]').forEach((a) => {
		if (a.hostname !== location.hostname) {
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noopener noreferrer");
		}
	});

	// ── Back to Top (click handler) ─────────────────────────────
	if (backBtn) {
		backBtn.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}
})();
