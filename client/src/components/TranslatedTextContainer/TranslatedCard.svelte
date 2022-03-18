<script lang="ts">
  import Clipboard from "svelte-clipboard";
  import { LANG } from "@app/utils/constant";

  export let card: any = {};

  let isCopied: boolean = false;
</script>

<div>
  <div class="block rounded-lg shadow-lg bg-white">
    <div class="grid p-4">
      {#if card.loading}
        <div class="flex items-center justify-between mb-4 gap-3">
          <div class="skeleton-box h-6 flex-1" />
          <div class="skeleton-box h-8 w-8 rounded-full" />
        </div>
      {:else}
        <div class="flex items-center justify-between mb-4">
          <div class="text-lg font-bold {!card.errorText ? 'text-blue-500' : 'text-red-500'}">
            {LANG[card.to] || ""}
          </div>
          <div
            class="text-xl text-gray-600 tooltip animation top"
            data-tooltip={isCopied ? "Copied" : "Copy translated text"}
            on:mouseleave={() => {
              setTimeout(() => {
                isCopied = false;
              }, 1000);
            }}
          >
            <Clipboard
              text={card.translatedText}
              let:copy
              on:copy={() => {
                isCopied = true;
              }}
            >
              <i on:click={copy} class="fa-solid fa-copy cursor-pointer fa-1x hover:text-gray-500" />
            </Clipboard>
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
