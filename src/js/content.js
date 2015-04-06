$(function() {
  if (location.pathname === "/drafts/new") {
    // load originalItem
    if (!localStorage.duplicateForQiitaOriginalItem) { return; }
    var originalItem = JSON.parse(localStorage.duplicateForQiitaOriginalItem);
    setTimeout(function(){
      $.each(originalItem.tags, function(i) {
        if (i != 0) {
          $('.draftFormTagData_add:last').trigger('click');
        }
        $('.draftFormTagDatum_name:last').val(this)
      });
    }, 1000);

    $('#draft_item_title').val(originalItem.title)
    $('#draft_item_raw_body').val(originalItem.raw_body).trigger('keyup')
    delete localStorage.duplicateForQiitaOriginalItem;
    return;
  } else if (location.pathname.match(/\/items\/[0-9a-f]{20}$/)) {
    // setup duplicate button
    if ($('.duplicate-for-qiita').length > 0) { return; }
    var $target = $('[href="/drafts/new"]:first').parent();
    var $duplicateButton = $target.clone()
    var text = chrome.i18n.getMessage("duplicate");
    $duplicateButton.find('a').text(text).attr('href', 'javascript:void(0);').addClass('duplicate-for-qiita')
    $duplicateButton.removeClass('btn-group').find('.dropdown-toggle').remove()
    $duplicateButton.insertAfter($target)
  }

  // save originalItem on click
  $(document).on('click', '.duplicate-for-qiita', function(e) {
    e.preventDefault();
    var tags = [];
    $('.teamSidebarContainer_section_tag_name').each(function() {
      tags.push($(this).text())
    });

    $.get(location.href + ".json", function(data) {
      data.tags = tags;
      localStorage.duplicateForQiitaOriginalItem = JSON.stringify(data);
      window.open('/drafts/new');
    });
  });
});
