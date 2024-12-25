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
      font: 'Arial',
      x: 240,
      y: 60,
    },
    {
      txt: 'Who am I',
      size: 30,
      color: 'blue',
      lineIndex: 1,
      textAlignment: 'center',
      font: 'Verdana',
      x: 240,
      y: 130,
    },
  ],
}

function getMeme() {
  return gMeme
}

function setMeme(meme) {
  gMeme = meme
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
    lineIndex: gMeme.lines.length,
    textAlignment: 'center',
    font: 'Arial',
    x: 240,
    y: 60,
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

function setFamilyFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function moveLineDown() {
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
  gMeme.lines[gMeme.selectedLineIdx].y += 20
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function moveLineUp() {
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
  gMeme.lines[gMeme.selectedLineIdx].y -= 20
  console.log(gMeme.lines[gMeme.selectedLineIdx].y)
}

function deleteLine() {
  const newLines = gMeme.lines.filter((line) => {
    return line.lineIndex !== gMeme.selectedLineIdx
  })
  console.log('lines after delete:', newLines)
  gMeme.lines = newLines
  gMeme.selectedLineIdx = gMeme.lines[0].lineIndex
  updateLinesIndex()
}

function updateLinesIndex() {
  for (let i = 0; i < gMeme.lines.length; i++) {
    gMeme.lines[i].lineIndex = i
  }
}

function getRandomMeme() {
  return {
    imgId: getRandomInt(1, getImgs().length),
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'random text',
        size: 20,
        color: 'red',
        lineIndex: 0,
        textAlignment: 'center',
        font: 'Arial',
        x: 240,
        y: 60,
      },
    ],
  }
}
