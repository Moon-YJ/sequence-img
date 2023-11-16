const figure = document.querySelector('figure');
const imgNum = 200;
let tags = '';

for (let i = 0; i < imgNum; i++) {
	tags += `<img src="../img/pic${i}.jpg" alt='pic${i}' />`;
}
figure.innerHTML = tags;

const imgs = figure.querySelectorAll('img');

figure.addEventListener('mousemove', (e) => {
	const { pageX } = e;
	// 백분율 공식 = (현재수치값 / 전체수치값) * 100
	// parseInt(숫자) = 인수로 전달된 값의 소수점 아래를 버리고 정수로 반환
	// parseFloat(숫자) = 인수로 전달된 값의 소수점까지 포함한 실수로 반환
	const percent = parseInt((pageX / window.innerWidth) * imgNum);
	console.log(percent);

	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});

/*
  전체 작업 흐름
  1. 동적으로 200개의 img DOM 생성
  2. 마우스무브시 포인터의 가로 좌표값을 200분율로 변환
  3. 200분율중 현재 마우스 포인터 위치순번에 따른 이미지만 보이게 처리
  4. img DOM이 생성되고 이미지 소스가 로딩될때마다 로딩순번을 100분율 처리
  5. 이미지생성시 해당이미지에 에러발생하면 대체이미지 처리
  6. 이미지소스가 모두 로딩되기 전까지는 마스크화면으로 가리고 로딩상황 100분율로 출력
  7. 이미지소스 로딩완료시 마스크화면 제거
*/
