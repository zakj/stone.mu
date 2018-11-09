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
