<script lang="ts">
  import Clipboard from "svelte-clipboard";
  import { LANG } from "@app/utils/constant";
  import { onDestroy } from "svelte";
  import { onTranslateSpeech } from "@app/lib";

  export let card: any = {};

  let isCopied: boolean = false;
  let isSpeaking: boolean = false;
  let speakInstance: any;

  const onstart = () => {
    isSpeaking = true;
  };

  const onend = () => {
    isSpeaking = false;
  };

  const onSpeech = ({ translatedText, to: lang }) => {
    speakInstance = onTranslateSpeech({ text: translatedText, lang, onstart, onend });
  };

  onDestroy(() => {
    if (speakInstance) {
      speakInstance.cancel();
    }
  });
</script>

<div>
  <div class="block rounded-lg shadow-lg bg-white">
    <div class="grid p-4">
      {#if card.loading}
        <div class="flex items-center justify-between mb-4">
          <div class="skeleton-box h-6 flex-1" />
          <div class="skeleton-box h-8 w-8 rounded-full mx-1" />
          <div class="skeleton-box h-8 w-8 rounded-full" />
        </div>
      {:else}
        <div class="flex items-center justify-between mb-4">
          <div class="text-lg font-bold {!card.errorText ? 'text-blue-500' : 'text-red-500'}">
            {LANG[card.to] || ""}
          </div>
          <div class="flex gap-3">
            <div class="text-xl  hover:text-blue-500 {isSpeaking ? 'text-blue-500' : 'text-gray-600'}">
              <i on:click={() => onSpeech(card)} class="fa-solid fa-volume-high cursor-pointer fa-1x " />
            </div>
            <div
              class="text-xl text-gray-600 tooltip animation top"
              data-tooltip={isCopied ? "Copied" : "Copy translated text"}
              on:mouseleave={() => {
                setTimeout(() => {
                  isCopied = false;
                }, 500);
              }}
            >
              <Clipboard
                text={card.translatedText}
                let:copy
                on:copy={() => {
                  isCopied = true;
                }}
              >
                <i on:click={copy} class="fa-solid fa-copy cursor-pointer fa-1x hover:text-blue-500" />
              </Clipboard>
            </div>
          </div>
        </div>
      {/if}
      {#if card.loading}
        <div class="skeleton-box h-3 w-full mb-1" />
        <div class="skeleton-box h-3 w-full" />
      {:else}
        <div class="text-md font-roboto" style="word-break: break-word;">
          {#if card.errorText}
            <span class="text-red-500">
              <strong>Error occured:</strong>
              {card.errorText}
            </span>
          {:else}
            {card.translatedText}
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
