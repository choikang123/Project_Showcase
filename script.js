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

// 기술 스택 js

document.addEventListener("DOMContentLoaded", () => {
  const addStackButton = document.getElementById("add-stack-button");
  const modal = document.getElementById("stack-modal");
  const closeModalButton = document.getElementById("close-modal");
  const stackForm = document.getElementById("stack-form");
  const doMeContainer = document.getElementById("do-me-container");

  // 로컬 스토리지에서 기술 스택 로드
  const savedStacks = JSON.parse(localStorage.getItem("stacks")) || [];
  savedStacks.forEach((stack) => renderStack(stack));

  // 모달 열기
  addStackButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // 모달 닫기
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 폼 제출 처리
  stackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // 아이콘, 제목, 설명 값 가져오기
    const stackIcon = document.getElementById("stack-icon").value;
    const stackTitle = document.getElementById("stack-title").value.trim();
    const stackDescription = document
      .getElementById("stack-description")
      .value.trim();

    if (stackIcon && stackTitle && stackDescription) {
      const stack = {
        id: Date.now(), // 유니크 ID
        icon: stackIcon,
        title: stackTitle,
        description: stackDescription,
      };

      renderStack(stack); // UI에 추가
      saveStack(stack); // 로컬 스토리지에 저장

      stackForm.reset(); // 폼 초기화
      modal.style.display = "none"; // 모달 닫기
    }
  });

  // 기술 스택 UI에 추가
  function renderStack(stack) {
    const stackDiv = document.createElement("div");
    stackDiv.className = "do-inner";
    stackDiv.setAttribute("data-id", stack.id); // 스택 ID 저장

    stackDiv.innerHTML = `
      <div class="icon">
        <i class="fa-brands ${stack.icon}"></i>
      </div>
      <div class="content">
        <h3>${stack.title}</h3>
        <p>${stack.description}</p>
        <button class="delete-stack">삭제</button>
      </div>
    `;

    // 삭제 버튼 기능 추가
    stackDiv.querySelector(".delete-stack").addEventListener("click", () => {
      deleteStack(stack.id);
    });

    doMeContainer.appendChild(stackDiv);
  }

  // 로컬 스토리지에 저장
  function saveStack(stack) {
    const stacks = JSON.parse(localStorage.getItem("stacks")) || [];
    stacks.push(stack);
    localStorage.setItem("stacks", JSON.stringify(stacks));
  }

  // 기술 스택 삭제
  function deleteStack(id) {
    // 로컬 스토리지에서 삭제
    let stacks = JSON.parse(localStorage.getItem("stacks")) || [];
    stacks = stacks.filter((stack) => stack.id !== id);
    localStorage.setItem("stacks", JSON.stringify(stacks));

    // UI에서 삭제
    const stackDiv = document.querySelector(`.do-inner[data-id="${id}"]`);
    if (stackDiv) {
      stackDiv.remove();
    }
  }
});


