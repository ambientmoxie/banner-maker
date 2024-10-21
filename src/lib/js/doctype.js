// Minimal doctype and node structure, ready to receive dynamics snippets of code.
function createDoctype(config) {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Banner Example</title>
        <!-- Flickity mandatory css -->
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        />

        <!-- Banner style -->
        <style>
          html {
            box-sizing: border-box;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          h1,
          a {
            font-size: 30px;
            letter-spacing: -6%;
          }

          h2 {
            font-size: 25px;
            letter-spacing: -6%;
          }

          p {
            font-size: 9px;
            letter-spacing: -3%;
          }

          span {
            font-weight: 700;
          }

          #container {
            --pad: 10px;
            --color-primary: ${config.theme.background};
            --color-secondary: ${config.theme.text};

            position: relative;
            width: 300px;
            height: 300px;
            border: 1px solid black;
            overflow: hidden;
          }

          #container > div {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding: var(--pad);
            background-color: var(--color-primary);
            color: var(--color-secondary);
          }

          /* Styling headers */

          .header {
            display: flex;
            justify-content: space-between;
          }

          .vertical {
            flex-direction: column;
            height: 100%;
          }

          .horizontal {
            width: 100%;
            align-items: flex-end;
            flex-direction: row-reverse;
          }

          .header svg {
            width: ${config.logo.isVertical ? 30 : 50}px;
            height: auto;
          }

          .company-name {
            font-size: 9px;
            text-transform: uppercase;
            font-weight: 700;
          }

          /* Add CSS here */
        </style>
      </head>
      <body>
        <!--
        The <symbol> element is used to define graphical template objects which can be instantiated by a <use> element.
        By using this method, we are able to use raw SVG (for color manipulation) to display our logo without having to copy and paste the entire code.
        More informations: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
        -->

        ${config.logo.code}

        <!-- start of banner container -->
        <div id="container">
          <!-- Add HTML here -->
        </div>
        <!-- end of banner container -->

        <!-- import flickity carousel -->
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
        <!-- import GSAP library -->
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
        <!-- javascript code goes here -->
        <script>
          // Wait for the whole page to load, with images, before starting animation.
          window.addEventListener("load", (event) => {
            // Select all the carousels present in the banner
            const carousels = document.querySelectorAll(".carousel-container");

            // Setting up carousel options
            const carouselOptions = {
              cellAlign: "left",
              contain: true,
              pageDots: false,
              prevNextButtons: false,
            };

            // Check if there is at least one carousel
            if (carousels.length > 0) {
              carousels.forEach(function (carousel, index) {
                const flkty = new Flickity(carousel, carouselOptions);
                // Target current carousel navigation container...
                const navigationContainer = carousel.nextElementSibling;
                // ...then corresponding next and previous button
                const nextBtn = navigationContainer.querySelector(".next-btn");
                const prevBtn = navigationContainer.querySelector(".prev-btn");
                // If these are find, apply flickity method to navigate between slides
                if (nextBtn && prevBtn) {
                  // .method(isWrapped, isInstant)
                  nextBtn.addEventListener("click", () => {
                    flkty.next(true, false);
                  });
                  prevBtn.addEventListener("click", () => {
                    flkty.previous(true, false);
                  });
                }
              });
            }

            // Initialize GSAP timeline
            let tl = gsap.timeline({ delay: 1 });

            // Pause the timeline on mouseover and resume on mouseout.
            // This behavior allows the user to interact with the carousel (if present)
            // or to read long text before the fade-out animation.
            const banner = document.getElementById("container");
            if (banner) {
              banner.addEventListener("mouseover", () => tl.pause());
              banner.addEventListener("mouseout", () => tl.resume());
            } else {
              console.error("Element with id 'container' not found.");
            }

            const delay = ${config.gsap.delay}; // Delay between each frame (in second)
            const ease = "power1.inOut"; // Animation easing

            // GSAP timeline begins here
            // Add js here
            // GSAP timeline ends here

            /* 

            GSAP UTILITIES

            --------------------------------------------------------------------------------------------
            1 - Pauses the timeline at a particular time or label.
            --------------------------------------------------------------------------------------------
            Code : tl.addPause();
            --------------------------------------------------------------------------------------------
            Example :
            tl.fromTo("#frame-1", { x: 300 }, { x: 0 });
            tl.addPause();
            tl.fromTo("#frame-2", { x: 300 }, { x: 0 });
            --------------------------------------------------------------------------------------------

            --------------------------------------------------------------------------------------------
            2 - Seek marker and pause the timeline (or do something else)
            --------------------------------------------------------------------------------------------
            Code : .add(marker) + tl.seek(marker).pause();
            --------------------------------------------------------------------------------------------
            Example :
            tl.fromTo("#frame-2", { x: 300 }, { x: 0, delay: delay });
            tl.add("pauseMarker")
            tl.fromTo("#frame-3", { x: 300 }, { x: 0, delay: delay });
            tl.seek("pauseMarker").pause();
            --------------------------------------------------------------------------------------------

            GSAP UTILITIES

            */
          });
        </script>
      </body>
    </html>

  `;
}

// Generate CSS, JS and HTML code for logo frame
function createLogoCode(config, index) {
  const logoFrameCode = {
    css: `
       .frame-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
      }

      .frame-logo span {
        display: block;
        width: 50px;
        height: 8px;
        background-color: var(--color-secondary);
      }

      .frame-logo svg {
        width: ${config.logo.isVertical ? 50 : 110}px;
        height: auto;
      }
      `,
    html: `
      <!-- frame "logo" -->
      <div class="frame-logo" id="frame-${index}">
        <svg class="logo" width="${config.logo.width}" height="${config.logo.height}">
          <use href="#my-logo"></use>
        </svg>
      </div>
      `,
    js: `
        tl.fromTo("#frame-${index}", { x: ${
      index !== 0 ? 300 : 0
    } }, { x: 0, delay:${
      index !== 0 ? config.gsap.delay : 0
    }}); // Entrance frame ${index}
        `,
  };
  return logoFrameCode;
}

// Generate CSS, JS and HTML code for image frame
function createImageCode(config, index) {
  const imageFrameCode = {
    css: `
     .frame-image {
        display: grid;
        grid-auto-rows: auto 1fr auto;
      }

      .single-image {
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      .single-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
      `,
    html: `
      <!-- frame "image" -->
      <div class="frame-image" id="frame-${index}">
        <h2>IBM System.2</h2>
        <div class="single-image">
          <img src="https://placehold.co/600x400" alt="computer" />
        </div>
        <div class="header horizontal">
          <span class="company-name">${config.misc.companyName}</span>
          <svg class="logo" width="${config.logo.width}" height="${config.logo.height}">
            <use href="#my-logo"></use>
          </svg>
        </div>
      </div>
      `,
    js: `
      tl.fromTo("#frame-${index}", { x: ${
      index !== 0 ? 300 : 0
    } }, { x: 0, delay:${
      index !== 0 ? config.gsap.delay : 0
    }}); // Entrance frame ${index}`,
  };
  return imageFrameCode;
}

