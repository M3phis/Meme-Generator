'use strict'

let gMeme = {
  imgId: 5,
  selectedLineIdx: 1,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
      lineIndex: 0,
      textAlignment: 'center',
    },
    {
      txt: 'Who am I',
      size: 30,
      color: 'blue',
      lineIndex: 1,
      textAlignment: 'center',
    },
  ],
}

function getMeme() {
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

function addLine(
  line = {
    txt: 'New Line',
    size: 20,
    color: 'red',
    textAlignment: 'center',
  }
) {
  const newLineIndex = gMeme.lines.length //new line index
  line.lineIndex = newLineIndex
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = newLineIndex
}

function setImage(id) {
  gMeme.imgId = id
  console.log('setting image with Id: ', id)
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function switchLine() {
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function switchToLine(line) {
  gMeme.selectedLineIdx = line.lineIndex
  console.log('switch to clicked line index:', line.lineIndex)
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

const elTextInput = document.querySelector('.text-input')
elTextInput.placeholder = `${getMeme().lines[0].txt}`

function reduceFont() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function increaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function textAlignLeft(line) {
  line.textAlignment = 'end'
}

function textAlignRight(line) {
  line.textAlignment = 'start'
}

function textAlignCenter(line) {
  line.textAlignment = 'center'
}
