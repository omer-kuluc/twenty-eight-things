import MainPage from './components/MainPage'
import Movies from './components/Movies'
import Songs from './components/Songs'
import React from 'react'

const routers = [
  {
    url: '/',
    component: <MainPage />
  },
  {
    url: '/movies',
    component: <Movies />
  },
  {
    url: '/songs',
    component: <Songs />
  },
]

export function getPage(url) {
  return routers.find(x => x.url === url)?.component || <h1>Not Found</h1>
}