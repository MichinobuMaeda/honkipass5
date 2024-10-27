<script>
  import ButtonGroup from "./ButtonGroup.svelte";
  import IconButtonTonal from "./IconButtonTonal.svelte";
  import ButtonTonal from "./ButtonTonal.svelte";
  import Switch from "./Switch.svelte";
  import Filter from "./Filter.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";

  import SvgRemove from "./SvgRemove.svelte";
  import SvgAdd from "./SvgAdd.svelte";

  import {
    minLength,
    maxTryCount,
    length,
    tryCount,
    charSet,
    useAllTypes,
    uniqueChars,
    useUpperCase,
    useLowerCase,
    useNumerics,
    useSymbols,
    disallowExcluded,
    excluded,
  } from "../state.svelte";
</script>

<div class="flex flex-row gap-4 justify-center">
  <div
    class="p-2 w-20 text-right
          text-lightOnBackground dark:text-darkOnBackground"
  >
    {$length} 文字
  </div>
  <IconButtonTonal
    id="lengthDn"
    svg={SvgRemove}
    ouClick={() => {
      if ($length > minLength) {
        length.set($length - 1);
      }
    }}
  />
  <IconButtonTonal
    id="lengthUp"
    svg={SvgAdd}
    ouClick={() => length.set($length + 1)}
  />
  <ButtonTonal
    id="refresh"
    label="+4"
    ouClick={() => length.set($length + 4)}
  />
  <ButtonTonal
    id="refresh"
    label="生成"
    ouClick={() => {
      tryCount.set(maxTryCount - 1);
      tryCount.set(maxTryCount);
    }}
  />
</div>
<div class="flex flex-row gap-2 justify-center">
  <ButtonGroup
    id="charSets"
    items={[
      {
        label: "標準64字",
        value: "s",
        selected: $charSet === "s",
      },
      {
        label: "拡張88字",
        value: "e",
        selected: $charSet === "e",
      },
      {
        label: "詳細設定",
        value: "m",
        selected: $charSet === "m",
      },
    ]}
    onClick={(v) => {
      charSet.set(v);
      // generated.set(update());
    }}
  />
</div>
<div class="flex flex-row gap-2">
  <Switch
    id="useAllType"
    checked={$useAllTypes}
    ouClick={(v) => {
      useAllTypes.set(v);
      // generated.set(update());
    }}
  />
  <span class="mt-1">すべての文字種を使用</span>
</div>
<div class="flex flex-row gap-2">
  <Switch
    id="disallowRepeatUse"
    checked={$uniqueChars}
    ouClick={(v) => uniqueChars.set(v)}
  />
  <span class="mt-1">同じ文字を使用しない</span>
</div>
<div class="flex flex-row gap-2 justify-between">
  <Filter
    id="useUpperCase"
    checked={$useUpperCase}
    ouClick={(v) => useUpperCase.set(v)}
    label="ABC"
    disabled={$charSet != "m"}
  />
  <Filter
    id="useLowerCase"
    checked={$useLowerCase}
    ouClick={(v) => useLowerCase.set(v)}
    label="abc"
    disabled={$charSet != "m"}
  />
  <Filter
    id="useNumerics"
    checked={$useNumerics}
    ouClick={(v) => useNumerics.set(v)}
    label="123"
    disabled={$charSet != "m"}
  />
  <Filter
    id="useSymbol"
    checked={$useSymbols}
    ouClick={(v) => useSymbols.set(v)}
    label="@#$"
    disabled={$charSet != "m"}
  />
</div>
<div class="flex flex-row gap-2">
  <span class="pt-3">
    <Filter
      id="disallowExclusives"
      checked={$disallowExcluded}
      ouClick={(v) => disallowExcluded.set(v)}
      label="除外"
      disabled={$charSet != "m"}
    />
  </span>
  <span class="grow">
    <TextFieldOutlined
      id="TextFieldOutlined1"
      label="除外対象"
      value={$excluded}
      message=""
      ouInput={(v) => excluded.set(v)}
      disabled={$charSet != "m" || !$disallowExcluded}
      monospace
    />
  </span>
</div>
