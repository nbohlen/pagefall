/*
 * PageFall - jQuery Plugin
 * 
 * Copyright (c) 2011 Nick Bohlen
 *
 * Version: 0.1 (27/07/2010)
 * Requires: jQuery v1.5+
*/

(function($) {
  show_overlay = function(target_id, options) {
    $('#pf_overlay')
      .css('opacity',0)
      .css('top', $(target_id).outerHeight())
      .show()
      .animate({ 'opacity': '0.5'}, 'slow')
    
    $('#pf_overlay a#pf_close').click(function() {
      pf_close(target_id, options);
      return false;
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
    
    $('body').append(
      overlay = $("<div id='pf_overlay'><a href='#' id='pf_close'>" + options.close_title + "</a></div>")
    );
    
  }
  
  $.fn.pageFall = function(options) {
    options = $.extend($.fn.pageFall.defaults, options);
    
    pageFall_init(options);
        
    return this.each(function() {
        
      var target_id = $(this).attr('href');
      $(this).click(function() {
        $(target_id).delay(options.delay).slideToggle(options.speed, function(){
          show_overlay(target_id, options);
        });
      })
      
    })
  }
  
  
  $.fn.pageFall.defaults = {
    delay : 500,
    speed : 'fast',
    close_title : 'schließen'
  };
})(jQuery);