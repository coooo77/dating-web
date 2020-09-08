<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    id="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-info text-white">
          <h5 class="modal-title" id="modal-title">{{modalUser.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="modal-body" id="modal-body">
          <div class="row align-items-center">
            <div class="col-sm-12 col-md-6 text-center">
              <img :src="modalUser.picture.large" class="img-fluid rounded-circle" />
              <h3>
                {{modalUser.name}}
                <span>
                  <i class="fas fa-venus text-danger" v-if="modalUser.gender === 'female'"></i>
                  <i class="fas fa-mars text-primary" v-else></i>
                </span>
              </h3>
            </div>
            <div class="col-sm-12 col-md-6">
              <ul class="list-group">
                <li class="list-group-item">
                  <i class="fas fa-birthday-cake text-info"></i>
                  {{modalUser.dob.date}} ({{modalUser.dob.age}}歲)
                </li>
                <li class="list-group-item">
                  <i class="fas fa-envelope text-info"></i>
                  {{modalUser.email}}
                </li>
                <li class="list-group-item">
                  <i class="fas fa-map-marker-alt text-info"></i>
                  {{modalUser.location.city}}
                </li>
                <li class="list-group-item">
                  <span class="font-weight-bold">Join From</span> Wed Sep 09 2020 04:08:24 GMT+0800 (台北標準時間)
                </li>
                <li class="list-group-item">
                  <span class="font-weight-bold">Latest Update Time is</span> Wed Sep 09 2020 04:08:24 GMT+0800 (台北標準時間)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "componentsModal",
  props: {
    modalUser: {
      type: Object,
      required: true,
    },
  },
  // TODO mixins 處理生日格式
};
</script>