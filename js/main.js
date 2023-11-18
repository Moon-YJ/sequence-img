const figure = document.querySelector('figure');
const mask = document.querySelector('.mask');
const bar = mask.querySelector('.progress-bar');
const countEl = mask.querySelector('span');
const imgNum = 200;
const delayTime = convertSpeed(mask);

// 로딩시 (시스템 이벤트)
const imgs = createImgs(figure, imgNum);
imgCheck(imgs, delayTime);
// event객체가 인수로 전달되는 경우에는 wrapping함수로 감싸지 않아도 됨(함수를 정의문 형태로)
// 마우스무브시 (사용자 이벤트)
figure.addEventListener('mousemove', showImg);

// 동적 이미지 생성 함수
function createImgs(figure, imgNum, imgName = 'pic') {
	let tags = '';
	for (let i = 0; i < imgNum; i++) {
		tags += `<img src="img/${imgName}${i}.jpg" alt='${imgName}${i}' />`;
	}
	figure.innerHTML = tags;
	// DOM 생성되자마자 바로 return값 내보내서 활용 가능하도록 처리
	return figure.querySelectorAll('img');
}

// 이미지소스 로딩 완료여부 체크 함수
function imgCheck(imgs, delayTime) {
	let count = 0;
	imgs.forEach((img) => {
		// 시스템 이벤트
		img.addEventListener('error', (e) => {
			e.currentTarget.setAttribute('src', 'img/logo.png');
		});
		// 시스템 이벤트
		img.addEventListener('load', () => {
			const percent = parseInt((count / imgNum) * 100) + 1;
			countEl.innerText = percent;
			bar.style.width = percent + '%';
			console.log(bar.style.width);
			count++;
			if (count === imgNum) {
				mask.classList.add('off');
				setTimeout(() => mask.remove(), delayTime);
			}
		});
	});
}

// 현재 마우스 포인터 위치에 따른 이미지 노출 처리 함수
function showImg(e) {
	const { pageX } = e;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);

	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
}

function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}
