import {
  createImageCode,
  createLogoCode,
  createTextCode,
  createCarouselCode,
  createCtaCode,
} from "./doctype";

export default function updateDoctype(htmlContent, config) {
  // Defining variables
  let additionalCSS, additionalJS, additionalHTML;
  // Fetching current frames array
  const currentFrames = config.frames;

  currentFrames.forEach((frame, index) => {
    // Preventing unecessary css duplication by checking
    // if the current frame has occurred earlier in the array
    const isDuplicate = currentFrames.indexOf(frame) < index;

    switch (frame) {
      case "logo":
        additionalCSS  = !isDuplicate ? createLogoCode(config, index).css : "";
        additionalJS   = createLogoCode(config, index).js;
        additionalHTML = createLogoCode(config, index).html;
        break;
      case "image":
        additionalCSS  = !isDuplicate ? createImageCode(config, index).css : "";
        additionalJS   = createImageCode(config, index).js;
        additionalHTML = createImageCode(config, index).html;
        break;
      case "text":
        additionalCSS  = !isDuplicate ? createTextCode(config, index).css : "";
        additionalJS   = createTextCode(config, index).js;
        additionalHTML = createTextCode(config, index).html;
        break;
      case "carousel":
        additionalCSS  = !isDuplicate ? createCarouselCode(config, index).css : "";
        additionalJS   = createCarouselCode(config, index).js;
        additionalHTML = createCarouselCode(config, index).html;
        break;
      case "cta":
        additionalCSS  = !isDuplicate ? createCtaCode(config, index).css : "";
        additionalJS   = createCtaCode(config, index).js;
        additionalHTML = createCtaCode(config, index).html;
        break;

      default:
        console.log(`${frame} doesn't seems to be a valid frame :(`);
        break;
    }

    // Append css
    htmlContent = htmlContent.replace(
      "/* Add CSS here */",
      `${additionalCSS}${
        index === currentFrames.length - 1 ? "" : "/* Add CSS here */"
      }`
    );

    // Append js
    htmlContent = htmlContent.replace(
      "// Add js here",
      `${additionalJS}${
        index === currentFrames.length - 1 ? "" : "// Add js here"
      }`
    );

    // Append html
    htmlContent = htmlContent.replace(
      "<!-- Add HTML here -->",
      `${additionalHTML}${
        index === currentFrames.length - 1 ? "" : "<!-- Add HTML here -->"
      }`
    );
  });

  return htmlContent;
}
