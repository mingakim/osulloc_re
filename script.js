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
            speed: 3
        }
    });

    // 3. ScrollTrigger에 스크롤 동기화
    ScrollTrigger.scrollerProxy('.scroller', {
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
    ScrollTrigger.defaults({ scroller: '.scroller' });
    AOS.init();
    ScrollTrigger.addEventListener('refresh', AOS.refresh);
    ScrollTrigger.refresh();



    
    // h-top사라짐
    bodyScrollBar.addListener(function () {
        const st = bodyScrollBar.scrollTop;
        const triggerPoint = window.innerHeight * 0.7;
    
        // header.up은 계속 적용
        if (st === 0) {
            $('header').removeClass('up');
        } else {
            $('header').addClass('up');
        }
    
        // 100vh 이상일 때만 .h-main에 header-visible 클래스 추가
        if (st >= triggerPoint) {
            $('header .h-main').addClass('bg-show');
        } else {
            $('header .h-main').removeClass('bg-show');
        }
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
        stagger: 0.05, 
        ease: "power1.inOut"
    });




    // aos효과
    let getAllAos = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'));

    AOS.init({
		easing: 'ease-out-quart',
		duration: 1000,
        once: false,
	});

    getAllAos.length > 0 && getAllAos.forEach((item) => {
		gsap.to(item, {
			scrollTrigger: {
				trigger: item,
				start: 'top bottom',
				end: 'bottom center',
                scroller: '.scroller',
				onEnter: (scroll) => {
					item.classList.add('aos-animate');
				},
                onLeaveBack: () => {
                    item.classList.remove('aos-animate');
                }
			}
		})
	});




    // sec-1스와이퍼
    var swiper1 = new Swiper('.fromJeju-swiper', {
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





    // sec-3 pin 설정
    const items = gsap.utils.toArray('.sec-3 .main .item');
    const txts = gsap.utils.toArray('.sec-3 .main .item .txt');
    
    ScrollTrigger.matchMedia({
        // 561px 이상일 때만 실행
        '(min-width: 780px)': function () {
            // 초기 상태 세팅
            gsap.set(items, { yPercent: 140 });
            gsap.set(items[0], { yPercent: 0 });
            gsap.set(txts, { opacity: 0 });
            gsap.set(items[0].querySelectorAll(".txt"), { opacity: 1 });
        
            // 타임라인 생성
            const sec3Timeline = gsap.timeline({ paused: true });
        
            items.forEach((item, index) => {
                const prevItem = items[index - 1];
                const currentTxts = item.querySelectorAll(".txt");
        
                sec3Timeline.to(item, {
                    yPercent: 0,
                    duration: 1,
                    ease: "power2.out",
                });
            
                sec3Timeline.to(currentTxts, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    },"-=0.6"
                );
            
                if (prevItem) {
                    sec3Timeline.to(prevItem, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power1.out",
                        },"-=0.8"
                    );
                }
            });
        
            // ScrollTrigger 연결
            ScrollTrigger.create({
                animation: sec3Timeline,
                trigger: ".sec-3 .main",
                start: "top 15%",
                end: `+=${items.length * 1000}`,
                scrub: 1,
                pin: true,
                scroller: '.scroller',
            });
        }
    });





    //sec-4 스와이퍼
    var swiper2 = new Swiper('.timeline-swiper', {
        slidesPerView: 'auto',
        slidesOffsetAfter: 150, //margin-left값, 음수값 때문에 잘려서 마지막 슬라이드에 공간주기
        breakpoints: {
            780: {
                slidesOffsetAfter: 300, 
            },

            990: {
                slidesOffsetAfter: 350,
            }
        },
        scrollbar: {
            el: '.sec-4 .swiper-scrollbar',
            draggable: true, 
        },
    });

    // sec-4 line
    const line = document.querySelectorAll('.sec-4 .line');


    // GSAP 타임라인 생성
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sec-4',
            start: 'top 25%',
            end: 'bottom 90%',   
            scroller: '.scroller',         
        }
    });

    // line 애니메이션 추가
    tl.to(line, {
        width: '100%',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        toggleActions: 'play none none none',
    })
    // swiper-slide 애니메이션이 line 애니메이션이 끝난 후에 실행되도록 추가
    .to('.timeline-swiper .swiper-slide', {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        toggleActions: 'play none none none',
    }, "-=0.5");



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



// footer 공지사항 scroll
setInterval(function() {
    $('footer .f-top > ul').animate({top: '-=21px'}, 500, function() {
        $(this).append($(this).children().first());
        $(this).css('top', 0);
    });
}, 3000);


