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
    var sb_id = $(this).children('a').attr('data-id');
    $(this).children('a').css('color', 'red')
    $(this).siblings('li').children('a').css('color', '#000')
    $(this).children('.under').css({
      'width': '80px',
      'background': '#f63906'
    })
    if ($(this).index() == 0) {
      $('.zyw_hot .first-bottom').css('display', 'block')
      $('.zyw_hot .centerlist-bottom').css('display', 'none')
      $('.centerlist-bottom').html('');
    } else if ($(this).index() == $('.zyw_hot .centerlist li').length - 1) {
      return false
    } else {
      $('.zyw_hot .centerlist-bottom').css('display', 'none');
      $('.centerlist-bottom').html('');
      $('.waiting').css('display', 'block');
      $.ajax({
        type: "get",
        url: '/zt/getsb',
        dataType: 'json',
        data: {bigclassid: sb_id, page_size: 20,},//style4	:7,
        success: function (data) {
          var _html = '';
          $.each(data['result'], function (key, val) {
            _html += "<li>";
            _html2 += "<div class='before'></div>";
            _html += " <a href='/info-" + val['id'] + ".html'><img src='" + val['sbpic'] + "' alt='买商标，找尚标'></a>";
            _html += "<p>" + val['sbbigclassid'] + "类-" + val['sbname'] + "</p>";
            _html += "<div class='communicate-price' data-name='" + val['sbname'] + "'>立即询价</div>";
            _html += "</li>";
          })
          $('.centerlist-bottom').html(_html)
          $('.waiting').css('display', 'none');
          Common.show_sb_list_pop("http://172.19.20.63:8012", '.centerlist-bottom');
        }
      })
      
      $('.zyw_hot .first-bottom').css('display', 'none');
      $('.zyw_hot .centerlist-bottom').css('display', 'block');
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
  });
  
  //hover
  $('.zyw_tjsb li a img').on('mouseenter', function () {
    $(this).parent('a').prev('.before').css('display', 'block')
    $(this).parent('a').parent('li').siblings('li').children('.before').css('display', 'none')
  })
  
  // hover离开
  $('.zyw_tjsb li').on('mouseleave', function () {
    $('.zyw_tjsb li .before').css('display','none')
  })
  
  //热门推荐hover
  $('.zyw_hot .first-bottom .right li img').on('mouseenter', function () {
    $(this).parent('a').prev('.before').css('display', 'block')
    $(this).parent('a').parent('li').siblings('li').children('.before').css('display', 'none')
  })
  
  //热门推荐hover离开
  $('.zyw_hot .first-bottom .right li').on('mouseleave', function () {
    $('.zyw_hot .first-bottom .right li .before').css('display','none')
  })
  
  // 根据类名展示列表hover
  $('.zyw_hot .centerlist-bottom li img').on('mouseenter', function () {
    $(this).parent('a').prev('.before').css('display', 'block')
    $(this).parent('a').parent('li').siblings('li').children('.before').css('display', 'none')
  })
  
  // 根据类名展示列表hover离开
  $('.zyw_hot .centerlist-bottom li').on('mouseleave', function () {
    $('.zyw_hot .centerlist-bottom li .before').css('display', 'none')
  })
  
  
})

function tzswt(eve, swt) {
  var cname = $(eve).attr("attr-id");
  var domain = window.location.host;
  //var url = "http://chat.86sb.com/lr/chatpre.aspx?id=kvf72347570&amp;lng=cn&amp;p="+window.location.host+"-sbxzr-banner在线咨询&amp;r=&amp;rf1=&amp;rf2=&amp;cid=1507863710714319193404&amp;sid=1508121649385805237169"
  $.ajax({
    url: '/zt/clickswttj',
    type: 'GET',
    data: {
      um: 'clickswttj',
      zt: 'newjj_sbxzr',
      type: 1,
      classname: cname,
      way: cname,
      t: '2037-07-03',
      tt: Math.random(),
      source: location.href,
    },
    beforeSend: function () {
    },
    success: function () {
      if (swt != 1) {
        location.href = $(eve).attr("data-href");
      } else {
        toswt('');
        // window.open("http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA0MzY3Ml80NDIzMzZfNDAwNzExMDg2MF8yXw", "_blank", "height=800, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
        return false;
      }
    }
  });
}



