import { writable } from "svelte/store";

export let bannerConfig = writable({
  frames: ["logo", "image", "text", "carousel", "cta"],
  gsap: {
    delay: 2,
  },
  theme: {
    background: "#FFFFFF",
    text: "#35202E",
  },
  logo: {
    code: ` <svg style="display: none">
              <symbol
                id="my-logo"
                viewBox="0 0 50 75"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g clip-path="url(#clip0)">
                  <path
                    id="my-star"
                    d="M19.6083 53.4164L22.4387 31.5425L5.46143 45.1811L0 35.4866L19.9522 27.0983L0.00996612 18.659L5.45147 8.96446L22.4088 22.6184L19.6083 0.826172H30.3568L27.4317 22.6899L44.4788 8.95936L49.9352 18.6845L29.9881 27.0371L49.9203 35.4917L44.4987 45.1811L27.4218 31.4761L30.3817 53.4164H19.6083Z"
                     fill="black"
                  />
                  <path d="M50.0002 66.9189H0.000244141V74.7409H50.0002V66.9189Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      id="my-rec"
                      width="50"
                      height="73.913"
                      transform="translate(0 0.826172)"
                    />
                  </clipPath>
                </defs>
              </symbol>
            </svg> `,
    width: 50,
    height: 75,
    isVertical: true,
  },
  misc: {
    urlRedirect: "https://www.google.com",
    companyName: "Brightpath.io",
  },
});
