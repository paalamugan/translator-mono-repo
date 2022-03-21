<script lang="ts">
  import Select from "svelte-select";
  export let detectedLangText: string = "";
  export let label: string = "";
  export let items: any = [];
  export let isMulti: boolean = false;
  export let value: any = null;
  export let onSelect: (event: any) => void = () => {};
  export let onClear: (event: any) => void = () => {};

  let getOptionLabel = (option) => {
    return option.value
      ? option.label
      : `${option.label} ${detectedLangText && !/\(.*\)/.test(option.label) ? `(${detectedLangText})` : ""}`;
  };
</script>

<div class="flex-1">
  <label class="block text-gray-700 text-md font-bold mb-2" for="input-1"> {label} </label>
  <div class="custom-select-container w-full">
    <Select
      {getOptionLabel}
      {items}
      {isMulti}
      {value}
      on:select={onSelect}
      on:clear={onClear}
      placeholder="Select a language..."
    />
  </div>
</div>

<style lang="css">
  .custom-select-container {
    --background: #fff;
  }
</style>
