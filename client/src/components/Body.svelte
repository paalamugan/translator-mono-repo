<script lang="ts">
  import debounce from "lodash/debounce";
  import { LANG } from "@app/utils/constant";
  import { getTranslatedData } from "@app/utils/lib";
  import TranslatedTextContainer from "@app/components/TranslatedTextContainer";
  import TranslatedtTextInput from "@app/components/TranslateTextInput";
  import TranslateSelectOption from "@app/components/TranslateSelectOption";

  const langLists = Object.keys(LANG).map((key) => ({
    value: key,
    label: LANG[key],
  }));

  const langFromLists = langLists.slice();
  const langToLists = langLists.slice(1);

  let selectedFromLang = langFromLists[0];
  let selectedToLang = null;
  let translateText: string = "";
  let translatedCards: any = [];
  let detectedLangLabel: string = "";

  const onChangeTranslate = () => {
    if (!selectedToLang || !selectedFromLang || !translateText) return;

    selectedToLang.forEach((toLang, index) => {
      void (async () => {
        translatedCards[index] = {
          loading: true,
        };

        const data = await getTranslatedData(selectedFromLang.value, toLang.value, translateText);

        const detectedLangText = LANG[data.detectedLang];
        if (!detectedLangLabel && detectedLangText) {
          selectedFromLang.label = `${selectedFromLang.label} (${detectedLangText})`;
          detectedLangLabel = detectedLangText;
        }

        translatedCards[index] = {
          loading: false,
          ...data,
        };
      })();
    });
  };

  $: if (!selectedFromLang || !selectedToLang || !translateText) {
    translatedCards = [];
  }

  function handleFromSelect(event) {
    selectedFromLang = event.detail;
    onChangeTranslate();
  }

  function handleFromClear() {
    selectedFromLang = null;
    onChangeTranslate();
  }

  function handleToSelect(event) {
    selectedToLang = event.detail;
    onChangeTranslate();
  }

  const handleTranslateInput = debounce((event) => {
    translateText = event.target.value;
    onChangeTranslate();
  }, 500);
</script>

<div class="flex flex-col sm:flex-row sm:items-start sm:justify-start mt-6 gap-14 mb-6">
  <TranslateSelectOption
    label="Translate From"
    items={langFromLists}
    value={selectedFromLang}
    onSelect={handleFromSelect}
    onClear={handleFromClear}
  />
  <TranslateSelectOption
    label="Translate Into"
    items={langToLists}
    isMulti={true}
    value={selectedToLang}
    onSelect={handleToSelect}
  />
</div>

<TranslatedtTextInput bind:translateText {handleTranslateInput} {selectedFromLang} {selectedToLang} />

{#if selectedFromLang && selectedToLang && translateText}
  <TranslatedTextContainer {translatedCards} />
{/if}
