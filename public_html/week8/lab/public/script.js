function formatDate(dateString){
  var date = new Date(dateString);
  var d = date.getDate();
  var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var m = monthNames[date.getMonth()];
  var y = date.getFullYear();
  var output = m + ' ' + d + ' ' + y;
  return output;
}