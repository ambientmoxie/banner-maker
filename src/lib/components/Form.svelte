<script>
  import { bannerConfig } from "../js/stores";
  import { truncateString } from "../js/helpers";
  import Dropzone from "svelte-file-dropzone";
  import ColorPicker from "./ColorPicker.svelte";
  import DownloadButton from "./DownloadButton.svelte";

  function readSVGFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Handle svg transformation.
  function handleSVGTransformation(svgText) {
    // Create a new DOMParser instance, which will allow us to convert strings of XML or HTML into DOM objects
    const parser = new DOMParser();
    // Parse the svgText string (which contains SVG markup) into an XML DOM structure,
    // specifying that the input is of type "image/svg+xml". This will convert the string into a document object.
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    // Query the parsed document to select the <svg> element within it.
    // This returns the actual <svg> DOM element from the parsed document.
    const svgElement = svgDoc.querySelector("svg");
    // Ensure that the svg element is successfully retrieved.
    if (!svgElement) return null;

    // To create a functional "svg symbol" for our upcoming banner template,
    // we are extracting attributes to build the most valid version possible.
    // First, we are getting the commonly used "viewBox" attribute to extract width and height values.
    const viewBox = svgElement.getAttribute("viewBox") || "0 0 100 100";
    const [vbWidth, vbHeight] = viewBox.split(" ").slice(2).map(Number);

    // Next, we are trying to fetch the "width" and "height" attributes.
    // If our SVG doesn't have these attributes, we replace them with the previously extracted viewBox dimensions.
    const svgWidth = svgElement.getAttribute("width") || vbWidth;
    const svgHeight = svgElement.getAttribute("height") || vbHeight;

    // If the "fill" attribute if empty or not present, we are setting an empty value.
    const svgFill = svgElement.getAttribute("fill") || "";
    const xmlns =
      svgElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg";

    // Check if our logo is vertical or not. This will be used for css fine-tuning.
    const isVertical = Number(svgWidth) / Number(svgHeight) < 1;

    // We are extracting the inner content of the <svg> tag, then creating the final SVG symbol.
    const innerContent = svgElement.innerHTML;
    const transformedSVG = `
      <svg>
        <symbol id="my-logo" viewBox="${viewBox}" xmlns="${xmlns}" fill="${svgFill}">
          ${innerContent}
        </symbol>
      </svg>
    `;

    // Update the configuration store with our new values.
    bannerConfig.update((config) => ({
      ...config,
      logo: {
        ...config.logo,
        code: transformedSVG,
        width: Number(svgWidth), // Converting string into number
        height: Number(svgHeight), // Converting string into number
        isVertical: isVertical,
      },
    }));
  }

  let files = {
    accepted: [],
    rejected: [],
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;

    // Don't go further is more than 1 file is uploaded.
    if (files.accepted.length > 0) {
      console.log("Only one file accepted");
      return;
    }
    // Update the "accepted" and "reject" array with the new file
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    // Retrieve the new (and unique) file.
    const svgLogo = acceptedFiles[0];

    // Check if this is a SVG.
    if (svgLogo.type === "image/svg+xml") {
      // Reading the file as a string for extracting and manipulating the data.
      const svgContent = await readSVGFile(svgLogo);
      // Transforming the loaded SVG into a symbol with correct width, height and fill attributes.
      handleSVGTransformation(svgContent);
    }
  }
</script>

<div id="form">
  <div id="form-left">
    <div class="input-container">
      <label for=""> Redirection URL</label>
      <input
        bind:value={$bannerConfig.misc.urlRedirect}
        placeholder="ex: https://www.google.com"
      />
    </div>

    <div class="input-container">
      <label for="">Delay between frames (s)</label>
      <input bind:value={$bannerConfig.gsap.delay} placeholder="ex: 2" />
    </div>

    <div class="input-container">
      <label for="">Company name</label>
      <input
        bind:value={$bannerConfig.misc.companyName}
        placeholder="ex: Brightpath.io"
      />
    </div>
  </div>

  <div id="form-right">
    <div class="input-container">
      <ColorPicker
        label="Background color"
        placeholder="ex: #FFFFFF"
        bind:value={$bannerConfig.theme.background}
      />
    </div>

    <div class="input-container">
      <ColorPicker
        label="Text color"
        placeholder="ex: #000000"
        bind:value={$bannerConfig.theme.text}
      />
    </div>

    <div class="input-container">
      <label for="Logo">Logo (*.svg only)</label>
      <Dropzone
        class="custom-dropzone"
        accept="image/svg+xml"
        on:drop={handleFilesSelect}
      >
        <p>Click or drag and drop</p>
      </Dropzone>
      <ol>
        {#each files.accepted as item}
          <li>{truncateString(item.name, 10)}</li>
        {/each}
      </ol>
    </div>
  </div>
</div>

<DownloadButton />

<style lang="scss">
  #form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    max-width: 61rem;
    > div {
      flex: 1;
      > :global(*:not(:last-child)) {
        margin-bottom: 1rem;
        min-width: 30rem;
      }
    }
  }

  :global(.input-container) {
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    :global(label) {
      margin-bottom: 5px;
    }
  }

  :global(.custom-dropzone) {
    background-color: #f8f9fa;
    border: 1px dotted #ced4da;
    color: #a2a2a2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.58rem;
    margin-bottom: var(--spacing-xs);
    cursor: pointer;
    :global(p) {
      pointer-events: none;
    }
  }
</style>
