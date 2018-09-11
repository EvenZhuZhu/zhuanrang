$(function () {
  //banner轮播图
  $('#pj-lunbo3').Carousel({
    'play': 'true', //是否循环播放
    'fade': 'true',
    'playTimer': '3000',
    'auto': 'true'
  })
  
  
  //热门推荐鼠标经过事件
  var $li = $('.zyw_hot .centerlist li')
  $li.on('mouseenter', function () {
    $(this).children('.under').css({
      'width': '80px',
      'background': '#f63906'
    })
    $(this).siblings('li').children('.under').css({
      'width': 0,
      'background': 'transparent'
    })
  })
  
  //热门推荐鼠标离开事件
  $li.on('mouseleave', function () {
    $li.eq(0).children('.under').css({
      'width': '80px',
      'background': '#f63906'
    })
    $li.eq(0).siblings('li').children('.under').css({
      'width': 0,
      'background': 'transparent'
    })
  })
  
  //热门推荐点击事件
  var idx = 0;
  $li.on('click', function () {
    idx = $(this).index()
    $(this).css('color', 'red').siblings('li').css('color', '#000')
    $(this).children('.under').css({
      'width': '80px',
      'background': '#f63906'
    })
    if ($(this).index() == 0) {
      $('.zyw_hot .first-bottom').css('display', 'block')
      $('.zyw_hot .centerlist-bottom').css('display', 'none')
    } else if ($(this).index() == $('.zyw_hot .centerlist li').length - 1) {
      return false
    } else {
      $('.zyw_hot .first-bottom').css('display', 'none')
      $('.zyw_hot .centerlist-bottom').css('display', 'block')
    }
    
    //热门推荐鼠标离开事件
    $li.on('mouseleave', function () {
      $li.eq(idx).children('.under').css({
        'width': '80px',
        'background': '#f63906'
      })
      $li.eq(idx).siblings('li').children('.under').css({
        'width': 0,
        'background': 'transparent'
      })
    })
  })
  
  //根据类名展示列表
  $('.zyw_hot .centerlist li div').on('click', function () {
    $('.zyw_hot .first').css('background', '#fff')
    $(this).css('background', 'green').parent('li').siblings('li').children('div').css('background', '#fff')
    
    $('.zyw_hot .first-bottom').css('display', 'none')
    $('.zyw_hot .centerlist-bottom').css('display', 'block')
  })
  
  //hover
  $('.zyw_tjsb li a img').on('mouseenter', function () {
    $(this).parent('a').prev('.before').css('display', 'block')
    $(this).parent('a').parent('li').siblings('li').children('.before').css('display', 'none')
  })
  
  // hover离开
  $('.zyw_tjsb li').on('mouseleave', function () {
    $('.zyw_tjsb li .before').css('display', 'none')
  })
  
  $('.before').on('click', function () {
    
    var $link = $(this).siblings('a').prevObject.context.nextElementSibling.href
    $(this).siblings('a').prevObject.context.nextElementSibling.target = '_blank';
  
    $(this).siblings('a').click()
    // console.log($link);
    // setTimeout(function () {
    //   $(window).attr('location', $link);
    // }, 200);
  })
  
})




