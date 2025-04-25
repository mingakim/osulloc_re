// scroller 설정
const bodyScroller = document.querySelector('.scroller');
bodyScrollBar = Scrollbar.init(bodyScroller, {
    speed: 10,
    damping: 0.05,
    mobile: {
        speed: 0.6
    }
});



// h-top사라짐
let lastScrollTop = 0;

bodyScrollBar.addListener(function () {  
    const st = bodyScrollBar.scrollTop;

    // 최상단일 때만 up 클래스 제거
    if (st === 0) {
        $('header').removeClass('up');
    } 
    else {
        // 최상단이 아닐 때는 항상 up 클래스를 추가
        $('header').addClass('up');
    }

    // 마지막 스크롤 위치 업데이트
    lastScrollTop = st;
});


// 비디오 썸네일
var iframe = document.getElementById('vimeoVideo');
var player = new Vimeo.Player(iframe);

player.on('play', function() {
    // 비디오가 재생되면 썸네일 숨기기
    $('.video .thumbnail').css('opacity', '0');
});




// video title 효과
const letters = document.querySelectorAll('.video .title > p > span');

gsap.to(letters, {
    duration: 2,
    opacity: 1,
    stagger: 0.06, // 한 글자씩 0.1초 간격으로
    ease: "power1.inOut"
});


// sec-1스와이퍼
var swiper = new Swiper(".fromJeju-swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.fromJeju-swiper .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className} swiper-pagination-bullet-${index + 1}">
                        <img src="/오설록images/sec1_icon_${index + 1}.webp" alt="Page ${index + 1}">
                    </span>`;
        }
    }
});



// sec-2 이미지 텍스트
$(document).ready(function() {
    $('.sec-2 .field').click(function() {
        // 클릭한 버튼의 index 구하기 (0, 1, 2)
        const index = $(this).index();

        // 모든 .left(main-1, main-2, main-3) 숨기기
        $('.sec-2 .main .left').hide();

        // 해당하는 인덱스의 .left 보여주기
        $('.sec-2 .main .left').eq(index).show();

        // 배경 이미지
        $('.sec-2').css('background-image', 'url(/오설록images/sec-2_' + (index + 1) + '.png)');

        // 클릭된 .field에 'active' 클래스를 추가하고 다른 .field에서 제거
        $(this).siblings().removeClass('active'); 
        $(this).addClass('active'); 
    });

    // 페이지 로딩 시 하나만 보이게 초기화
    $('.sec-2 .main .left').hide();
    $('.sec-2 .main .left').eq(0).show();
    $('.sec-2').css('background-image', 'url(/오설록images/sec-2_1.png)');
    $('.sec-2 .main .right .field').eq(0).addClass('active');
});


gsap.registerPlugin(ScrollTrigger);


//pin
ScrollTrigger.create({    
        trigger: ".sec-3 .main",
        start: "top 10%",
        end: "bottom bottom",
        pin: true, 
        markers: true,
        scroller: ".scroller",
});



ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector(".scroller").style.transform ? "transform" : "fixed"
  });
  
  // ScrollTrigger와 Smooth Scrollbar 동기화
  bodyScrollBar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ".scroller" });