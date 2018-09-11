var Template = {
  banner: function (_AD, num) {
    var _html = '';
    $.each(_AD, function (key, val) {
      _html += " <a href='" + val['link'] + "' class='pj-Carousel-item'>";
      _html += " <img src='" + val['pic'] + "' alt='买商标，找尚标'>";
      _html += "</a>";
    })
    $('.pj-Carousel-box').append(_html);
  },
  recomSb: function (_AD, num) {
    var _html = '';
    $.each(_AD, function (key, val) {
      _html += "<li>";
      _html += " <div class='des'>";
      _html += " <span class='consults'>" + val['atitle'].replace('|', '</br>') + "</span>";
      _html += "<p>" + JSON.parse(val['remarks']).contents + "</p>";
      _html += " </div>";
      _html += "<div class='before'></div>";
      _html += " <a href='" + val['link'] + "'><img src='" + val['pic'] + "' alt='买商标，找尚标'></a>";
      _html += " <div class='communicate-price'  data-name='" + val['atitle'] + "'>免费咨询</div>";
      _html += "</li>";
    })
    $('.zyw_tjsb').append(_html);
    
    Common.show_sb_list_pop("http://172.19.20.63:8012", '.zyw_tjsb ');
    
  },
  onePic: function (_AD, num) {
    var _html = '';
    $.each(_AD, function (key, val) {
      _html += "<li>";
      _html += "<a href='javascript:void(0);' style='color:red;'>";
      _html += " <img src='" + val['pic'] + "' alt='买商标，找尚标'>";
      _html += val['atitle'];
      _html += "</a>";
      _html += "<div class='under'></div>";
      _html += "</li>";
    })
    $('.centerlist').append(_html);
  },
  smallPic: function (_AD, num) {
    var _html = '';
    $.each(_AD, function (key, val) {
      var _class = val['atitle'].split('|');
      _html += "<li>";
      _html += "<a href='" + val['link'] + "' data-id='" + _class['1'] + "' style='color:black;'>";
      _html += " <img src='" + val['pic'] + "' alt='买商标，找尚标'>";
      _html += _class['0'];
      _html += "</a>";
      _html += "<div class='under'></div>";
      _html += "</li>";
    })
    $('.centerlist').append(_html);
  },
  indexSb: function (_AD, num) {
    function getClass(num) {
      switch (num) {
        case 0:
          return 'first';
          break;
        case 1:
          return 'second';
          break;
        case 2:
          return 'third';
          break;
        default:
          return 'four';
          break;
      }
    }
    
    var _html = '';
    $.each(_AD, function (key, val) {
      var _classid = val['atitle'].split('|');
      _html += "<div class='" + getClass(key) + " clearfix'>";
      _html += " <img src='" + val['pic'] + "' alt='买商标，找尚标' class='left'>";
      _html += "<ul class='right clearfix content_" + key + "'>";
      _html += "</ul>";
      _html += "</div>";
    })
    $('.first-bottom').append(_html);
    $.each(_AD, function (key, val) {
      var _classid = val['atitle'].split('|');
      $.ajax({
        type: "get",
        url: '/zt/getsb',
        dataType: 'json',
        data: {bigclassid: 43, style4: 7, page_size: 8}, //_classid['1']
        success: function (data) {
          // console.log(data);
          var _html2 = '';
          $.each(data['result'], function (k, v) {
            _html2 += "<li>";
            _html2 += "<div class='before'></div>";
            _html2 += " <a href='/info-" + v['id'] + ".html'><img src='" + v['sbpic'] + "' alt='买商标，找尚标'></a>";
            _html2 += "<p>" + v['sbbigclassid'] + "类-" + v['sbname'] + "</p>";
            _html2 += "<div class='communicate-price' data-name='" + v['sbname'] + "'>立即询价</div>";
            _html2 += "</li>";
          })
          $('.first-bottom .' + getClass(key) + ' ul').append(_html2);
          Common.show_sb_list_pop("http://172.19.20.63:8012", '.' + getClass(key));
        }
        
      })
      
    });
    
  }
  
}