'use strict';

let cls = {
	current: '--current',
	show: '--show',
}

class App {
	constructor() {
		this.scenes = {
			main: document.querySelector('.scenes__item.main'),
			sec:  document.querySelector('.scenes__item.sec')
		};
		this.slides = {
			list:  document.querySelector('.slides'),
			items: document.querySelectorAll('.slides__item')
		};
		this.nav = {
			back: document.querySelector('.sec__back'),
			dots: document.querySelectorAll('.sec__dot')
		};
		this.current = {
			slide: null,
			index: 0
		};

		this.setSlidesProperties();

		this.start();

	}

	start() {
		// setTimeout(()=>{
			this.scenes.sec.classList.add(cls.show);
			
			this.setCurrent(2);
			// this.nextSlide();
		// }, 6000);
	}

	setSlidesProperties() {
		this.slides.items.forEach((slide, i)=>{
			slide.dataType = slide.getAttribute('data-slide');
			slide.dataTimeout = slide.getAttribute('data-timeout');
			slide.dataTimeout = slide.dataTimeout ? Number(slide.dataTimeout) : 6000;
			slide.dot = this.nav.dots[i];

			let fetures = slide.querySelectorAll('.fetures__item');
			let translater = slide.querySelector('.translater');
			let essentials = slide.querySelectorAll('.essentials__item');
			let cultures = slide.querySelectorAll('.culture__item');
			slide.inners = {
				fetures: fetures ? fetures : null,
				translater: translater ? {
					itemLangFrom: slide.querySelector('.translater__item.--from .translater__lang.lang'),
					itemLangTo:   slide.querySelector('.translater__item.--to .translater__lang.lang'),
					hiddenTexts: slide.querySelectorAll('.hidden-text-for-step'),
					question: slide.querySelector('.translater__question'),
					answer: slide.querySelector('.translater__answer'),
					pick: slide.querySelector('.translater__pick'),
					photo: slide.querySelector('.translater__photo'),
					audio: slide.querySelector('.translater__audio'),
					audioVideoEl: slide.querySelector('.translater__audio video'),
					func: slide.querySelector('.t-fun'),
				} : null,
				essentials: essentials ? essentials : null,
				cultures: cultures ? {
					list: slide.querySelector('.culture__list'),
					items: cultures
				} : null
			};

			console.log(slide.inners, slide.dataType, slide.dataTimeout, slide.dot);
		});
	}

	removeCurrentClasses() {
		this.current.slide.classList.remove(cls.current);
		this.current.dot.classList.remove(cls.current);
	}

	setCurrent(index = 0) {
		this.current.index = index;
		this.current.slide = this.slides.items[index];
		this.current.dot   = this.nav.dots[index];

		this.current.slide.classList.add(cls.current);
		this.current.dot.classList.add(cls.current);
		this.slides.list.style.transform = 'translateX(' + (this.current.index != 0 ? -(this.current.index * 100) : 0) + '%)';
	
		this.animationSlide();
	}
	
	nextSlide() {
		let nextIndex = this.current.index + 1;
		let next = this.slides.items[nextIndex];

		if (next) {
			setTimeout(()=>{
				this.removeCurrentClasses();
				this.setCurrent(nextIndex);
				this.nextSlide();
			}, this.current.slide.dataTimeout);
		}
	}

	prevSlide() {

	}

	animationSlide() {
		switch(this.current.slide.dataType){
			case 'fetures':
				this.startAnimationFetures();
				break;

			case 'text':
				this.startAnimationTranslaterText();
				break;

			case 'camera':
				this.startAnimationTranslaterCamera();
				break;

			case 'voice':
				this.startAnimationTranslaterVoice();
				break;

			case 'learn':
				this.startAnimationLearn();
				break;

			case 'culture':
				this.startAnimationCulture();
				break;
		}
	}

	feturesShow(items) {
		items.forEach((feture, i)=>{
			setTimeout(()=>{
				feture.classList.add(cls.show);
			}, (i + 1) * 300);
		});
	}

	feturesHide(items) {
		items.forEach((feture, i)=>{
			feture.classList.remove(cls.show);
		});
	}

	essentialsShow(items) {
		items.forEach((essential, i)=>{
			console.log(i);
			if (i == 0) {
				essential.classList.add(cls.show);
			} else {
				setTimeout(()=>{
					essential.classList.add(cls.show);
				}, (i + 1) * 2000);
			}

			if (i == items.length - 1) {
				return false;
			}
			setTimeout(()=>{
				essential.classList.add('--hide');
			}, (i + 1) * 3700);
		});
	}

	essentialsHide(items) {
		items.forEach((essential, i)=>{
			essential.classList.remove(cls.show);
		});
	}

	culturesShow(items, list) {
		console.log(items);
		items.forEach((culture, i)=>{

			if (i == 0) {
				culture.classList.add(cls.show);
			} else {
				setTimeout(()=>{
					culture.classList.add(cls.show);
				}, (i + 1) * 3000);
			}

			if (i == items.length) {
				return false;
			}
			setTimeout(()=>{
				list.style.transform = 'translateX(' + (i * 100) + '%)';
			}, (i + 1) * 3000);
		});
	}

