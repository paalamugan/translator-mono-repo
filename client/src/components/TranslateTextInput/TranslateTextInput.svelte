<script lang="ts">
  export let translateText: string = "";
  export let handleTranslateInput: any = () => {};
  export let selectedFromLang: any = null;
  export let selectedToLang: any = null;

  let disabled = false;
  $: {
    disabled = !selectedFromLang || !selectedToLang || !translateText;
  }
</script>

<div class="flex flex-col mb-6">
  <div class="flex-1">
    <div class="flex items-center justify-between">
      <label class="block text-gray-700 text-md font-bold mb-2" for="input-1"> Enter Text to translate </label>
      <button
        class="bg-gray-200 {!disabled ? 'hover:bg-gray-300' : ''} text-gray-700 font-bold py-1 px-4 rounded-md mb-2"
        {disabled}
        on:click={() => {
          translateText = "";
        }}
      >
        <i class="fa-solid fa-circle-xmark" />
        Clear text
      </button>
    </div>
    <textarea
      bind:value={translateText}
      on:input={handleTranslateInput}
      disabled={!selectedFromLang || !selectedToLang || !selectedToLang.length}
      class="w-full h-64 p-2 border border-gray-300 rounded"
      placeholder="Enter text to translate..."
    />
  </div>
</div>
