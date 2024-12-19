'use strict'
const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderMeme(meme) {
  //paint image on canvas
  console.log('rendering meme: ', meme)

  const img = new Image()
  img.src = getImg(meme.imgId).url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }

  //place text in line
}

function onImgSelect(id) {
  setImage(id)
  renderMeme(getMeme())
}
