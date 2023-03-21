import { existsSync, readFileSync } from 'fs'

export function isExistFile (filePath) {
  return existsSync(filePath)
}

export function getFileData (filePath) {
  if (!isExistFile(filePath)) {
    return null
  }
  const file = readFileSync(filePath, 'utf-8')
  return file
}
