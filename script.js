/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
(function(){
  const spanEl = document.querySelector("main h2 span");
  const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
  let index = 0;
  let currentTxt = txtArr[index].split("");
  function writeTxt(){
    spanEl.textContent  += currentTxt.shift(); 
    if(currentTxt.length !== 0){ 
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    }else{
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 3000);
    }
  }
  function deleteTxt(){
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    if(currentTxt.length !== 0){
      setTimeout(deleteTxt, Math.floor(Math.random() * 100))
    }else{
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      writeTxt();
    }
  }
  writeTxt();
})();
/* end text_iife.js */

/* scroll_request.js */
/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
const headerEl = document.querySelector("header");
window.addEventListener('scroll', function(){
  requestAnimationFrame(scrollCheck);
});
function scrollCheck(){
  let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  if(browerScrollY > 0){
    headerEl.classList.add("active");
  }else{
    headerEl.classList.remove("active");
  }
}
/* end scroll_request.js */

/* move.js */
/* 애니메이션 스크롤 이동 */
const animationMove = function(selector){
  // ① selector 매개변로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // ② 현재 브라우저의 스크롤 정보(y 값)
  const browserScrollY = window.pageYOffset;
  // ③ 이동할 대상의 위치(y 값)
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // ④ 스크롤 이동
  window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};
// 스크롤 이벤트 연결하기
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e){
    const target = this.dataset.target;
    animationMove(target);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const aboutInput = document.getElementById('about-input');
  const aboutDisplay = document.getElementById('about-display');
  const saveAboutButton = document.getElementById('save-about');
  const uploadPhoto = document.getElementById('upload-photo');
  const photoPreview = document.getElementById('photo-preview');

  // 로컬 스토리지에서 데이터를 불러오기
  const savedAbout = localStorage.getItem('about');
  const savedPhoto = localStorage.getItem('photo');

  // 저장된 자기소개 불러오기
  if (savedAbout) {
    aboutDisplay.textContent = savedAbout;
  }

  // 저장된 사진 불러오기
  if (savedPhoto) {
    photoPreview.src = savedPhoto;
  }

  // 저장 버튼 클릭 시 자기소개 저장
  saveAboutButton.addEventListener('click', function () {
    const aboutText = aboutInput.value.trim();
    if (aboutText) {
      localStorage.setItem('about', aboutText); // 자기소개를 로컬 스토리지에 저장
      aboutDisplay.textContent = aboutText; // 저장된 내용 표시
      aboutInput.value = ''; // 입력 필드 비우기
      alert('내 소개가 저장되었습니다!');
    } else {
      alert('입력 내용이 비어 있습니다. 내용을 입력해주세요.');
    }
  });

  // 사진 등록 및 저장
  uploadPhoto.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const photoData = e.target.result; // Base64로 변환된 이미지 데이터
        localStorage.setItem('photo', photoData); // 로컬 스토리지에 저장
        photoPreview.src = photoData; // 미리보기 이미지 업데이트
        alert('사진이 저장되었습니다!');
      };
      reader.readAsDataURL(file); // 파일을 Base64로 변환
    }
  });
});
