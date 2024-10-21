<script>
  import Form from "./lib/components/Form.svelte";
  import LastUpdate from "./lib/components/LastUpdate.svelte";
  import { generateFavIcon } from "./lib/js/helpers";
  import Timeline from "./lib/components/Timeline.svelte";

  generateFavIcon("#35202e");
</script>

<aside>
  <h1>bnr:mkr</h1>
</aside>

<main>
  <header>
    <ul id="header__list">
      <li class="header__list-item">custom tool</li>
      <li class="header__list-item">gsap animated</li>
      <li class="header__list-item">kickstarter</li>
    </ul>
  </header>

  <section id="notice">
    <h2>Introduction and user instructions</h2>
    <p>
      This tool has been designed for setting up and downloading simple html5
      banners using a gsap timeline. You can compose your banner by choosing
      certain types of frames using the input field below and define basic
      configurations for it by modifying values in the "basic configuration"
      paragraph. The website serves as a helper for junior web designers to
      learn javascript animation without the need to use proprietary software.
      Sketch roughly what you need for your banner, download it, then modify
      what's necessary.
    </p>
  </section>

  <section id="timeline">
    <h2>Current state of your post</h2>
    <Timeline />
  </section>

  <section id="configuration">
    <h2>Set up basic configuration before download</h2>
    <p>
      The form below lets you customize the redirection URL, set animation
      delays between frames, input your company name, and adjust the banner's
      background and text colors. You can also upload your own logo. For
      demonstration purposes, the tool converts your logo into an SVG symbol,
      which is then used within the HTML structure, so you'll need to upload an
      SVG file. Once you've set up the basics, just click the download button to
      generate the final banner. At the moment, the form doesn't support editing
      images for the "image" and "carousel" frames, as this tool is meant to
      create a starter banner rather than a finished product.
    </p>
    <Form />
  </section>

  <section id="terms">
    <h2>Terms</h2>
    <p>
      This website is developed using svelte (without sveltekit) and generates a
      bundle of static assets, allowing it to be hosted on any server. The tool
      is obviously free; you can play around with it, modify it, us it in your
      projects and so on. Sources are available on github. It is offered as-is
      and may contain bugs.
    </p>
  </section>

  <footer>
    <LastUpdate />
  </footer>
</main>