	startAnimationFetures() {
		this.feturesShow(this.current.slide.inners.fetures);
	}

	startAnimationTranslaterText() {
		// lang
		this.current.slide.inners.translater.itemLangFrom.classList.add('--driggeble');
		setTimeout(()=>{
			this.current.slide.inners.translater.itemLangFrom.classList.remove('--detected');
		}, 2000);

		// hiddenTextFrom
		hiddenTextForStep.show(this.current.slide.inners.translater.hiddenTexts[0]);

		// hiddenTextTo
		setTimeout(()=>{
			hiddenTextForStep.show(this.current.slide.inners.translater.hiddenTexts[1]);
		}, 3500);
	}

	startAnimationTranslaterCamera() {
		setTimeout(()=>{
			this.current.slide.inners.translater.func.classList.add('--click');
		}, 1000);

		setTimeout(()=>{
			this.current.slide.inners.translater.photo.classList.add('--show');
		}, 1800);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.photo.classList.add('--center');
		// }, 2500);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.photo.classList.add('--darken');
		// }, 4300);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.pick.classList.add('--show');
		// }, 4300);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.pick.classList.add('--zoom');
		// }, 4300);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.pick.classList.add('--flash');
		// }, 4400);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.photo.classList.add('--hidden-photo');
		// 	this.current.slide.inners.translater.func.classList.add('--bg');
		// 	this.current.slide.inners.translater.pick.classList.add('--to-content');
		// }, 4700);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.itemLangFrom.classList.add('--driggeble-one');
		// }, 5300);

		// setTimeout(()=>{
		// 	this.current.slide.inners.translater.itemLangTo.classList.add('--driggeble-one');
		// }, 6000);

		// setTimeout(()=>{
		// 	hiddenTextForStep.show(this.current.slide.inners.translater.hiddenTexts[0]);
		// }, 6300);
	}

	startAnimationTranslaterVoice() {
		setTimeout(()=>{
			this.current.slide.inners.translater.func.classList.add('--click');
		}, 1000);

		setTimeout(()=>{
			this.current.slide.inners.translater.audio.classList.add('--show');
			this.current.slide.inners.translater.audioVideoEl.play();
		}, 1500);

		setTimeout(()=>{
			this.current.slide.inners.translater.audio.classList.remove('--show');
		}, 5500);

		setTimeout(()=>{
			this.current.slide.inners.translater.question.classList.add('--show');
		}, 6000);

		setTimeout(()=>{
			this.current.slide.inners.translater.answer.classList.add('--show');
		}, 6900);

	}

	startAnimationLearn() {
		setTimeout(()=>{
			this.essentialsShow(this.current.slide.inners.essentials)
		}, 1000);
	}

	startAnimationCulture(){
		setTimeout(()=>{
			this.culturesShow(this.current.slide.inners.cultures.items, this.current.slide.inners.cultures.list)
		}, 500);
	}
}

let hiddenTextForStep = {
	timeout: {
		letter: 200,
		word  : 200,
	},
	items: document.querySelectorAll('.hidden-text-for-step'),
	init(){
		this.items.forEach((item)=>{
			item.textType  = item.getAttribute('data-type');
			item.textParse = item.getAttribute('data-text');
			item.textParseArray = item.textType == 'letter' ? item.textParse.split('') : item.textParse.split(' '); 
			item.timeout = item.textType == 'letter' ? this.timeout.letter : this.timeout.word;
			

			if (item.textType != 'letter') {
				let arr = [];
				for (let i = 0; i < item.textParseArray.length; i++) {
					arr.push(item.textParseArray[i]);
					if (i != item.textParseArray.length - 1) {
						arr.push(' ');
					}
				}
				item.textParseArray = arr;
			}

			item.letters = [];
			for (let letter of item.textParseArray) {
				let letterI = document.createElement('i');
				letterI.innerText = letter;
				item.append(letterI);
				item.letters.push(letterI);
			}

			item.textParseArray = null;
		});
	},
	show(item){
		for (let i = 0; i < item.letters.length; i++) {
			setTimeout(()=>{
				let letter = item.letters[i];
				letter.classList.add(cls.show);
			}, i * item.timeout);
		}
	},
	hide(item) {
		for (let i = 0; i < item.letters.length; i++) {
			let letter = item.letters[i];
			letter.classList.remove(cls.show);
		}
	}
};

hiddenTextForStep.init();

new App();
// setTimeout(()=>{
	// scenes.sec.classList.add(cls.show);
// }, 6000);

// setTimeout(()=>{
// 	slides[0].classList.add(cls.current);
// }, 6000);

// slides.list.style.transform = 'translateX(-100%)';
// slides.items[0].classList.add(cls.current);
// slides.items[1].classList.add(cls.current);