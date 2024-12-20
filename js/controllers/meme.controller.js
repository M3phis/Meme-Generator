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

    //place text in line
    const line = meme.lines[meme.selectedLineIdx] // Get the selected line
    gCtx.font = `${line.size}px Arial` // Set font size
    gCtx.fillStyle = line.color // Set the color
    console.log(line)
    const x = gElCanvas.width / 2 - gCtx.measureText(line.txt).width / 2 // Center the text
    const y = 50 // You can adjust the y position based on your layout

    gCtx.fillText(line.txt, x, y)
  }
}

function onImgSelect(id) {
  hideGallery()
  setImage(id)
  renderMeme(getMeme())
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme(getMeme())
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}
