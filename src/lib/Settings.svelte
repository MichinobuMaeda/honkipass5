<script>
  import GroupedButton from "./GroupedButton.svelte";
  import IconButtonTonal from "./IconButtonTonal.svelte";
  import ButtonTonal from "./ButtonTonal.svelte";
  import ButtonFilled from "./ButtonFilled.svelte";
  import Switch from "./Switch.svelte";
  import Filter from "./Filter.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";

  import SvgRemove from "./SvgRemove.svelte";
  import SvgAdd from "./SvgAdd.svelte";
  import { charSetStd, charSetExt, minLength } from "./honkipass";

  /**
   * @typedef {Object} Props
   * @property {Object} param
   */

  /** @type {Props} */
  let { param = $bindable() } = $props();
</script>

<div class="flex flex-row gap-4 sm:gap-8 justify-center">
  <div
    class="p-2 w-20 text-right
      text-lightOnBackground dark:text-darkOnBackground"
  >
    {param.length} 文字
  </div>
  <IconButtonTonal
    id="lengthDn"
    icon={SvgRemove}
    onClick={() => {
      if (param.length > minLength) {
        param.length--;
      }
    }}
  />
  <IconButtonTonal
    id="lengthUp"
    icon={SvgAdd}
    onClick={() => {
      param.length++;
    }}
  />
  <ButtonTonal
    id="refresh"
    label="+4"
    onClick={() => {
      param.length += 4;
    }}
  />
  <ButtonFilled
    id="refresh"
    label="生成"
    onClick={() => {
      param = { ...param };
    }}
  />
</div>
<div class="flex flex-row gap-2 sm:gap-8 justify-center">
  <GroupedButton
    id="charSets"
    items={[
      {
        label: `標準${charSetStd.length}字`,
        value: "s",
        selected: param.charSet === "s",
      },
      {
        label: `拡張${charSetExt.length}字`,
        value: "e",
        selected: param.charSet === "e",
      },
      {
        label: "詳細設定",
        value: "m",
        selected: param.charSet === "m",
      },
    ]}
    bind:value={param.charSet}
  />
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <Switch id="useAllType" bind:checked={param.useAllTypes} />
  <span class="mt-1">すべての文字種を使用</span>
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <Switch id="disallowRepeatUse" bind:checked={param.uniqueChars} />
  <span class="mt-1">同じ文字を使用しない</span>
</div>
<div class="flex flex-row gap-2 sm:gap-4 justify-between">
  <Filter
    id="useUpperCase"
    bind:checked={param.useUpperCase}
    label="ABC"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useLowerCase"
    bind:checked={param.useLowerCase}
    label="abc"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useNumerics"
    bind:checked={param.useNumerics}
    label="123"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useSymbol"
    bind:checked={param.useSymbols}
    label="@#$"
    disabled={param.charSet !== "m"}
  />
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <span class="pt-3">
    <Filter
      id="disallowExclusives"
      bind:checked={param.disallowExcluded}
      label="除外"
      disabled={param.charSet !== "m"}
    />
  </span>
  <span class="grow">
    <TextFieldOutlined
      id="TextFieldOutlined1"
      label="除外対象"
      bind:value={param.excluded}
      message=""
      disabled={param.charSet !== "m" || !param.disallowExcluded}
      monospace
    />
  </span>
</div>
