<template>
  <footer>
    <div class="copyright">
      Road to the junior © {{new Date().getFullYear()}}г.
    </div>
  </footer>
</template>

<script>

</script>

<style lang="scss" scoped>
  footer{
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -ms-align-items: center;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 12px #F0F3FF;
    background: #fff;
    height: 60px;
    // position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .copyright{
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
    }
  }
</style>
