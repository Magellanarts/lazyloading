<template>
  <div class="alert-modal" ref="modal">
    <div v-if="showClose" class="alert-modal__close" @click="$emit('closeModal')"></div>
    <div class="alert-header" ref="header">
      <i
        class="alert-modal__icon fa"
        :class="`fa-${fontType}`"
      >
      </i>
      <div class="alert-header__heading">{{ heading }}</div>
    </div>
    <div class="alert-modal__content" ref="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showClose: {
      type: Boolean,
    },
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
  mounted() {
    this.$refs.modal.style.height = `${this.$refs.header.offsetHeight + this.$refs.content.offsetHeight}px`;
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #5673F7;
}
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
    z-index: 1000;
  }

  .alert-modal__close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    height: 20px;
    width: 20px;

    &:before,
    &:after {
      content: '';
      height: 20px;
      width: 2px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: #5673F7;
    }

    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
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

  .alert-modal__content {
    padding: 16px 0;
    line-height: 1.3;
  }
</style>
