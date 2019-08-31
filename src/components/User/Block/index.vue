<template>
  <div class="default-block">
    <div class="block-title" v-if="title || borderedTitle" :class="borderedTitle ? 'bordered' : ''">
      <slot name="title"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
	export default {
		name: "index",
		props: {
			title: Boolean,
			borderedTitle: Boolean,
		}
	}
</script>

<style lang="scss">
  .default-block {
    background: #fff;
    box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
    margin-bottom: 20px;
    border-radius: 4px;

    .block-title {
      display: flex;
      padding: 20px;

      .title {
        font: 16px/1.2em 'Open Sans', sans-serif;
        color: #48465b;
        margin-right: 30px;
      }
    }

    .block-title.bordered {
      border-bottom: 1px solid #ebedf2;
    }
  }
</style>
