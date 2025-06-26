<template>
    <div>
        <div class="cyber-logo-container mb-6" @mouseenter="playHoverSound">
            <h1 class="cyber-logo cyber-glitch font-orbitron text-4xl md:text-6xl font-bold">
              <span class="text-cyber-blue glitch-text" data-text="WHITE'S">WHITE'S</span>
              <span class="text-cyber-pink glitch-text" data-text="CYBERPUNK">WTHZ</span>
              <span class="text-white glitch-text" data-text="BLOG"> BLOG</span>
            </h1>
            <div class="cyber-circuit"></div>
          </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#container {
  color: #999;
  text-transform: uppercase;
  font-size: 3.25rem; /* 36px */
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0;
  position: static;
}

#flip {
  height: 50px;
  overflow: hidden;
}

#flip > div > div {
  color: #fff;
  padding: 2px 8px;
  height: 55px;
  margin-bottom: 40px;
  display: inline-block;
}

#flip div:first-child {
  animation: show 5s linear infinite;
}

#flip div div {
  background: #42c58a;
}
#flip div:first-child div {
  background: #4ec7f3;
}
#flip div:last-child div {
  background: #DC143C;
}

@keyframes show {
  0% {margin-top:-270px;}
  5% {margin-top:-180px;}
  33% {margin-top:-180px;}
  38% {margin-top:-90px;}
  66% {margin-top:-90px;}
  71% {margin-top:0px;}
  99.99% {margin-top:0px;}
  100% {margin-top:-270px;}
}

p {
  margin-top: 1.5rem;
  font-size: 12px;
  color: #999;
  text-align: center;
  position: static;
  width: auto;
  bottom: auto;
}

.cyber-glitch {
  position: relative;
  text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
              0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  animation: glitch 500ms infinite;
}

.cyber-glitch::before,
.cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cyber-glitch::before {
  left: 0.05em;
  text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75);
  animation: glitch-anim 650ms infinite alternate-reverse;
}

.cyber-glitch::after {
  left: -0.05em;
  text-shadow: -0.025em 0 0 rgba(0, 255, 255, 0.75);
  animation: glitch-anim2 375ms infinite alternate-reverse;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
                0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
                0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                0.05em 0 0 rgba(0, 255, 255, 0.75),
                0 -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                0.05em 0 0 rgba(0, 255, 255, 0.75),
                0 -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(1px, 9999px, 1px, 0);
  }
  4% {
    clip: rect(65px, 9999px, 100px, 0);
  }
  8% {
    clip: rect(51px, 9999px, 80px, 0);
  }
  12% {
    clip: rect(46px, 9999px, 14px, 0);
  }
  16% {
    clip: rect(31px, 9999px, 35px, 0);
  }
  20% {
    clip: rect(94px, 9999px, 99px, 0);
  }
  24% {
    clip: rect(200px, 9999px, 76px, 0);
  }
  28% {
    clip: rect(210px, 9999px, 34px, 0);
  }
  32% {
    clip: rect(67px, 9999px, 71px, 0);
  }
  36% {
    clip: rect(20px, 9999px, 26px, 0);
  }
  40% {
    clip: rect(22px, 9999px, 67px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(1px, 9999px, 1px, 0);
  }
  4% {
    clip: rect(24px, 9999px, 50px, 0);
  }
  8% {
    clip: rect(33px, 9999px, 92px, 0);
  }
  12% {
    clip: rect(54px, 9999px, 61px, 0);
  }
  16% {
    clip: rect(31px, 9999px, 86px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 13px, 0);
  }
  24% {
    clip: rect(10px, 9999px, 85px, 0);
  }
  28% {
    clip: rect(47px, 9999px, 96px, 0);
  }
  32% {
    clip: rect(53px, 9999px, 27px, 0);
  }
  36% {
    clip: rect(67px, 9999px, 34px, 0);
  }
  40% {
    clip: rect(89px, 9999px, 80px, 0);
  }
}
</style>
