<script>
  import { bannerConfig } from "../js/stores";
  import { get } from "svelte/store";

  // Freeze current state of "frames"
  const defaultFrames = [...get(bannerConfig).frames];
  let input = "";

  function updateTimeline() {
    // If empty, we do nothing and exit.
    if (input === "") return;
    // If input is not is the suggested list, we do nothing and exit.
    const lowerCaseInput = input.toLowerCase();
    if (!defaultFrames.includes(lowerCaseInput)) return;
    // If we are here, we can add the frame to our list...
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames, lowerCaseInput],
    }));
    // ... and clean the input for the next one.
    input = "";
  }

  // Creating new frames array, without the item that has been clicke on
  function del(idx) {
    bannerConfig.update((config) => ({
      ...config,
      frames: [...config.frames.filter((_, i) => i !== idx)],
    }));
  }

  // Return extended label
  function extendedLabel(frame) {
    let label = "";
    switch (frame) {
      case "logo":
        label = "animated logo";
        break;
      case "image":
        label = "static image";
        break;
      case "text":
        label = "simple text";
        break;
      case "carousel":
        label = "flickity carousel";
        break;
      case "cta":
        label = "call to action";
        break;
      default:
        label = "invalid frame";
        break;
    }
    return label;
  }
</script>

<div id="frame-selector">
  <input list="frame-suggestion" bind:value={input} />
  <button on:click={updateTimeline} class="submit-button">add</button>
</div>
<datalist id="frame-suggestion">
  {#each defaultFrames as df}
    <option>{df}</option>
  {/each}
</datalist>

<div id="frames">
  {#each $bannerConfig.frames as frame, i}
    <div
      class="frame"
      style=" background-color:{$bannerConfig.theme.background};
              color:{$bannerConfig.theme.text}">
      <button
        on:click={() => del(i)}
        class="remove-btn">
          remove the frame
      </button>

      <div class="frame-informations">
        <span class="frame-index">frame {i + 1}</span>
        <span class="frame-name">{extendedLabel(frame)}</span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  #frame-selector {
    display: flex;
    gap: var(--spacing-sm);
  }

  #frames {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .frame {
    position: relative;
    width: 16rem;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--color-dark-2);
    line-height: 1.2;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .remove-btn {
    position: absolute;
    font-size: var(--font-size-xs);
    display: flex;
    justify-content: flex-end;
    padding: var(--spacing-sm);
    z-index: 2;
    width: 100%;
    height: 100%;
    inset: 0;
  }

  .frame-informations {
    font-size: var(--font-size-rg);
    margin-top: auto;
    z-index: 1;

    .frame-index {
      display: block;
      &:first-letter {
        text-transform: capitalize;
      }
    }
    .frame-name {
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  input {
    width: 16rem;
    border: 1px solid var(--color-dark-2);
    padding: 1rem 0.5rem 1rem 1rem;
  }
</style>
