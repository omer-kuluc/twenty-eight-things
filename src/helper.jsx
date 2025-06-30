import Gallery from './components/Gallery'
import Intro from './components/Intro'
import MainPage from './components/MainPage'
import Movies from './components/Movies'
import Slider from './components/Slider'
import Timeline from './components/Timeline'
import ViewChoice from './components/ViewChoice'
import React from 'react'

const routers = [
  {
    url: '/',
    component: <MainPage />
  },
  {
    url: '/intro',
    component: <Intro />
  },
  {
    url: '/movies',
    component: <Movies />
  },
  {
    url: '/view-choice',
    component: <ViewChoice />
  },
  {
    url: '/gallery',
    component: <Gallery />
  },

  {
    url: '/slider',
    component: <Slider />
  },
  {
    url: '/timeline',
    component: <Timeline />
  }

]

export function getPage(url) {
  return routers.find(x => x.url === url)?.component || <h1>Not Found</h1>
}