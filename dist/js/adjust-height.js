_adjustHeigt = function(){
  var maxHeightTitle = Math.max.apply(null, el.find('.sector-card h2').map(function() {
      return $(this).height();
  }).get());
//  el.find('.slide-block-container').height(maxHeightDesc);
  var maxHeightDesc = Math.max.apply(null, el.find('.sector-card .content').map(function() {
      return $(this).height();
  }).get());

  var maxHeightSubSector= Math.max.apply(null, el.find('.sector-card .sector-list-products').map(function() {
      return $(this).height();
  }).get());

  var maxHeightLink = Math.max.apply(null, el.find('.sector-card .btn-container').map(function() {
      return $(this).height();
  }).get());
  el.find('.sector-card h2').height(maxHeightTitle);
  el.find('.sector-card .content').height(maxHeightDesc);
  el.find('.sector-card .sector-list-products').height(maxHeightSubSector);
  el.find('.sector-card .btn-container').height(maxHeightSubSector);
}
