<script>
  import ButtonOutlined from "./ButtonOutlined.svelte";
  import { isDefaultValues, getDefaultValues } from "./honkipass";

  /**
   * @typedef {Object} Props
   * @property {Object} param
   */

  /** @type {Props} */
  let { param = $bindable() } = $props();
</script>

<div class="flex flex-row gap-2">
  <ButtonOutlined
    id="reset"
    label="設定リセット"
    onClick={() => {
      param = getDefaultValues();
    }}
    disabled={isDefaultValues(param)}
  />
</div>