// Generate CSS, JS and HTML code for text frame
function createTextCode(config, index) {
  const textFrameCode = {
    css: `
      .frame-text h1 {
        position: absolute;
        top: 100px;
        left: 0;
        width: 100%;
        text-align: center;
      }

      .frame-text p {
        position: absolute;
        bottom: var(--pad);
        right: var(--pad);
        width: 160px;
      }
      `,
    html: `
      <!-- frame "text" -->
       <div class="frame-text" id="frame-${index}">
        <div class="header vertical">
          <span class="company-name">${config.misc.companyName}</span>
          <svg class="logo" width="${config.logo.width}" height="${config.logo.height}">
            <use href="#my-logo"></use>
          </svg>
        </div>
        <h1>IBM PC-RT</h1>
        <p>
          First commercial release reduced instruction set computers (RISC) grow
          out of the observation that the simplest 20 percent of a computer´s
          instruction set does 80 percent of the work. The IBM PC-RT had 1 MB of
          RAM, a 1.2-megabyte floppy disk drive...
        </p>
      </div>`,
    js: `
      tl.fromTo("#frame-${index}", { x: ${
      index !== 0 ? 300 : 0
    } }, { x: 0, delay:${
      index !== 0 ? config.gsap.delay : 0
    }}); // Entrance frame ${index}`,
  };
  return textFrameCode;
}

