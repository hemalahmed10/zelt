function locomotive(){
  gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

};
locomotive();

function canvass(){
  const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  https://zelt.app/assets/img/home/hero/sequence/1.webp
  https://zelt.app/assets/img/home/hero/sequence/2.webp
  https://zelt.app/assets/img/home/hero/sequence/3.webp
  https://zelt.app/assets/img/home/hero/sequence/4.webp
  https://zelt.app/assets/img/home/hero/sequence/5.webp
  https://zelt.app/assets/img/home/hero/sequence/6.webp
  https://zelt.app/assets/img/home/hero/sequence/7.webp
  https://zelt.app/assets/img/home/hero/sequence/8.webp
  https://zelt.app/assets/img/home/hero/sequence/9.webp
  https://zelt.app/assets/img/home/hero/sequence/10.webp
  https://zelt.app/assets/img/home/hero/sequence/11.webp
  https://zelt.app/assets/img/home/hero/sequence/12.webp
  https://zelt.app/assets/img/home/hero/sequence/13.webp
  https://zelt.app/assets/img/home/hero/sequence/14.webp
  https://zelt.app/assets/img/home/hero/sequence/15.webp
  https://zelt.app/assets/img/home/hero/sequence/16.webp
  https://zelt.app/assets/img/home/hero/sequence/17.webp
  https://zelt.app/assets/img/home/hero/sequence/18.webp
  https://zelt.app/assets/img/home/hero/sequence/19.webp
  https://zelt.app/assets/img/home/hero/sequence/20.webp
  https://zelt.app/assets/img/home/hero/sequence/21.webp
  https://zelt.app/assets/img/home/hero/sequence/22.webp
  https://zelt.app/assets/img/home/hero/sequence/23.webp
  https://zelt.app/assets/img/home/hero/sequence/24.webp
  https://zelt.app/assets/img/home/hero/sequence/25.webp
  https://zelt.app/assets/img/home/hero/sequence/26.webp
  https://zelt.app/assets/img/home/hero/sequence/27.webp
  https://zelt.app/assets/img/home/hero/sequence/28.webp
  https://zelt.app/assets/img/home/hero/sequence/29.webp
  https://zelt.app/assets/img/home/hero/sequence/30.webp
  https://zelt.app/assets/img/home/hero/sequence/31.webp
  https://zelt.app/assets/img/home/hero/sequence/32.webp
  https://zelt.app/assets/img/home/hero/sequence/33.webp
  https://zelt.app/assets/img/home/hero/sequence/34.webp
  https://zelt.app/assets/img/home/hero/sequence/35.webp
  https://zelt.app/assets/img/home/hero/sequence/36.webp
  https://zelt.app/assets/img/home/hero/sequence/37.webp
  https://zelt.app/assets/img/home/hero/sequence/38.webp
  https://zelt.app/assets/img/home/hero/sequence/39.webp
  https://zelt.app/assets/img/home/hero/sequence/40.webp
  https://zelt.app/assets/img/home/hero/sequence/41.webp
  https://zelt.app/assets/img/home/hero/sequence/42.webp
  https://zelt.app/assets/img/home/hero/sequence/43.webp
  https://zelt.app/assets/img/home/hero/sequence/44.webp
  https://zelt.app/assets/img/home/hero/sequence/45.webp
  https://zelt.app/assets/img/home/hero/sequence/46.webp
  https://zelt.app/assets/img/home/hero/sequence/47.webp
  https://zelt.app/assets/img/home/hero/sequence/48.webp
  https://zelt.app/assets/img/home/hero/sequence/49.webp
  https://zelt.app/assets/img/home/hero/sequence/50.webp
  https://zelt.app/assets/img/home/hero/sequence/51.webp
  https://zelt.app/assets/img/home/hero/sequence/52.webp
  https://zelt.app/assets/img/home/hero/sequence/53.webp
  https://zelt.app/assets/img/home/hero/sequence/54.webp
  https://zelt.app/assets/img/home/hero/sequence/55.webp
  https://zelt.app/assets/img/home/hero/sequence/56.webp
  https://zelt.app/assets/img/home/hero/sequence/57.webp
 `;
  return data.split("\n")[index];
}

const frameCount = 57;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `300% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page>canvas",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `300% top`,
});

};
canvass();


function textengine(){
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  };
  const elem = gsap.utils.toArray(".elem");
  const loop = horizontalLoop(elem, {paused: false, repeat:-1});
};
textengine();


