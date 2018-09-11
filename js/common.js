document.write("<script language=javascript src='http://img-cdn.86sb.com/pc/calert/js/dialog.js'></script>");
document.write("<link href='http://img-cdn.86sb.com/pc/calert/css/dialog.css' media='screen' rel='stylesheet' type='text/css'/>");
var Common = {
    patternTel: /^1[3456789]\d{9}$/,
    isTel: function (tel) {
        var preg = Common.patternTel;
        if (!preg.test(tel)) {
            return false;
        } else {
            return true;
        }
    },
    show_hint: function (msg) {
        var d = dialog({
            content: msg,
            quickClose: true
        });
        d.show();
        setTimeout(function () {
            d.close().remove();
        }, 2000);
    },


    show_option: function (msg, href) {
        var d = dialog({
            title: '提示',
            content: msg,
            quickClose: true,
            okValue: '确定',
            ok: function () {
                this.title('处理中...');
                if (href) window.location.href = href;
            },
            cancelValue: '取消',
            cancel: function () {
            }
        });
        d.show();
    },
    show_dialog: function (content, tit = '温馨提示') {
        var d = dialog({
            title: tit,
            content: content,
            ok: function () { },
        });
        d.show();
    },
    show_modal: function (title, content, width = 400) {
        var d = dialog({
            width: width,
            title: title,
            esc: true,
            fixed: true,
            content: content
        });
        d.showModal();
    },
    show_sb_list_pop: function (uri,cl) {
        
        $(cl+' .communicate-price').on('click', function (e) {
            var that = $(this);
            that.closest('.rdef').unbind();
            $('.consult .close').click();
            var demo_name = $(this).closest('dl').find('dd').first().find('a').find('abbr').text()
            var sbName = demo_name=='' ? $(this).attr('data-name'): demo_name;
            var content = '<i class="close-pop" style="cursor:pointer;right: -24px;top: -34px;width: 50px;height: 50px;position: absolute;display: inline-block;background: url(http://img-cdn.86sb.com/pc/calert/img/products/close.png) no-repeat center center;"></i><div class="outer" style="position:absolute;top:190px;width: 100%;padding: 0 42px;box-sizing: border-box;">\n' +
                '    <input class="brandname" style="border-radius:3px;margin-bottom: 10px;background: #fbfaff url(http://img-cdn.86sb.com/pc/calert/img/products/brand.png) no-repeat 8px center;width: 100%;height: 40px;padding-left: 43px;box-sizing: border-box;outline: none;border: none;" readonly type="text" value="' + sbName + '">\n' +
                '    <input class="phone" style="border-radius:3px;margin-bottom: 10px;background: #fbfaff url(http://img-cdn.86sb.com/pc/calert/img/products/phone.png) no-repeat 11px center;width: 100%;height: 40px;padding-left: 43px;box-sizing: border-box;outline: none;border: none;" type="text" placeholder="请输入您的手机号码">\n' +
                '    <input class="name" style="border-radius:3px;margin-bottom: 20px;background: #fbfaff url(http://img-cdn.86sb.com/pc/calert/img/products/name.png) no-repeat 8px center;    width: 100%;height: 40px;padding-left: 43px;box-sizing: border-box;outline: none;border: none;" type="text" placeholder="请输入您的称呼">\n' +
                '    <div class="consult-submit" style="width:316px;margin-left: 8px;cursor:pointer;border-radius:27px;height: 54px;line-height: 54px;background:#ea6453; font-size: 20px;text-align: center;color: #fff;">立即获取报价</div>\n' +
                '</div>';
            Common.show_modal('', content, 419);
            changeStyle();
            $('input.brandname,input.name').on('keyup', function () {
                var str = $(this).val();
                var value = str.substr(0, 10);
                $(this).val(value);
            });
            $('.consult-submit').on('click', function (e) {
                var tel = $('.outer .phone').val().trim();
                var pattern = Common.patternTel;
                if (!pattern.test(tel)) {
                    Common.show_dialog('手机号格式不正确！');
                    return false;
                }

                var content1 = ' <i class="close-pop" style="cursor:pointer;right: -24px;top: -34px;width: 50px;height: 50px;position: absolute;display: inline-block;background: url(http://img-cdn.86sb.com/pc/calert/img/products/close.png) no-repeat center center;"></i><div class="outer" style="position:absolute;top:190px;text-align:center;width: 100%;box-sizing: border-box;">\n' +
                    '    <img class="success" style="margin-left: 0%;margin-top: -50px;width: 97px;" src="http://img-cdn.86sb.com/pc/calert/img/products/success.png" alt="">' +
                    '       <p style="font-size:33px;color: #E75450;line-height: 25px;   margin-bottom: 15px;" class="des des1">提交成功</p>' +
                    '<p style="margin:0;color: #9f9b9b;line-height: 25px;" class="des des1">已经收到您的询价留言</p>\n' +
                    '    <p style="margin-bottom: 12px;color: #9f9b9b;line-height: 25px;" class="des des2">正在为您安排商标顾问，请您耐心等待</p>\n' +
                    '    <div class="sub1" style="width:316px;margin-left: 54px;cursor:pointer;border-radius:27px;height: 54px;line-height: 54px;background:#ea6453; font-size: 20px;text-align: center;color: #fff;">确定</div>\n' +
                    '</div>';
                var name = $.trim($('.outer .name').val()) != '' ? $.trim($('.outer .name').val()) : '商标询价';
                var url = uri + "/system-app/addx?a=addx&m=Backend&businesstypeId=1&utel=" + tel + "&sbname=" + sbName + "&uname=" + name + "&froms=0&urlx=" + window.location.href;
                removePop(that);
                $.get(url, function (data) {
                    if (data > 0) {
                        Common.show_modal('', content1, 419);
                        changeStyle2();
                        $('.sub1').click(function () {
                            removePop(that);
                        });
                        closePop(that);
                    } else {
                        Common.show_dialog('添加失败');
                    }
                });

            });
            function changeStyle() {
                $('.ui-dialog-header').css({ 'border-top-left-radius': '20px', 'border-top-right-radius': '20px', 'line-height': '152px', 'height': '152px', 'text-align': 'center', 'color': '#fff', 'font-size': '33px', });
                $('.ui-dialog-title').css({ 'font-weight': '500', 'width': '100%', 'padding': '0', 'height': '80px' });
                $('.ui-dialog-close').css({ 'border': '1px solid #fff', 'border-radius': '50%', 'width': '43px', 'height': '42px', 'color': '#fff', 'opacity': '0.8', 'top': '0', 'right': '15px' });
                $('.ui-dialog').css({ 'height': '439px', 'border-radius': '20px', 'background': 'url("http://img-cdn.86sb.com/pc/calert/img/products/bg.png") no-repeat center center' });
                $('.ui-dialog-body').css({ 'padding': '0' });
                $('body').css('overflow', 'hidden');
                $('.ui-dialog-content').css('position', 'relative');
                $('.consult .close').click();
                $('.ui-dialog').parent().css('top', '150px')

            }
            function changeStyle2() {
                $('.ui-dialog-header').css({ 'border-top-left-radius': '20px', 'border-top-right-radius': '20px', 'line-height': '152px', 'height': '152px', 'text-align': 'center', 'color': '#fff', 'font-size': '33px', });
                $('.ui-dialog-title').css({ 'font-weight': '500', 'width': '100%', 'padding': '0', 'height': '80px' });
                $('.ui-dialog-close').css({ 'border': '1px solid #fff', 'border-radius': '50%', 'width': '43px', 'height': '42px', 'color': '#fff', 'opacity': '0.8', 'top': '0', 'right': '15px' });
                $('.ui-dialog').css({ 'height': '439px', 'border-radius': '20px', 'background': 'url("http://img-cdn.86sb.com/pc/calert/img/products/bg1.png") no-repeat center center' });
                $('.ui-dialog-body').css({ 'padding': '0' });
                $('body').css('overflow', 'hidden');
                $('.ui-dialog-content').css('position', 'relative');
                $('.consult .close').click();
                $('.ui-dialog').parent().css('top', '150px')
            }

            function removePop(that) {
                $('.ui-popup-backdrop').remove();
                $('.ui-dialog').remove();
                $('body').css('overflow', 'auto');
                bindRdef(that);
            }
            closePop(that);
            function closePop(that) {
                $('.close-pop').click(function (e) {
                    $('.ui-popup-backdrop').remove();
                    $('.ui-dialog').remove();
                    $('body').css('overflow', 'auto');
                    bindRdef(that);
                });
            }
            function bindRdef(that) {
                that.closest('.rdef').on("mouseenter", function () { that.closest('.rdef').animate({ top: '-41px' }, 'fast') });
                that.closest('.rdef').on("mouseleave", function () { that.closest('.rdef').animate({ top: '0px' }, 'fast', function () { that.closest('.rdef').stop(); }) });
            }
        });
        setTimeout(function () {
            if ($('.ui-dialog .outer').length > 0) {
                $('.consult .close').click();
            }
        }, 5000);
    }
};