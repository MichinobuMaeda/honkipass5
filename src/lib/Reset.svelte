<script>
  import ButtonOutlined from "./ButtonOutlined.svelte";

  import { canReset, reset } from "../state.svelte";
</script>

<div class="flex flex-row gap-2">
  <ButtonOutlined
    id="reset"
    label="設定リセット"
    onClick={reset}
    disabled={$canReset}
  />
</div>
