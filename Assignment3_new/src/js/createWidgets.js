(function($){
    $.fn.extend({
        bs_alert: function(message, title){
            var cls='alert-danger';
            var html='<div class="alert '+cls+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        },
        bs_warning: function(message, title){
            var cls='alert-warning';
            var html='<div class="alert '+cls+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        },
        bs_info: function(message, title){
            var cls='alert-info';
            var html='<div class="alert '+cls+' alert-dismissable mx-3 my-3 col-3"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h2>'+title+'</h2>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html($(this).html() + html);
        }
    });
})(jQuery);