(function($) {
  show_overlay = function(target_id, options) {
    $('#pf_overlay')
      .css('opacity',0)
      .css('top', $(target_id).outerHeight())
      .show()
      .animate({ 'opacity': '0.5'}, 'slow', function() {
        $('a#pf_close')
          .fadeIn('slow')
          .css('top', $('#pf_overlay').css('top'))
          .css('left', '50%')
          .click(function() {
            pf_close(target_id, options);
            $(this).hide();
            return false;
          })
      })

  }
  
  pf_close = function(target_id,options) {
    $('#pf_overlay')
      .hide()
      .css('opacity',0)
      .css('top', 0)
    $(target_id).slideUp(options.speed);
  }
  
  pageFall_init = function(options) {
    
    if ( !$('#pf_overlay').length) {
      $('body').append(
        overlay = $("<a href='#' id='pf_close'>" + options.close_title + "</a><div id='pf_overlay'></div>")
      );
    }
  }
  
  $.fn.pageFall = function(options, callback) {
    options = $.extend($.fn.pageFall.defaults, options);
    
    pageFall_init(options);
    
        
    return this.each(function() {
      
      var target_id = $(this).attr('href');
      
      $(this).click(function() {
        $(target_id).delay(options.delay).slideToggle(options.speed, function(){
          if (typeof callback == 'function') { // make sure the callback is a function
                  callback.call(this); // brings the scope to the callback
              }
          
          show_overlay(target_id, options);
          
        });
      })
      
    })
    
  }
  
  
  $.fn.pageFall.defaults = {
    delay : 500,
    speed : 'fast',
    close_title : 'Schließen'
  };
})(jQuery);