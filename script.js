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