export function imageProxy(url) {
  const proxy = "https://res.cloudinary.com/demo/image/fetch/";
  return proxy + url;
}

export function productImage(url) {
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        res
          .arrayBuffer()
          .then((buffer) => console.log(buffer))
          .catch();
      }
      return console.log("img No encontrada ->", url);
    })
    .catch(() => console.log("Error ->", url));
}
