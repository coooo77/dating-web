<template>
  <div class="search">
    <div class="search-bar bg-secondary d-flex justify-content-center shadow">
      <form id="search-form" class="form-inline">
        <div class="d-inline">
          <span> 找 </span>
          <select name="gender">
            <option value="female">女性</option>
            <option value="male">男性</option>
          </select>
          <span> 年齡從 </span>
          <input type="number" max="100" min="18" name="min-age" placeholder="歲" class="d-inline" />
          <span> 到 </span>
          <input type="number" max="80" min="18" name="max-age" placeholder="歲" class="d-inline" />
        </div>
        <div class="d-inline">
          <span> 地區 </span>
          <input type="text" name="location" placeholder="居住區域" />
          <span class="search-icon ml-2">
            <button type="submit" class="search-icon-btn">
              <i class="fas fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  min-height: 4rem;
}

@media only screen and (max-width: 600px) {
  #search-form div {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (min-width: 600px) {
}
</style>