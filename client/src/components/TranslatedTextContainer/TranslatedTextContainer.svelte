<script lang="ts">
  import TranslatedCard from "./TranslatedCard.svelte";

  export let translatedCards: any = [];
</script>

{#if translatedCards.length > 0}
  <div class="flex flex-col">
    <label class="block text-gray-700 text-md font-bold" for="input-1"> Translated Text </label>
    <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full mt-1">
      {#each translatedCards as card}
        <TranslatedCard {card} />
      {/each}
    </div>
  </div>
{/if}
