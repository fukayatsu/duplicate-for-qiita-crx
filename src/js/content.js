$(function() {
  if (location.pathname === "/drafts/new") {
    // load originalItem
    if (!localStorage.duplicateForQiitaOriginalItem) { return; }
    var originalItem = JSON.parse(localStorage.duplicateForQiitaOriginalItem);
    $('#draft_item_title').val(originalItem.title)
    $('#draft_item_raw_body').val(originalItem.raw_body).trigger('keyup')
    delete localStorage.duplicateForQiitaOriginalItem;
    return;
  } else if (location.pathname.match(/\/items\/[0-9a-f]{20}$/)) {
    // setup duplicate button
    if ($('.duplicate-for-qiita').length > 0) { return; }
    var $target = $('[href="/drafts/new"]').parent();
    var $duplicateButton = $target.clone()
    var text = chrome.i18n.getMessage("duplicate");
    $duplicateButton.find('a').text(text).attr('href', 'javascript:void(0);').addClass('duplicate-for-qiita')
    $duplicateButton.insertAfter($target)
  }

  // save originalItem on click
  $(document).on('click', '.duplicate-for-qiita', function(e) {
    e.preventDefault();
    $.get(location.href + ".json", function(data) {
      localStorage.duplicateForQiitaOriginalItem = JSON.stringify(data);
      window.open('/drafts/new');
    });
  });
});
