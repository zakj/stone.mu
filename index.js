import rafThrottle from 'raf-throttle';
import './base.styl';

const audioContainer = document.querySelector('.audio');
const audioPlayer = document.querySelector('.audio audio');
const background = document.querySelector('.background.bg-jpg');
const title = document.querySelector('h1 svg');
const social = document.querySelectorAll('.social svg');
const titleRatio = 0.8;

const dimensions = () => ({
  w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
});

const resize = () => {
  const {w, h} = dimensions();
  const isSmall = w <= 400;

  // Account for URL bar/chrome on mobile.
  if (document.body.clientHeight !== h) {
    document.body.style.height = `${h}px`;
  }

  const safePercent = isSmall ? .6 : .5;
  const titleWidth = Math.min(w * safePercent, h * safePercent / titleRatio);
  title.style.width = `${titleWidth}px`;

  const socialScale = isSmall ? 0.12 : 0.085;
  social.forEach(e => e.style.height = `${titleWidth * socialScale}px`);
};

window.addEventListener('resize', rafThrottle(resize));
resize();

window.addEventListener('load', () => document.body.classList.add('loaded'));

window.addEventListener('scroll', () => {
  const overScroll = Math.abs(window.scrollY) / 300;
  background.style.transform = `scale(${1 + overScroll})`;
});

audioContainer.addEventListener('click', () => {
  const playing = audioContainer.classList.contains('playing');
  audioContainer.classList.toggle('playing');
  playing ? audioPlayer.pause() : audioPlayer.play();
});

audioPlayer.addEventListener('ended', () => {
  audioContainer.classList.remove('playing');
});