// Generate CSS, JS and HTML code for carousel frame
function createCarouselCode(config, index) {
  const carouselFrameCode = {
    css: `
      .frame-carousel {
        display: grid;
        grid-auto-rows: auto 1fr auto;
      }

      .flickity-slider {
        mix-blend-mode: multiply;
      }

      .carousel-cell {
        width: 100%;
        height: 100%;
      }

      .carousel-cell img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .carousel-nav {
        padding: 0 var(--pad);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .prev-btn,
      .next-btn {
        cursor: pointer;
      }

      .prev-btn span,
      .next-btn span {
        font-size: 9px;
        text-transform: uppercase;
        font-weight: bold;
      }
      `,
    html: `
      <!-- frame "carousel" -->
      <div class="frame-carousel" id="frame-${index}">
        <h2>IBM System.2</h2>
        <!-- carousel container -->
        <div class="carousel-container">
          <div class="carousel-cell">
            <img src="https://placehold.co/600x400" alt="image-carousel" />
          </div>
          <div class="carousel-cell">
            <img src="https://placehold.co/600x400" alt="image-carousel" />
          </div>
        </div>
        <!-- carousel custom navigation -->
        <div class="carousel-nav">
          <div class="next-btn">
            [←]<br />
            <span>prev</span>
          </div>
          <div class="prev-btn">
            [→]<br />
            <span>next</span>
          </div>
        </div>

        <!-- Header -->
        <div class="header horizontal">
          <span class="company-name">${config.misc.companyName}</span>
          <svg class="logo" width="${config.logo.width}" height="${config.logo.height}">
            <use href="#my-logo"></use>
          </svg>
        </div>
      </div>
      `,
    js: `
     tl.fromTo("#frame-${index}", { x: ${
      index !== 0 ? 300 : 0
    } }, { x: 0, delay:${
      index !== 0 ? config.gsap.delay : 0
    }}); // Entrance frame ${index}`,
  };
  return carouselFrameCode;
}

// Generate CSS, JS and HTML code for cta frame
function createCtaCode(config, index) {
  const ctaFrameCode = {
    css: `
      .frame-cta {
        display: grid;
        grid-auto-rows: auto 1fr auto;
      }

      .frame-cta a {
        position: absolute;
        text-decoration: none;
        color: var(--color-secondary);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.15s ease;
      }

      .frame-cta a:hover {
        transform: scale(1.1);
        cursor: pointer;
      }
      `,
    html: `
      <div class="frame-cta" id="frame-${index}">
        <div class="header vertical">
          <span class="company-name">${config.misc.companyName}</span>
          <svg class="logo" width="${config.logo.width}" height="${config.logo.height}">
            <use href="#my-logo"></use>
          </svg>
        </div>
        <a href="${config.misc.urlRedirect}"> <span>BUY</span> &nbsp;IBM PC-RT</a>
      </div>
      `,
    js: `
      tl.fromTo("#frame-${index}", { x: ${
      index !== 0 ? 300 : 0
    } }, { x: 0, delay:${
      index !== 0 ? config.gsap.delay : 0
    }}); // Entrance frame ${index}`,
  };
  return ctaFrameCode;
}

export {
  createDoctype,
  createLogoCode,
  createImageCode,
  createTextCode,
  createCarouselCode,
  createCtaCode,
};
