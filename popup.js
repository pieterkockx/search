window.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('button');
  var box = document.getElementById('box');
  button.addEventListener('click', function() {
    search(box.value)
  });
});

function createTab(url) {
  var createProperties = {
    url: url,
    active: false
  };
  chrome.tabs.create(createProperties);
}

function search(term) {
  var match = new RegExp('%s');
  function traverse(trees) {
    trees.forEach(function(tree) {
      if (tree.hasOwnProperty('children') && tree.children.length > 0)
        traverse(tree.children);
      else if (tree.hasOwnProperty('url') && match.test(tree.url))
        createTab(tree.url.replace('%s', encodeURIComponent(term)));
    });
  }
  chrome.bookmarks.getTree(function(trees) {
    traverse(trees);
  });
}
