window.addEventListener('DOMContentLoaded', function() {
  var box = document.getElementById('box');
  var button = document.getElementById('button');
  var results;
  results = crawlBookmarks(box.value);
  button.addEventListener('click', function() {
    results.forEach(function(obj) {
      createTab(obj.url);
    });
  });
});

function createTab(url) {
  var createProperties = {
    url: url,
    active: false
  };
  chrome.tabs.create(createProperties);
}

function crawlBookmarks(term) {
  var results = [];
  var match = new RegExp('%s');
  function traverse(trees) {
    trees.forEach(function(tree) {
      if (tree.hasOwnProperty('children') && tree.children.length > 0)
        traverse(tree.children);
      else if (tree.hasOwnProperty('url') && match.test(tree.url)) {
        var result = Object.create(null);
        result['url'] = tree.url.replace('%s', encodeURIComponent(term));
        result['title'] = tree.title;
        results.push(result);
      }
    });
  }
  chrome.bookmarks.getTree(function(trees) {
    traverse(trees);
  });
  return results;
}
