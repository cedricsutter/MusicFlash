(function(window, undefined) {
  var dictionary = {
    "9f9841bc-7bc4-41a5-80b7-ce046db37b86": "NoLogIn",
    "971152b1-74ef-4b88-a054-e75138e54749": "Admin",
    "40e4b202-41e1-4e01-9048-65637e4e6779": "Home",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Log-In",
    "74f20f61-6021-45dd-8c56-1d26a9e74409": "CreateBlog",
    "cba06e95-8d7d-468f-8d90-95b6edaed0b4": "Create Account",
    "a880e23e-33d4-4e15-a9f1-3ca7f07ec4f0": "Update Account",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);