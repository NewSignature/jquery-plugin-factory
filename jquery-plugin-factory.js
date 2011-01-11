/**
 * Copyright New Signature 2010
 */

/**
 * jQuery Plugin Factory
 * 
 * A simple framework for creating jQuery plugins that have several 'methods'.
 * The result will be a plugin that you can initialize like this:
 *    $('#foo').myplugin(param1, param2).show();
 *
 * Then you can call methods 'toggle' and 'bar' with you plugin like this:
 *    $('#foo').myplugin('toggle', param1).myplugin('bar', param1, parma2).fadeIn();
 *
 * The methods can alos act as getters and return values:
 *    var v = $('#foo').myplugin('current');
 *
 * 1) Most of the work is in creating the methods which is just an object of functions. 
 * 2) Any function name that starts with an underscore will not be exposed to the public.
 * 3) When the plugin initializes, it will call the method named '_init'.
 * 4) The 'this' object is for the each instance of the plugin.
 * 5) To get the element that the plugin is for, use this.element to get it.
 * 
 * @param $ - the jQuery instance to add the plugin to
 * @param name - the name to call the plugin with
 * @param methods - an object of functions to add as methods
 *   Any method name that starts with an underscore will be private, it will not be exposed.
 *   The method named '_init' will be called when initializing.
 * @param getters - an array of methods that return values
 */
function jQueryPluginFactory( $, name, methods, getters ){
  getters = getters instanceof Array ? getters : [];
  var getters_obj = {};
  for(var i=0; i<getters.length; i++){
    getters_obj[getters[i]] = true;
  }

  
  // Create the object
  var Plugin = function(element){
    this.element = element;
  };
  Plugin.prototype = methods;
  
  // Assign the plugin
  $.fn[name] = function(){
    var args = arguments;
    var returnValue = this;
    
    this.each(function() {
      var $this = $(this);
      var plugin = $this.data('plugin-'+name);
      // Init the plugin if first time
      if( !plugin ){
        plugin = new Plugin($this);
        $this.data('plugin-'+name, plugin);
        if(plugin._init){
          plugin._init.apply(plugin, args);
        }
        
      // call a method
      } else if(typeof args[0] == 'string' && args[0].charAt(0) != '_' && typeof plugin[args[0]] == 'function'){
        var methodArgs = Array.prototype.slice.call(args, 1);
        var r = plugin[args[0]].apply(plugin, methodArgs);
        // set the return value if method is a getter
        if( args[0] in getters_obj ){
          returnValue = r;
        }
      }
      
    });
    
    return returnValue; // returning the jQuery object
  };
};