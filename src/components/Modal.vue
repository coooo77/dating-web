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
          <h5 class="modal-title" id="modal-title">Vanessa</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="modal-body" id="modal-body">
          <div class="row align-items-center">
            <div class="col-sm-12 col-md-6 text-center">
              <img
                src="https://randomuser.me/api/portraits/women/17.jpg"
                class="img-fluid rounded-circle"
              />
              <h3>
                Vanessa Davis
                <span>
                  <i class="fas fa-venus text-danger"></i>
                </span>
              </h3>
            </div>
            <div class="col-sm-12 col-md-6">
              <ul class="list-group">
                <li class="list-group-item">
                  <i class="fas fa-birthday-cake text-info"></i> 1987-08-08 (33)
                </li>
                <li class="list-group-item">
                  <i class="fas fa-envelope text-info"></i> vanessa.davis@example.com
                </li>
                <li class="list-group-item">
                  <i class="fas fa-map-marker-alt text-info"></i> AU
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