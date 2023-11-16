const figure = document.querySelector('figure');
const mask = document.querySelector('.mask');
const countEl = mask.querySelector('span');
const imgNum = 200;

let count = 0;

const imgs = createImgs(figure, imgNum);
imgCheck(imgs);

figure.addEventListener('mousemove', (e) => {
	const { pageX } = e;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);
	console.log(percent);

	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});

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
function imgCheck(imgs) {
	imgs.forEach((img) => {
		img.addEventListener('error', (e) => {
			e.currentTarget.setAttribute('src', 'img/logo.png');
		});
		img.addEventListener('load', () => {
			countEl.innerText = parseInt((count / imgNum) * 100) + 1;
			count++;
			if (count === imgNum) mask.remove();
		});
	});
}
