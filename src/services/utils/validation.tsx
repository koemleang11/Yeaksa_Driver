export function youtube_parser(url: any) {
  var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  var match = url.match(regExp);
  return (match && match[1].length == 11) ? match[1] : false;
}

export function facebook_parser(url: any) {
  const regex = /(\d+)\/?$/;
  let match = regex.exec(url);
  return (match !== null && match.length > 0) ? match[0] : false;
}