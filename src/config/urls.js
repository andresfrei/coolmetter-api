
const hostname = process.env.FRONT_URL

export const urlFrontend = {
  invalidLink: hostname + '/link/404',
  adminDevices: hostname + '/auth',
  link: hostname + '/link'
}
