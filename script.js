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






    // sec-3 main pin효과
    // 타임라인 생성
    // var items = gsap.utils.toArray('.sec-3 .main > .item');
    // var txt = gsap.utils.toArray('.sec-3 .main .bottom .txt');

    // var easAction = gsap.timeline({
    //     defaults: {
    //     ease: 'none',        // 기본 easing 없이 순차적으로 진행
    //     stagger: 1.5         // 각 item들에 대한 stagger (0.2초 간격)
    //     },
    //     paused: true           // 애니메이션을 처음에 멈춰두기
    // });


    // // 각 item에 대해 애니메이션을 순차적으로 추가
    // easAction
    //     .to(items, {
    //     yPercent: 0,         // item들이 위로 올라옴
    //     duration: 1          // 각 item마다 1초의 애니메이션
    //     })
    //     .to(txt, {
    //     opacity: 1,          // .txt 요소의 opacity를 1로 설정 (보이도록)
    //     duration: 1          // 1초 동안 opacity가 1로 변함
    //     }, '+=0.5')            // 아이템들이 올라오는 애니메이션 뒤에 .txt가 등장하도록 0.5초 딜레이
    //     .to(txt, {
    //     opacity: 0,          // .txt 요소의 opacity를 0으로 설정 (사라지도록)
    //     duration: 1          // 1초 동안 opacity가 0으로 변함
    //     }, '+=1');             // 1초 후에 텍스트가 사라지도록 설정



    // // ScrollTrigger로 애니메이션을 스크롤에 맞춰 트리거
    // ScrollTrigger.create({
    //     trigger: '.sec-3',              // .sec-3 요소가 트리거가 됨
    //     start: 'top -10%',               // 스크롤이 10% 위치에 도달하면 애니메이션 시작
    //     end: 'bottom bottom',           // .sec-3가 화면 하단에 도달하면 애니메이션 종료
    //     animation: easAction,           // 스크롤에 맞춰 실행될 애니메이션
    //     scrub: 0.5,                     // 스크롤에 맞춰 애니메이션이 부드럽게 진행됨
    //     pin: '.sec-3 .main',                      // .sec-3을 고정시켜 스크롤 중에도 유지
    //     markers: true                   // 디버깅용 마커 표시
    // });


    // .sec-3 섹션의 .item 요소들을 배열로 가져오기
    const items = gsap.utils.toArray('.sec-3 .main > .item');
    const txts = gsap.utils.toArray('.sec-3 .main .txt');

    // 초기 상태 설정
    gsap.set(items, { yPercent: 110 });
    gsap.set(txts, { opacity: 0 });

    // 타임라인 생성
    const easAction = gsap.timeline({
        defaults: { ease: 'none' },
        paused: true
    });

    // 각 item과 txt를 순서대로 애니메이션에 추가
    items.forEach((item, index) => {
        easAction
            .to(item, {
            yPercent: 0,
            duration: 1,
            })
            .to(txts, {
            opacity: 1,
            duration: 0.5,
            }, "-=0.5") // item 올라오면서 txt도 동시에 거의 같이
            .to(txts, {
            opacity: 0,
            duration: 0.5,
            }, "+=0.8"); // 잠깐 보여지고 사라지도록
    });

    // ScrollTrigger 설정
    ScrollTrigger.create({
        trigger: '.sec-3 .main',
        start: 'top top',
        end: `+=${items.length * 500}`, // 아이템 수에 비례한 scroll 길이
        animation: easAction,
        scrub: 0.5,
        pin: true,
        markers: true
    });  



    //sec-4 line
    const line = document.querySelectorAll('.sec-4 .line');
    gsap.to(line, {
        scrollTrigger: {
            trigger: '.sec-4',
            start: 'top top', 
            toggleActions: 'play none none none' // 한 번만 실행
        },
        width: '100%',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
    });


    //sec-4 스와이퍼
    var swiper2 = new Swiper('.timeline-swiper', {
        slidesPerView: 'auto',
        spaceBetween: -100,
        slidesOffsetAfter: 300, //margin-left값, 음수값값 때문에 잘려서 마지막 슬라이드에 공간주기
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






