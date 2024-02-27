
$(document).ready(function(){

    /*PC 내비게이션*/
    //변수선언
    let gnb = $('header .gnb > ul >li >a');
    //gnb메뉴 클릭시 해당 서브메뉴 보이게 하기
    gnb.click(function(){
        //$('.sub').hide(); //보이는 중인 서브메뉴 숨기고
        //$(this).next().show(); //선택한 서브메뉴만 보이게함

        $(this).next().toggle().parent().siblings().find('.sub').hide();
        //2.메인메뉴 클릭시 해당 .sub메뉴 show()/hide() == toggle();
        //3.메인메뉴 클릭시 펼쳐진 다른 .sub메뉴 모두 숨기기
    });
    //서브의 바깥(main)을 클릭하면 서브메뉴없어지기 
    $('main').click(function(){
        $('.sub').hide();
    });

    /*mobile 내비게이션*/
    $('#toggle').click(function(){
        $('#toggle span:nth-child(2)').toggle();
        $('#toggle span:first-child').toggleClass('rotate1');
        $('#toggle span:last-child').toggleClass('rotate2');
        $(this).toggleClass('bgcolor');

        

        //1. 토글버튼 클릭시 .gnb slideDown()/slideUp() == slideToggle();
        $('.gnb').slideToggle();
    });

    /*1.메인배너*/
    //변수선언
    const l_btn = $('.visual .s_btn li:first-child'); //좌버튼
    const r_btn = $('.visual .s_btn li:last-child'); //우버튼
    const c_btn = $('.visual .ctrl_btn li'); //컨트롤버튼
    let v_slide_img = $('.visual > div'); //슬라이드 이미지


    //작동하는 함수 >> 서서히 사라지고 나타나는 효과
    let i = 0;
    function fadeInOut(){
        //console.log('시간함수확인');
        v_slide_img.eq(i).fadeOut(); //보이는 이비지 숨김. '0'번쨰가 i의 인덱스0번째 번호(eq(i)뺴도됨)
        $('.visual .ctrl_btn li').removeClass('on'); //기존의 컨트롤버튼서식 모두제거
        if(i==2){ //만약 마지막 이미지라면
            i=0; //처음이미지보이게하고
        }else{ //아니라면
            i++; //다음이미지 보이게함
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on'); //선택한 컨트롤버튼에 서식적용
        v_slide_img.eq(i).stop().fadeIn(); //해당 이비지가 보이게함, stop():애니메이션 한번만작동하게 해줌
    }
    function fadeInOut2(){
        v_slide_img.fadeOut();
        $('.visual .ctrl_btn li').removeClass('on');
        if(i==0){
            i=2;
        }else{
            i--;
        }
        $('.visual .ctrl_btn li').eq(i).addClass('on');
        v_slide_img.eq(i).stop().fadeIn();
    }
        
    //매5초마다 함수를 반복호출하여 슬라이드가 변하게됨(setTimeout:시간이끝나고나서 실행하라)
    let Timer = setInterval(fadeInOut,5000); //얘는 먼저실행하고 5초뒤에 또 실행


    //좌우버튼 클릭시 해당하는 방향으로 슬라이드 이미지가 나옴
    l_btn.click(function(){
        fadeInOut2();
    });
    r_btn.click(function(){
        fadeInOut();
    });


    //좌우버튼에 마우스 오버시 시간을 제거하고(Timer랑 버튼이랑 중첩되서)
    $('.s_btn > li').hover(function(){
        clearInterval(Timer);
    },function(){ //다시 마우스 아웃시 시간을 생성하여 다시 움직이게 한다.
        Timer = setInterval(fadeInOut, 5000);
    });


    //pagenation(컨트롤버튼)
    //1.현재이미지번호 체크
    //2.이미지 전체개수

    /*구현순서
    1.컨트롤버튼 벼수선어
    2.컨트롤버튼(i) 클릭시 인덱스값 0,1,2,값을 출력
    3.인덱스값을 fadeInOut함수의 매개변수값으로 넘김 => 슬라이드가 변함
    4.사용자가 클릭한 컨트롤버튼(li)에 act서식을 적용하여 어둠게 함
    */

    c_btn.click(function(){
        clearInterval(Timer); //기존 자동슬라이드 제거
        
        let idx = $(this).index();
        console.log(idx); //0,1,2
        
        v_slide_img.fadeOut();
        $('.visual .ctrl_btn li').removeClass('on');
        
        $('.visual .ctrl_btn li').eq(idx).addClass('on');
        v_slide_img.eq(idx).stop().fadeIn();
        
        i = idx; //원래 i값에 idx값을 일치시켜서 다음 순서가 제대로 나오게
        
    });

    //컨트롤버튼에 마우스오버시 시간을 제거하여 슬라이드 멈추게
    c_btn.mouseenter(function(){ 
        clearInterval(Timer);
    });
    //컨트롤버튼에 마우스아웃시 다시 시간을 넣어서 다시 슬라이드 움직이게
    c_btn.mouseleave(function(){
        Timer = setInterval(fadeInOut, 5000);
    });



    //윈도우창의 너비값 = $(window).width(); or $(window).height();
    //$(window).innerWidth();
    let w_width;
    //브라우저의 크기가 변하면 함수내용을 실행한다.
    $(window).resize(function(){
    w_width = $(window).innerWidth();
    console.log(w_width);
    //pc해상도일 때 배경'노랑',tablet해상도일 때 배경'초록',mobile해상도일 때 배경'회색'
    if(w_width>=1025){
        //$('body').css('background','#ff0');
        $('header h1 img').attr('src','./images/logo_white.png');
    }else if(w_width>=768){ //w_width>767&&w_width<=1024
        //$('body').css('background','#0f0');
        $('header h1 img').attr('src','./images/logo_white.png');
    }else{
        //$('body').css('background','#ccc');
        $('header h1 img').attr('src','./images/logo_white.png');
    }
    }).resize();


    /*3. 탭메뉴 구현*/
    //변수선언
    let tab_mnu = $('.tab_con_wrap > li > a');

    $('.tab_con_wrap > li:first-child > div').show();
    //탭메뉴 클릭시 해당요소의 다음요소(동생) div 보이게 하기
    tab_mnu.click(function(){
        if($(window).width()>=768){ //pc,tablet 해상도일때
            $(this).next().show().parent().siblings().find('div').hide();
            $(this).addClass('act').parent().siblings().find('a').removeClass('act');
            $(this).find('i.fas').addClass('act01').parent().parent().siblings().find('i.fas').removeClass('act01');

            //li태그의 인덱스 번호를 구하여
            const i = $(this).parent().index();
            console.log(i);
            //만약 인덱스가 2라면(3번째 li태그)
            if(i==2){
                //부모박스높이 키우고
                $('.tab_con article').height(950);
            }else{
                //그렇지 않으면(0,1일떄) 원래높이로 설정
                $('.tab_con article').height(485);
            }
        }else{ //mobile 해상도
            $(this).next().slideDown().parent().siblings().find('div').slideUp();
            $(this).addClass('act').parent().siblings().find('a').removeClass('act');
            $(this).find('i.fas').addClass('act01').parent().parent().siblings().find('i.fas').removeClass('act01');

            const i = $(this).parent().index();
            if(i==2){
                $('.tab_con article').height(1335);
            }else{
                $('.tab_con article').height(1145);
            }
        }
        return false;
    });
    /*해상도 리사이즈*/
    $(window).resize(function(){
        if($(this).width() >= 768){ //pc,tablet
            if($('.tab_con_wrap>li:nth-child(3)>a').hasClass('act')){
                $('.tab_con article').height(950);
            }else{
                $('.tab_con article').height(485);
            }
        }else{ //mobile
            if($('.tab_con_wrap>li:nth-child(3)>a').hasClass('act')){
                $('.tab_con article').height(1335);
            }else{
                $('.tab_con article').height(1145);
            }
        }
    });

    /*5. 이벤트 슬라이드 구현*/
    //변수선언
    const eslide = $('.es_wrap');
    const es_lbtn = $('.lrbtn i.fa-angle-left');
    const es_rbtn = $('.lrbtn i.fa-angle-right');

    //첫번째슬라이드 앞에 마지막 슬라이드를 배치(ex. 4123, 312, 51234)
    $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
    //왼쪽으로 가로만큼(1200px) 이동하여 1번이 가운데에 배치 되도록 함
    eslide.css('margin-left','-100%');

    //moveleft함수
    function moveLeft(){
        eslide.stop().animate({'margin-left':'-200%'}, 500, function(){
            $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
            eslide.css('margin-left','-100%'); //한쪽으로 밀림방지??
        });
    }let Timer2 = setInterval(moveLeft, 3000); //함수실행
    //moveright함수
    function moveRight(){
        eslide.stop().animate({'margin-left':'0px'}, 500, function(){
            $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
            eslide.css('margin-left','-100%');
        });
    }

    //좌버튼 클릭
    es_lbtn.click(function(){
        clearInterval(Timer2);
        moveLeft();
    });
    //우버튼 클릭
    es_rbtn.click(function(){
        clearInterval(Timer2);
        moveRight();
    });
    //클릭후 마우스 떼면 다시 자동슬라이드 함수 실행
    $('.lrbtn i.fas').mouseleave(function(){
        Timer2 = setInterval(moveLeft, 3000);
    });

/*갤러리 모달 서식*/
      //갤러리 구현
      //1. 변수생성
        let g_list = $('.girl > figure > a');

        //2. 이미지목록 a요소 클릭시 href값 변수에 담아 modal윈도 띄우기
    g_list.click(function(){
        let img_src = $(this).attr('href');
        // let title = $(this).attr('title');
        let title = $(this).next().find('h6').text();
        let i = $(this).parent().index()+1;

        console.log(i); //li태그의 인덱스값 출력
        console.log(img_src); //href값 출력하기
        console.log(title); //title제목 출력하기

        let modal=`
        <div class="modal">
            <div class="center">
            <h3>${title}</h3>
            <img src=${img_src} alt="">
            <i class="fas fa-times"></i>
            <i class="fas fa-angle-left"></i>
            <i class="fas fa-angle-right"></i>
            <span class="p_num">${i}/8</span>
            </div>
        </div>
        `;

        //body태그의 맨뒤에 modal변수값 출력하기
        $('body').append(modal);

        //닫기 버튼 클릭시 모달윈도 숨기기
        $('.modal i.fa-times').click(function(){
        $('.modal').fadeOut();
        });

        //좌,우 버튼 클릭시 각각 함수 작성하기
        $('.modal i.fa-angle-left').click(function(){
        if(i == 1){
            i=8;
        }else{
            i--;
        }
        console.log(i); //1,8,7,6,5,4,3,2,1...
        dataChange(i);
        });

        $('.modal i.fa-angle-right').click(function(){
        if(i == 8){
            i=1;
        }else{
            i++;
        }
        console.log(i);//1,2,3,4,5,6,7,8,1....
        dataChange(i);
        });

        //좌, 우버튼 클릭시 받아온 i값을가지고
        //제목, 이미지, 페이지번호 변경하기
        function dataChange(i){

        //1. 페이지번호 <span class="p_num">${i}/12</span>
        $('.modal .p_num').text(i+'/8');

        //2. 인덱스번호에 맞는 제목 변경되어야....
        $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());

        //3. 인덱스번호에 맞는 이미지 출력하기
        if(i==2){
            $('.modal img').attr('src','./images/family0'+i+'.png');
        }else{
            $('.modal img').attr('src','./images/story0'+i+'.png');
        }   
        };
        return false;
    });



    /*탑버튼 스크롤(일정 세로스크롤값이되면 나옴) 서식*/
    //윈도우창 세로 스크롤값 체크
    $(window).scroll(function(){
        let s_pos = $(this).scrollTop();
        //console.log(s_pos);
        
        if(s_pos>=800){
            $('.t_btn').fadeIn(); //$('.t_btn').stop().fadeIn();
        }else{
            $('.t_btn').fadeOut(); //$('.t_btn').stop().fadeOut();
        }
    });

    //탑버튼클릭시 상단으로 이동
    $('.t_btn').click(function(){
        $('html, body').animate({'scrollTop':'0px'},1000);

        return false; //새로고침될때 탑버튼 한번깜박여서 넣는거
    });


    /* (쿠키플러그인) 메인페이지 모달창 띄우기 */
    let popup = `
    <div class="p_modal">
        <div class="banner">
            <span>[홍대] 입양문화센터</span>
            <a href="#" title="">
                <img src="./images/culture.jpg" alt="팝업이미지">
            </a>
            <input type="checkbox" id="ch">
            <label for="ch">오늘 하루 열지 않음</label>
            <input type="button" value="닫기" id="c_btn">
        </div>
    </div>
    `
    $('body').append(popup);

    //현재 브라우저에 쿠키popup의 값이 none이면 팝업을 나오지 않게 함
    if($.cookie('popup')=='none'){ //1.쿠키가있다면
        $('.p_modal').hide();
    }
    //체크박스 변수
    let $ex = $('.p_modal #ch'); //2.쿠키가없다면
    //체크박스에 사용자가 체크를 했는지 안했는지 확인하기 위한 함수
    function closePopup(){
        if($ex.is(':checked')){ //체크박스에 체크되었다면
            $.cookie('popup', 'none', {expires:1, path:'/'});
        }
        $('.p_modal').hide(); //쿠키를생성하고 종료한다
    }
    //닫기버튼 클릭시 해당함수를 호출하여 모달윈도 단다기
    $('.p_modal #c_btn').click(function(){
        closePopup();
    });


});
