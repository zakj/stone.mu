import rafThrottle from 'raf-throttle';
import './base.styl';

const title = document.querySelector('.title');
const social = document.querySelectorAll('.social img');
const titleRatio = 0.8;

const dimensions = () => ({
  w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
});

const resize = () => {
  const {w, h} = dimensions();
  // Account for URL bar/chrome on mobile.
  if (document.body.clientHeight > h) {
    document.body.style.height = `${h}px`;
  }
  const safePercent = w > 400 ? .5 : .6;
  const titleWidth = Math.min(w * safePercent, h * safePercent / titleRatio);
  title.style.width = `${titleWidth}px`;
  social.forEach(e => e.style.height = `${titleWidth * .085}px`);
};

window.addEventListener('resize', rafThrottle(resize));
resize();
