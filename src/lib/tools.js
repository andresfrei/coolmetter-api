export const slug = (text) => {
  return text.replace(/ /g, '-')
}

export const productOption = (text) => {
  let item = []
  let options = []
  const val = []
  const res = []
  let x = []
  let title = ''
  const items = text.split('::')
  items.map((option, index) => {
    item = option.split(':')
    title = item[0]
    options = item[1].split('/')
    options.map((o, i) => {
      x = o.split('$')
      val[i] = { text: x[0], price: !x[1] ? 0 : x[1] }
      res[index] = { title, option: val }
    })
  })
  return res
}
