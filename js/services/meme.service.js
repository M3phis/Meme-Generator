'use strict'

let gMeme = {
  imgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }],
}

function getMeme() {
  console.log(gMeme)
  return gMeme
}

function makeMeme(imgId, selectedLineIdx, lines) {
  const meme = {
    imgId: imgId,
    selectedLineIdx: selectedLineIdx,
    lives: lines,
  }

  return meme
}

function setImage(id) {
  gMeme.imgId = id
  console.log('setting image with Id: ', id)
}

function setLineTxt(txt) {
  gMeme.lines[0].txt = txt
}

function setColor(color) {
  gMeme.lines[0].color = color
}

const elTextInput = document.querySelector('.text-input')
elTextInput.placeholder = `${getMeme().lines[0].txt}`

function reduceFont() {
  gMeme.lines[0].size -= 2
}

function increaseFont() {
  gMeme.lines[0].size += 2
}
