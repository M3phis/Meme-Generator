let gImgs = [
  { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['question', 'politic'] },
  { id: 2, url: 'imgs/meme-imgs/2.jpg', keywords: ['cute', 'cat'] },
  { id: 3, url: 'imgs/meme-imgs/3.jpg', keywords: ['cute', 'cat'] },
  { id: 4, url: 'imgs/meme-imgs/4.jpg', keywords: ['cute', 'cat'] },
  { id: 5, url: 'imgs/meme-imgs/5.jpg', keywords: ['motivation', 'kid'] },
  { id: 6, url: 'imgs/meme-imgs/6.jpg', keywords: ['funny', 'tv'] },
  { id: 7, url: 'imgs/meme-imgs/7.jpg', keywords: ['cute', 'kid'] },
  { id: 8, url: 'imgs/meme-imgs/8.jpg', keywords: ['funny', 'tv'] },
  { id: 9, url: 'imgs/meme-imgs/9.jpg', keywords: ['cute', 'kid'] },
  { id: 10, url: 'imgs/meme-imgs/10.jpg', keywords: ['politic', 'gay'] },
  { id: 11, url: 'imgs/meme-imgs/11.jpg', keywords: ['funny', 'interesting'] },
  { id: 12, url: 'imgs/meme-imgs/12.jpg', keywords: ['funny', 'cat'] },
  { id: 13, url: 'imgs/meme-imgs/13.jpg', keywords: ['good', 'tv'] },
  { id: 14, url: 'imgs/meme-imgs/14.jpg', keywords: ['question', 'tv'] },
  { id: 15, url: 'imgs/meme-imgs/15.jpg', keywords: ['funny', 'tv'] },
  { id: 16, url: 'imgs/meme-imgs/16.jpg', keywords: ['funny', 'tv'] },
  { id: 17, url: 'imgs/meme-imgs/17.jpg', keywords: ['funny', 'politic'] },
  { id: 18, url: 'imgs/meme-imgs/18.jpg', keywords: ['funny', 'cartoon'] },
]

function getImgs(gQueryOptions) {
  if (gQueryOptions) {
    let imgs = _filterImgs(gQueryOptions)
    return imgs
  } else return gImgs
}

function getImg(id) {
  const img = gImgs.find((item) => item.id === id)

  return img
}

function _filterImgs(gQueryOptions) {
  let imgs = gImgs
  let regex = new RegExp(gQueryOptions, 'i')
  imgs = imgs.filter((img) => regex.test(img.keywords))

  return imgs
}
