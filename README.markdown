# jQuery Plugin Factory

## Summary:

A simple framework for creating jQuery plugins that have several 'methods'.
The result will be a plugin that you can initialize like this:
   $('#foo').myplugin(param1, param2).show();

Then you can call methods 'toggle' and 'bar' with you plugin like this:
   $('#foo').myplugin('toggle', param1).myplugin('bar', param1, parma2).fadeIn();

The methods can also act as getters and return values:
   var v = $('#foo').myplugin('current');

## How to use:
Create an object of methods, an array of names of methods that are getters, and then pass 
it the factory function:

    var methods = {
      _init: function( options ){
        this.element; // the jQuery element that this works on
        // called when first created
      },
      
      aMethod: function(p){
        // some method that gets parameter p
      },
      
      aGetter: function(){
        // some method that returns a value
      },
      
      _privateMethod: function(){
        // a private method because it starts with an underscore
      }
    };
    
    var getters = ['aGetter'];
    
    jQueryPluginFactory( $, 'myplugin', methods, getters );
    
    $('div').myplugin(); // created
    $('div').myplugin('aMethod', 3).show(); // call the aMethod method
    alert($('div').myplugin('aGetter')); // get a value from the aGetter getter method

1. Most of the work is in creating the methods which is just an object of functions. 
2. Any function name that starts with an underscore will not be exposed to the public.
3. When the plugin initializes, it will call the method named '_init'.
4. The 'this' object is for the each instance of the plugin.
5. To get the element that the plugin is for, use this.element to get it.

If during the `_init` method you wish to cancel the creation of that plugin instances, return `false`.

### Parameters
1. $ - the jQuery instance to add the plugin to
2. name - the name to call the plugin with
3. methods - an object of functions to add as methods
  Any method name that starts with an underscore will be private, it will not be exposed.
  The method named '_init' will be called when initializing.
4. getters - an array of methods that return values

## License

Copyright New Signature 2010 - 2011

This program is free software: you can redistribute it and/or modify it under the terms of the 
GNU General Public License as published by the Free Software Foundation, either version 3 of the 
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  
If not, see <http://www.gnu.org/licenses/>.

You can contact New Signature by electronic mail at labs@newsignature.com 
or- by U.S. Postal Service at 1100 H St. NW, Suite 940, Washington, DC 20005.