// 포트폴리오 js
document.addEventListener("DOMContentLoaded", () => {
  const addPortfolioButton = document.getElementById("add-portfolio-button");
  const portfolioModal = document.getElementById("portfolio-modal");
  const closeModalButton = document.getElementById("close-portfolio-modal");
  const portfolioForm = document.getElementById("portfolio-form");
  const portfolioList = document.getElementById("portfolio-list");

  // 현재 수정 중인 포트폴리오 인덱스 (수정을 위해)
  let editIndex = null;

  // 로컬 스토리지에서 포트폴리오 로드
  const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
  savedPortfolio.forEach((item) => renderPortfolio(item));

  // 모달 열기
  addPortfolioButton.addEventListener("click", () => {
    portfolioModal.style.display = "block";
    editIndex = null; // 새 포트폴리오 추가로 초기화
    portfolioForm.reset(); // 폼 초기화
  });

  // 모달 닫기
  closeModalButton.addEventListener("click", () => {
    portfolioModal.style.display = "none";
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === portfolioModal) {
      portfolioModal.style.display = "none";
    }
  });

  // 폼 제출 처리
  portfolioForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // 입력값 가져오기
    const title = document.getElementById("portfolio-title").value.trim();
    const url = document.getElementById("portfolio-url").value.trim();
    const platform = document.getElementById("portfolio-platform").value;

    if (title && url && platform) {
      const portfolioItem = { title, url, platform };

      if (editIndex !== null) {
        // 수정 모드
        savedPortfolio[editIndex] = portfolioItem;
        updatePortfolioUI(); // 전체 UI 갱신
        savePortfolioToLocalStorage(); // 로컬 스토리지 업데이트
      } else {
        // 새 항목 추가
        savedPortfolio.push(portfolioItem);
        renderPortfolio(portfolioItem); // UI에 추가
        savePortfolioToLocalStorage(); // 로컬 스토리지 저장
      }

      portfolioForm.reset(); // 폼 초기화
      portfolioModal.style.display = "none"; // 모달 닫기
    }
  });

  // 포트폴리오 렌더링
  function renderPortfolio({ title, url, platform }, index) {
    const platformIcons = {
      github: "fa-brands fa-github",
      velog: "fa-brands fa-blogger",
      notion: "fa-solid fa-book",
      etc: "fa-solid fa-link",
    };

    const portfolioDiv = document.createElement("div");
    portfolioDiv.className = "portfolio-inner";
    portfolioDiv.setAttribute("data-index", index);

    portfolioDiv.innerHTML = `
      <i class="${platformIcons[platform]}"></i>
      <div style="word-wrap: break-word; max-width: 100%;">
        <strong>${title}</strong>
        <a href="${url}" target="_blank" style="word-wrap: break-word; display: block; overflow-wrap: anywhere;">${url}</a>
      </div>
      <div class="portfolio-actions">
        <button class="edit-portfolio">수정</button>
        <button class="delete-portfolio">삭제</button>
      </div>
    `;

    // 수정 버튼
    portfolioDiv.querySelector(".edit-portfolio").addEventListener("click", () => {
      editIndex = index; // 수정할 인덱스 설정
      document.getElementById("portfolio-title").value = title;
      document.getElementById("portfolio-url").value = url;
      document.getElementById("portfolio-platform").value = platform;
      portfolioModal.style.display = "block"; // 모달 열기
    });

    // 삭제 버튼
    portfolioDiv.querySelector(".delete-portfolio").addEventListener("click", () => {
      savedPortfolio.splice(index, 1); // 해당 인덱스 항목 삭제
      updatePortfolioUI(); // 전체 UI 갱신
      savePortfolioToLocalStorage(); // 로컬 스토리지 업데이트
    });

    portfolioList.appendChild(portfolioDiv);
  }

  // UI 업데이트
  function updatePortfolioUI() {
    portfolioList.innerHTML = ""; // 기존 목록 비우기
    savedPortfolio.forEach((item, index) => renderPortfolio(item, index)); // 최신 상태로 렌더링
  }

  // 로컬 스토리지 저장
  function savePortfolioToLocalStorage() {
    localStorage.setItem("portfolio", JSON.stringify(savedPortfolio));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const addContactButton = document.getElementById("add-contact-button");
  const contactModal = document.getElementById("contact-modal");
  const closeContactModalButton = document.getElementById("close-contact-modal");
  const contactForm = document.getElementById("contact-form");
  const contactList = document.getElementById("contact-list");

  let editIndex = null;

  // Load contacts from localStorage
  const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  savedContacts.forEach((contact) => renderContact(contact));

  // Open modal
  addContactButton.addEventListener("click", () => {
    contactModal.style.display = "block";
    contactForm.reset();
    editIndex = null;
  });

  // Close modal
  closeContactModalButton.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Save contact
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const memo = document.getElementById("contact-memo").value.trim();

    const contact = { name, phone, email, memo };

    if (editIndex !== null) {
      // Edit contact
      savedContacts[editIndex] = contact;
      updateContactUI();
      saveContactsToLocalStorage();
    } else {
      // Add new contact
      savedContacts.push(contact);
      renderContact(contact);
      saveContactsToLocalStorage();
    }

    contactModal.style.display = "none";
  });

  // Render a single contact
  function renderContact({ name, phone, email, memo }, index) {
    const contactDiv = document.createElement("div");
    contactDiv.className = "contact-card";
    contactDiv.setAttribute("data-index", index);

    contactDiv.innerHTML = `
      <h3>${name}</h3>
      <p>📞 ${phone}</p>
      <p>📧 ${email}</p>
      <p>${memo}</p>
      <div class="contact-actions">
        <button class="edit-contact">수정</button>
        <button class="delete-contact">삭제</button>
      </div>
    `;

    // Edit button
    contactDiv.querySelector(".edit-contact").addEventListener("click", () => {
      editIndex = index;
      document.getElementById("contact-name").value = name;
      document.getElementById("contact-phone").value = phone;
      document.getElementById("contact-email").value = email;
      document.getElementById("contact-memo").value = memo;
      contactModal.style.display = "block";
    });

    // Delete button
    contactDiv.querySelector(".delete-contact").addEventListener("click", () => {
      savedContacts.splice(index, 1);
      updateContactUI();
      saveContactsToLocalStorage();
    });

    contactList.appendChild(contactDiv);
  }

  // Update UI
  function updateContactUI() {
    contactList.innerHTML = "";
    savedContacts.forEach((contact, index) => renderContact(contact, index));
  }

  // Save contacts to localStorage
  function saveContactsToLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(savedContacts));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const { jsPDF } = window.jspdf;

  const downloadButton = document.querySelector(".download");

  downloadButton.addEventListener("click", () => {
    try {
      const doc = new jsPDF();

      // Base64 폰트 등록
      doc.addFileToVFS("NanumGothic-Regular.ttf", _fonts);
      doc.addFont("NanumGothic-Regular.ttf", "NanumGothic", "normal");
      doc.setFont("NanumGothic");

      // PDF 제목
      doc.setFontSize(16);
      doc.text("My Profile", 20, 20);

      // 시작 높이 설정
      let currentHeight = 30;

      // 1. 자기소개 섹션
      const about = localStorage.getItem("about") || "자기소개가 없습니다.";
      doc.setFontSize(14);
      doc.text("자기소개:", 20, currentHeight);

      doc.setFontSize(12);
      const splitAbout = doc.splitTextToSize(about, 170); // 텍스트 너비 170px에 맞게 줄바꿈
      currentHeight += 10; // 제목과 내용 사이 간격

      splitAbout.forEach((line) => {
        doc.text(line, 20, currentHeight);
        currentHeight += 6; // 한 줄씩 간격 조정
      });

      currentHeight += 6; // 섹션 간 간격

      // 2. 기술 스택 섹션
      const stacks = JSON.parse(localStorage.getItem("stacks")) || [];
      doc.setFontSize(14);
      doc.text("활용 기술 스택:", 20, currentHeight);
      currentHeight += 10;

      if (stacks.length > 0) {
        stacks.forEach((stack, index) => {
          const stackText = `${index + 1}. ${stack.title}: ${stack.description}`;
          const splitStack = doc.splitTextToSize(stackText, 170);
          splitStack.forEach((line) => {
            doc.text(line, 20, currentHeight);
            currentHeight += 6;
          });
          currentHeight += 6; // 항목 간 간격 추가
        });
      } else {
        doc.setFontSize(12);
        doc.text("저장된 기술 스택이 없습니다.", 20, currentHeight);
        currentHeight += 12;
      }

      currentHeight += 6;

      // 3. 포트폴리오 섹션
      const portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
      doc.setFontSize(14);
      doc.text("포트폴리오:", 20, currentHeight);
      currentHeight += 10;

      if (portfolio.length > 0) {
        portfolio.forEach((item, index) => {
          const portfolioText = `${index + 1}. ${item.title}: ${item.url}`;
          const splitPortfolio = doc.splitTextToSize(portfolioText, 170);
          splitPortfolio.forEach((line) => {
            doc.text(line, 20, currentHeight);
            currentHeight += 6;
          });
          currentHeight += 6;
        });
      } else {
        doc.setFontSize(12);
        doc.text("저장된 포트폴리오가 없습니다.", 20, currentHeight);
        currentHeight += 12;
      }

      currentHeight += 6;

      // 4. 연락처 섹션
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      doc.setFontSize(14);
      doc.text("연락처 목록:", 20, currentHeight);
      currentHeight += 10;

      if (contacts.length > 0) {
        contacts.forEach((contact, index) => {
          const contactText = `${index + 1}. 이름: ${contact.name}, 전화번호: ${contact.phone}, 이메일: ${contact.email}, 메모: ${contact.memo}`;
          const splitContact = doc.splitTextToSize(contactText, 170);
          splitContact.forEach((line) => {
            doc.text(line, 20, currentHeight);
            currentHeight += 6;
          });
          currentHeight += 6;
        });
      } else {
        doc.setFontSize(12);
        doc.text("저장된 연락처가 없습니다.", 20, currentHeight);
        currentHeight += 12;
      }

      // PDF 저장
      doc.save("MyProfile.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  });
});
