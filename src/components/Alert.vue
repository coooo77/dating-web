<template>
  <div class="alert alert-info alert-dismissible fade show" role="alert">
    <strong>{{wrong.strong}}!</strong>
    {{wrong.text}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    wrong: {
      type: Object,
      require: true,
    },
  },
};
</script>