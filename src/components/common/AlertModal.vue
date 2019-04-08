<template>
  <div class="alert-modal">
    <div class="alert-header">
      <i
        class="alert-modal__icon fa"
        :class="`fa-${fontType}`"
      >
      </i>
      <div class="alert-header__heading">{{ heading }}</div>
      <div v-if="content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ['success', 'fail'].indexOf(value) !== -1;
      },
      // possibilities:
      // success
      // fail
    },
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
  },
  computed: {
    fontType() {
      switch (this.type) {
        case 'success':
          return 'check-circle success';
        case 'fail':
          return 'exclamation-triangle fail';
        default:
          return 'question undetermined';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert-modal {
    width: 280px;
    padding: 20px;
    border: 5px solid #fff;
    border-radius: 8px;
    background: #eee;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 100px;
    z-index: 1000;
  }

  .alert-modal__icon {
    font-size: 60px;
    margin-bottom: 12px;

    &.success {
      color: #4BB543;
    }

    &.fail {
      color: #ff0015;
    }

    &.undetermined {
      color: #fff;
    }
  }

  .alert-header__heading {
    font-size: 22px;
  }
</style>
