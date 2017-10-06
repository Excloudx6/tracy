/* Code used to set up listeners for all DOM writes. */
(function(){
    /* This observer will be used to observe changes in the DOM. It will batches DOM changes and send them to the API
    * server if it finds a tracer string. */
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node){
                /* The only supported DOM types that we care about are `DOM` (1) and `text` (3). */
                if(node.nodeType == 1){
                    /* In the case of a DOM type, check all the node's children for input fields. Use this as a chance
                     * to restyle new inputs that were not caught earlier. */
                    chrome.runtime.sendMessage({'type': 'dom', 'msg': node.outerHTML, "location": document.location});
                    clickToFill(node);
                } else if (node.nodeType == 3) {
                    chrome.runtime.sendMessage({'type': 'text', 'msg': node.wholeText,"location": document.location});
                }
            });
        });
    });

    /* The configuration for the observer. We want to pretty much watch for everything. */
    var observerConfig = {
        attributes:     true,
        childList:      true,
        characterData:  true,
        subtree:        true
    };

    /* Globals for the HTML class names. */
    var inputClass = "xss-terminate-input";
    var enabledClass = "enabled-input";
    var disabledClass = "disabled-input";

    /* Inline CSS string. */
    var inlineCSSEnabled = "background-image: url('data:image/gif;base64,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');" +
          "background-repeat: no-repeat;" +
          "background-attachment: scroll;" +
          "background-size: 16px 18px;" +
          "background-position: 98% 50%;" +
          "cursor: pointer;" +
          "border: solid green;";

    var inlineCSSDisabled = "background-image: url('data:image/gif;base64,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');" +
          "background-repeat: no-repeat;" +
          "background-attachment: scroll;" +
          "background-size: 16px 18px;" +
          "background-position: 98% 50%;" +
          "cursor: pointer;" +
          "border: solid red;";

    /* Input types we are currently supporting. */
    var supportedInputTypes = [
      "text",
      "url",
      "search"
    ];

    /* Template for a tracer string. */
    var tracerString = "{{XSS}}";

    /* Add a new class name to each input element so they can be styled by the plugin. */
    function styleInputElement(tag) {
      /* Only highlight elements that are supported. Currently, this is textfields and other text inputs.
       * Nothing fancy like dates or colorpicker .*/
      if (tag && supportedInputTypes.includes(tag.type)) {
          /* By default, everything is marked "disabled". */
          tag.className = tag.className + " " + inputClass;
          tag.className = tag.className + " " + disabledClass;
          tag.className = tag.className.trim();
          tag.style = inlineCSSDisabled;
      }
    }

    /* Gets the element offset without jQuery. https://stackoverflow.com/questions/18953144/how-do-i-get-the-offset-top-value-of-an-element-without-using-jquery */
    function getElementOffset(element) {
      var de = document.documentElement;
      var box = element.getBoundingClientRect();
      var top = box.top + window.pageYOffset - de.clientTop;
      var left = box.left + window.pageXOffset - de.clientLeft;
      return { top: top, left: left };
    }

    /* Register a click handler on an input element. */
    function registerClickHandler(tag) {
      /* If the input element has an input class name, we have already added the event listener. */
      if (tag && !tag.className.includes(inputClass)) {
          tag.addEventListener("click", function(e) {
              var offset = getElementOffset(this);
              var rightEdge = this.getBoundingClientRect().right - offset.left;
              var mouseClickPosition = e.pageX - offset.left;

              if (mouseClickPosition / rightEdge * 100 > 65) {
                  // The click event is close to the right edge of the input field.
                  var enabled = toggleEnabled(tag);
                  if (enabled) {
                      /* Add the tracer string template. */
                      tag.value = tag.value + tracerString;
                  } else {
                      /* Clear out the text. */
                      tag.value = "";
                  }
               }
          });
      }
    }

    /* Register a change handler on an input element. */
    function registerChangeHandler(tag) {
      if (tag) {
          tag.addEventListener("change", function(e) {
              if (this.value.includes(tracerString)) {
                  toggleOn(this);
              } else {
                  toggleOff(this);
              }
          });
      }
    }

    /* Toggle an element on. */
    function toggleOn(tag) {
      if (tag) {
          if (tag.className.includes(disabledClass)) {
              /* Remove the disabled class. */
              tag.className = tag.className.slice(0, tag.className.indexOf(disabledClass)).trim();
              /* Add the enabled class. */
              tag.className = tag.className + " " + enabledClass;
              tag.style = inlineCSSEnabled;
          }
      }
    }

    /* Toggle an element off. */
    function toggleOff(tag) {
      if (tag) {
          if (tag.className.includes(enabledClass)) {
              /* Remove the enabled class. */
              tag.className = tag.className.slice(0, tag.className.indexOf(enabledClass)).trim();
              /* Add the disabled class. */
              tag.className = tag.className + " " + disabledClass;
              tag.style = inlineCSSDisabled;
          }
      }
    }

    /* Toggle the disabled and enabled class names on input fields. */
    function toggleEnabled(tag) {
      if (tag) {
          var enabled = false;
          if (tag.className.includes(enabledClass)) {
              toggleOff(tag);
          } else if (tag.className.includes(disabledClass)) {
              toggleOn(tag);
              /* Enabled should be true. */
              enabled = true;
          }

          /* Clear any whitespace at the end of the class. */
          tag.className = tag.className.trim();

          return enabled;
      }
    }

    /* Find all the inputs and style them with the extension. */
    function clickToFill(element) {
      /* Get all the input fields. We"ll filter them using the functions below. */
      var inputs = element.getElementsByTagName("input");

      /* Register event listeners for all types of elements we"d like to allow for a tracer. */
      Array.prototype.forEach.call(inputs, registerClickHandler);

      /* For all inputs, add a className to style the input. */
      Array.prototype.forEach.call(inputs, styleInputElement);

      /* Make an event handler that checks if the tracer string template is in the textfield. */
      Array.prototype.forEach.call(inputs, registerChangeHandler);
    }

    observer.observe(document.documentElement, observerConfig);
})();

