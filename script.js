// scroller 설정
$(document).ready(function () {
    // 1. ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    // 2. 스크롤바 초기화
    const bodyScroller = document.querySelector('.scroller');
    const bodyScrollBar = Scrollbar.init(bodyScroller, {
        speed: 10,
        damping: 0.05,
        mobile: {
            speed: 0.6
        }
    });

    // 3. ScrollTrigger에 스크롤 동기화
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
        }
    });

    // 4. ScrollTrigger 업데이트 연결
    bodyScrollBar.addListener(ScrollTrigger.update);

    // 5. 필요 시 리프레시
    ScrollTrigger.defaults({ scroller: ".scroller" });
    ScrollTrigger.refresh();




    
    // h-top사라짐
    var lastScrollTop = 0;  // lastScrollTop 초기화
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
    })


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
        stagger: 0.06, 
        ease: "power1.inOut"
    });


    // sec-1스와이퍼
    var swiper1 = new Swiper(".fromJeju-swiper", {
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






    const items = gsap.utils.toArray(".sec-3 .main .item");
    const txts = gsap.utils.toArray(".sec-3 .main .item .txt");
    
    // 초기 설정
    gsap.set(items, { yPercent: 120 });
    gsap.set(items[0], { yPercent: 0 });
    gsap.set(txts, { opacity: 0 });
    gsap.set(items[0].querySelectorAll(".txt"), { opacity: 1 });
    
    // 메인 타임라인 생성
    const sec3Timeline = gsap.timeline({
        paused: true,
    });
    
    // 각 item 순차 애니메이션 설정
    items.forEach((item, index) => {
        const prevItem = items[index - 1];
        const currentTxts = item.querySelectorAll(".txt");


        // 현재 item 나타나기
        sec3Timeline.to(item, {            
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
        });
        
        // 현재 txt들 보이기
        sec3Timeline.to(
            currentTxts,
            {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            },
            "-=0.6"  
        );

        // 이전 item 사라지기
        if (prevItem) {
                sec3Timeline.to(prevItem, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
                }, "-=0.8"); // 약간 겹쳐서 진행
        }
    });
        
    // ScrollTrigger 연결
    ScrollTrigger.create({
    animation: sec3Timeline,
    trigger: ".sec-3 .main",
    start: "top 22%",
    end:  `+=${items.length * 1000}`, // 아이템 수에 비례한 스크롤 거리
    scrub: 1,
    pin: true,
    // markers: true,
    });





    //sec-4 line
    const line = document.querySelectorAll('.sec-4 .line');
    gsap.to(line, {
        scrollTrigger: {
            trigger: '.sec-4',
            start: 'top 10%', 
            toggleActions: 'play none none none' // 한 번만 실행
        },
        width: '100%',
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
    });


    
    //sec-4 스와이퍼
    var swiper2 = new Swiper('.timeline-swiper', {
        slidesPerView: 'auto',
        spaceBetween: -100,
        slidesOffsetAfter: 300, //margin-left값, 음수값 때문에 잘려서 마지막 슬라이드에 공간주기
    });

    gsap.set('.timeline-swiper .swiper-slide', { opacity: 0 });

    // 각 슬라이드가 하나씩 보이도록 애니메이션 추가
    gsap.to('.timeline-swiper .swiper-slide', {
        opacity: 1,
        duration: 1,
        stagger: 0.5, // 슬라이드들이 0.5초 간격으로 나타나도록 설정
        toggleActions: 'play none none none',
        scrollTrigger: {
            trigger: '.timeline-swiper',
            start: 'top 60%', // 화면에 슬라이드가 들어오면 애니메이션 시작
            end: 'bottom 10%', // 화면을 벗어나기 직전에 애니메이션 종료
            scrub: 1, // 스크롤에 따라 애니메이션 진행            
        }
    });



    //sec-5 스와이퍼
    var swiper3 = new Swiper('.meet-swiper', {
        slidesPerView: 1,
        spaceBetween: 100,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        loop: true,
    });
});






